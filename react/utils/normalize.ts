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

type ConditionRule = 'cheapest' | 'expensive'

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

function getPriceBySeller(seller: { commertialOffer: { Price: number } }) {
  return seller.commertialOffer.Price
}

/**
 * @description
 * Find the lowest/highest `Price` between sellers
 * @param item an SKU
 * @param condition the condition enum used for comparison functions
 * */
function getPriceByCondition(item: { sellers: any }, condition: ConditionRule) {
  // First, if there's only 1 seller, avoid filtering
  const { sellers } = item

  if (sellers.length === 1) return sellers[0].commertialOffer.Price

  const availableSellers = sellers.filter(
    ({ commertialOffer }: any) =>
      commertialOffer.AvailableQuantity != null &&
      commertialOffer.AvailableQuantity > 0
  )

  let itemPrice

  if (condition === 'expensive') {
    itemPrice = Math.max(...availableSellers.map(getPriceBySeller))
  } else {
    itemPrice = Math.min(...availableSellers.map(getPriceBySeller))
  }

  return itemPrice
}

/**
 * @description
 * Retrieves the SKU with the best price considering a provided condition
 * @param items an array of SKUs
 * @param condition the condition enum used for comparison functions
 * */
function getBestSKUPrice(items: any[], condition: ConditionRule) {
  // First, if none or only 1 sku is available, avoid reducing
  const filteredItems = items.filter(getOnlyAvailable)
  if (filteredItems.length === 0) return items[0]
  if (filteredItems.length === 1) return filteredItems[0]

  return filteredItems.reduce((acc: any, curr: any) => {
    if (condition === 'expensive') {
      return getPriceByCondition(curr, condition) >
        getPriceByCondition(acc, condition)
        ? curr
        : acc
    }

    return getPriceByCondition(curr, condition) <
      getPriceByCondition(acc, condition)
      ? curr
      : acc
  })
}

/**
 * @description
 * This will retrieve the specific SKU using a custom Product (field)
 * in the Catalog. The specification has the value of the SKU ID
 * that will be looking for
 * @see {@link https://vtex.io/docs/recipes/all} recipe on how to implement this
 * */
function getSpecificSKU(items: any[], specifications: any[]) {
  const defaultSKUspec =
    specifications.find(
      (spec: { name: string }) => spec.name === 'DefaultSKUSelected'
    ) ?? null

  if (!defaultSKUspec) return items[0]

  const specificSKU = items.filter(
    ({ itemId }) => Number(itemId) === Number(defaultSKUspec.values)
  )

  if (specificSKU.length) {
    return specificSKU[0]
  }

  return items[0]
}

/**
 * @description
 * Returns the first available SKU, checks all sellers
 * */
function findAvailableProduct(item: {
  sellers: Array<{ commertialOffer: { AvailableQuantity: number } }>
}) {
  return item.sellers.find(
    ({ commertialOffer = {} }) =>
      commertialOffer.AvailableQuantity != null &&
      commertialOffer.AvailableQuantity > 0
  )
}

/**
 * @description
 * Returns only the available SKUs, checks all sellers
 * */
function getOnlyAvailable({ sellers }: any) {
  return sellers.some(
    (element: { commertialOffer: { AvailableQuantity: number } }) =>
      element.commertialOffer.AvailableQuantity > 0
  )
}

/**
 * @description
 * The SKU will be responsible of setting the selected item context for the product.
 * If there's more than one, we will browse for the preferred SKU depending on
 * the logic provided
 * @param items an array of SKUs
 * @param preferredSKU the logic for selecting an SKU
 * @param properties the product's specifications
 * */
function findPreferredSKU(
  items: any,
  preferredSKU: PreferenceType,
  properties: any
) {
  switch (preferredSKU) {
    default:
    case 'FIRST_AVAILABLE':
      return items.find(findAvailableProduct) || items[0]

    case 'LAST_AVAILABLE':
      return items.reverse().find(findAvailableProduct) || items.reverse()[0]

    case 'PRICE_ASC':
      return getBestSKUPrice(items, 'cheapest')

    case 'PRICE_DESC':
      return getBestSKUPrice(items, 'expensive')

    case 'SPECIFICATION':
      return getSpecificSKU(items, properties)
  }
}

const defaultImage = { imageUrl: '', imageLabel: '' }
const defaultReference = { Value: '' }
const defaultSeller = { commertialOffer: { Price: 0, ListPrice: 0 } }

const resizeImage = (url: string, imageSize: string | number) =>
  changeImageUrlSize(toHttps(url), imageSize)

/**
 * @description
 * This method is responsible of constructing the product type for the  product-context.
 * */
export function mapCatalogProductToProductSummary(
  product: any,
  preferredSKU: PreferenceType = 'FIRST_AVAILABLE',
  imageSize: string | number = 500
) {
  if (!product) return null
  const normalizedProduct = { ...product }
  const items = normalizedProduct.items || []
  const specifications = normalizedProduct.properties || []

  const sku =
    items.length === 1
      ? items[0]
      : findPreferredSKU(items, preferredSKU, specifications)

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
