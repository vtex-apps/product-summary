import type { ProductTypes } from 'vtex.product-context'

import { getDefaultSeller } from '../modules/seller'

export const DEFAULT_WIDTH = 'auto'
export const DEFAULT_HEIGHT = 'auto'
export const MAX_WIDTH = 3000
export const MAX_HEIGHT = 4000

export type PreferenceType =
  | 'FIRST_AVAILABLE'
  | 'LAST_AVAILABLE'
  | 'PRICE_ASC'
  | 'PRICE_DESC'
  | 'SPECIFICATION'

type PriceConditionRule = 'lowest' | 'highest'

/**
 * Having the url below as base for the LEGACY file manager,
 * https://storecomponents.vteximg.com.br/arquivos/ids/155472/Frame-3.jpg?v=636793763985400000
 * the following regex will match https://storecomponents.vteximg.com.br/arquivos/ids/155472
 *
 * Also matches urls with defined sizes like:
 * https://storecomponents.vteximg.com.br/arquivos/ids/155473-160-auto
 * @type {RegExp}
 *
 * On the new vtex.file-manager isn't necessary replace the URL, just add the param on the querystring, like:
 * "?width=WIDTH&height=HEIGHT&aspect=true"
 *
 */
const baseUrlRegex = new RegExp(/.+ids\/(\d+)/)

