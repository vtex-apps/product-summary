import { getDefaultSeller } from '../modules/seller'

export const DEFAULT_WIDTH = 'auto'
export const DEFAULT_HEIGHT = 'auto'
export const MAX_WIDTH = 3000
export const MAX_HEIGHT = 4000

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

function findAvailableProduct(item: {
  sellers: Array<{ commertialOffer: { AvailableQuantity: number } }>
}) {
  return item.sellers.find(
    ({ commertialOffer = {} }) =>
      commertialOffer.AvailableQuantity != null &&
      commertialOffer.AvailableQuantity > 0
  )
}

const defaultImage = { imageUrl: '', imageLabel: '' }
const defaultReference = { Value: '' }
const defaultSeller = { commertialOffer: { Price: 0, ListPrice: 0 } }

const resizeImage = (url: string, imageSize: string | number) =>
  changeImageUrlSize(toHttps(url), imageSize)

export function mapCatalogProductToProductSummary(
  product: any,
  imageSize: string | number = 500
) {
  if (!product) return null
  const normalizedProduct = { ...product }
  const items = normalizedProduct.items || []
  const sku = items.find(findAvailableProduct) || items[0]

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