const httpRegex = new RegExp(/http:\/\//)

function toHttps(url: string) {
  return url.replace(httpRegex, 'https://')
}

function cleanImageUrl(imageUrl: string) {
  const result = baseUrlRegex.exec(imageUrl)

  if (!result || result.length === 0) return

  return result[0]
}

function replaceLegacyFileManagerUrl(
  imageUrl: string,
  width: string | number,
  height: string | number
) {
  const legacyUrlPattern = '/arquivos/ids/'
  const isLegacyUrl = imageUrl.includes(legacyUrlPattern)

  if (!isLegacyUrl) return imageUrl

  return `${cleanImageUrl(imageUrl)}-${width}-${height}`
}

export function changeImageUrlSize(
  imageUrl: string,
  width: string | number = DEFAULT_WIDTH,
  height: string | number = DEFAULT_HEIGHT
) {
  if (!imageUrl) return
  typeof width === 'number' && (width = Math.min(width, MAX_WIDTH))
  typeof height === 'number' && (height = Math.min(height, MAX_HEIGHT))

  const normalizedImageUrl = replaceLegacyFileManagerUrl(
    imageUrl,
    width,
    height
  )

  const queryStringSeparator = normalizedImageUrl.includes('?') ? '&' : '?'

  return `${normalizedImageUrl}${queryStringSeparator}width=${width}&height=${height}&aspect=true`
}

function getPriceFromSeller(seller: ProductTypes.Seller) {
  return seller.commertialOffer.Price
}

function isAvailable({
  commertialOffer: { AvailableQuantity },
}: ProductTypes.Seller) {
  return AvailableQuantity != null && AvailableQuantity > 0
}

/**
 * @description
 * Find the lowest/highest `Price` between sellers
 * @param item an SKU
 * @param condition the condition enum used for comparison functions
 * */
function getBestPrice(item: ProductTypes.Item, condition: PriceConditionRule) {
  // If there's only 1 seller, avoid filtering
  const { sellers } = item

  if (sellers.length === 1) return sellers[0].commertialOffer.Price

  const availableSellers = sellers.filter(isAvailable)

  let itemPrice

  if (condition === 'highest') {
    itemPrice = Math.max(...availableSellers.map(getPriceFromSeller))
  } else {
    itemPrice = Math.min(...availableSellers.map(getPriceFromSeller))
  }

  return itemPrice
}

/**
 * @description
 * Retrieves the SKU with the best price considering a provided condition
 * @param items an array of SKUs
 * @param condition the condition [highest|lowest]
 * */
function findSKUByPrice(
  items: ProductTypes.Item[],
  condition: PriceConditionRule
) {
  // If none or only 1 sku is available, avoid reducing
  const availableItems = items.filter(findAnyAvailable)

  if (availableItems.length === 0) return items[0]
  if (availableItems.length === 1) return availableItems[0]

  const bestPrices = availableItems.map((item) => getBestPrice(item, condition))
  let itemToReturn

  if (condition === 'highest') {
    itemToReturn = bestPrices.indexOf(Math.max(...bestPrices))
  }

  itemToReturn = bestPrices.indexOf(Math.min(...bestPrices))

  return availableItems[itemToReturn]
}

/**
 * @summary
 * Used to return the first available SKU
 * */
function getAvailableProduct({ sellers }: ProductTypes.Item) {
  return sellers.find(isAvailable)
}

/**
 * @summary
 * Used to probe if at least 1 seller has stock
 * */
function findAnyAvailable({ sellers }: ProductTypes.Item) {
  return sellers.some(isAvailable)
}

/**
 * @description
 * Attempts to retrieve the specific SKU using a custom Product (field)
 * in the Catalog. The specification has the value of the SKU ID
 * that will be looking for. If not found by any reason, we default
 * to finding the preferred SKU
 * @param items an array of SKUs
 * @param defaultSKUspec the ID used to find the SKU
 * @param preferenceFallback the logic for finding an SKU if the ID fails
 * @see {@link https://vtex.io/docs/recipes/all} recipe on how to implement this
 * */
function findDefaultSKU(
  items: ProductTypes.Item[],
  defaultSKUspec: string[],
  preferenceFallback: PreferenceType
) {
  const specificSKU = items.filter(
    ({ itemId }) => String(itemId) === String(defaultSKUspec)
  )

  if (specificSKU.length) {
    return specificSKU[0]
  }

  return findPreferredSKU(items, preferenceFallback)
}

/**
 * @description
 * If there's more than one `Item`, and if there's no defaultSKU, this will
 * retrieve a suitable one depending on the logic provided
 * @param items an array of SKUs
 * @param preferredSKU the logic for finding an SKU
 * */
function findPreferredSKU(
  items: ProductTypes.Item[],
  preferredSKU: PreferenceType
) {
  switch (preferredSKU) {
    default:
    case 'FIRST_AVAILABLE':
      return items.find(getAvailableProduct) ?? items[0]

    case 'LAST_AVAILABLE':
      return (
        [...items].reverse().find(getAvailableProduct) ??
        [...items].reverse()[0]
      )

    case 'PRICE_ASC':
      return findSKUByPrice(items, 'lowest')

    case 'PRICE_DESC':
      return findSKUByPrice(items, 'highest')
  }
}

const defaultImage = { imageUrl: '', imageLabel: '' }
const defaultReference = { Value: '' }
const defaultSeller = { commertialOffer: { Price: 0, ListPrice: 0 } }

const resizeImage = (url: string, imageSize: string | number) =>
  changeImageUrlSize(toHttps(url), imageSize)

/**
 * @description
 * This method is responsible of constructing the product type for the product-context.
 * The property `product.sku` is built by these specifications
 * */
export function mapCatalogProductToProductSummary(
  product: ProductTypes.Product,
  preferredSKU: PreferenceType = 'FIRST_AVAILABLE',
  imageSize: string | number = 500
) {
  if (!product) return null
  const normalizedProduct: any = { ...product }
  const items = normalizedProduct.items || []
  const specifications = normalizedProduct.properties || []
  const defaultSKUspec =
    specifications.find(
      (spec: { name: string }) => spec.name === 'DefaultSKUSelected'
    ) ?? null

  // The SKU will be responsible of setting the `selectedItem` in the product context.
  let sku

  if (items.length === 1) {
    sku = items[0]
  } else if (defaultSKUspec) {
    sku = findDefaultSKU(items, defaultSKUspec.values, preferredSKU)
  } else {
    sku = findPreferredSKU(items, preferredSKU)
  }

  if (sku) {
    const seller = getDefaultSeller(sku?.sellers) ?? defaultSeller

    const [referenceId = defaultReference] = sku?.referenceId ?? []
    const catalogImages = sku?.images ?? []
    const normalizedImages = catalogImages.map(
      (image: { imageUrl: string }) => ({
        ...image,
        imageUrl: resizeImage(image.imageUrl, imageSize),
      })
    )

    const [image = defaultImage] = normalizedImages

    normalizedProduct.sku = {
      ...sku,
      seller,
      referenceId,
      image,
      images: normalizedImages,
    }
  }

  return normalizedProduct
}
