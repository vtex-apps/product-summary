import ProductSummary from '../ProductSummaryCustom'

describe('<ProductSummary /> component', () => {
  it(`should parse a catalog product and get an available SKU with the highest price`, () => {
    const inheritedProps = {
      preferredSKU: 'PRICE_ASC',
    }

    const mockProduct = {
      productId: '123456789',
      linkText: 'linkText',
      productName: 'productName',
      items: [
        {
          itemId: '1',
          name: 'item 1',
          sellers: [
            {
              sellerId: '1',
              commertialOffer: {
                AvailableQuantity: 0,
                Price: 100,
              },
            },
          ],
          images: [
            {
              imageUrl: 'image1',
              imageLabel: null,
            },
            {
              imageUrl: 'image2',
              imageLabel: null,
            },
          ],
        },
        {
          itemId: '2',
          name: 'item 2',
          sellers: [
            {
              sellerId: '1',
              commertialOffer: {
                AvailableQuantity: 3,
                Price: 50,
              },
            },
          ],
          images: [
            {
              imageUrl: 'image1',
              imageLabel: null,
            },
            {
              imageUrl: 'image2',
              imageLabel: null,
            },
          ],
        },
        {
          itemId: '3',
          name: 'item 3',
          sellers: [
            {
              sellerId: '1',
              commertialOffer: {
                AvailableQuantity: 1,
                Price: 500,
              },
            },
          ],
          images: [
            {
              imageUrl: 'image1',
              imageLabel: null,
            },
            {
              imageUrl: 'image2',
              imageLabel: null,
            },
          ],
        },
      ],
      productClusters: [
        {
          name: 'name',
        },
      ],
      properties: [],
    }

    const result = ProductSummary.mapCatalogProductToProductSummary(
      mockProduct,
      inheritedProps.preferredSKU
    )

    expect(result).toBeDefined()
    expect(result.sku.seller.sellerId).toBe('1')
    expect(result.sku.image).toBeDefined()
    expect(result.sku.itemId).toBe('2')
  })

  it(`should parse a catalog product and get a specific SKU by it's properties`, () => {
    const inheritedProps = {
      preferredSKU: 'LAST_AVAILABLE',
    }

    const mockProduct = {
      productId: '123456789',
      linkText: 'linkText',
      productName: 'productName',
      items: [
        {
          itemId: '1',
          name: 'item 1',
          sellers: [
            {
              sellerId: '1',
              commertialOffer: {
                AvailableQuantity: 0,
                Price: 100,
              },
            },
          ],
          images: [
            {
              imageUrl: 'image1',
              imageLabel: null,
            },
            {
              imageUrl: 'image2',
              imageLabel: null,
            },
          ],
        },
        {
          itemId: '2',
          name: 'item 2',
          sellers: [
            {
              sellerId: '1',
              commertialOffer: {
                AvailableQuantity: 3,
                Price: 50,
              },
            },
          ],
          images: [
            {
              imageUrl: 'image1',
              imageLabel: null,
            },
            {
              imageUrl: 'image2',
              imageLabel: null,
            },
          ],
        },
        {
          itemId: '3',
          name: 'item 3',
          sellers: [
            {
              sellerId: '1',
              commertialOffer: {
                AvailableQuantity: 1,
                Price: 500,
              },
            },
          ],
          images: [
            {
              imageUrl: 'image1',
              imageLabel: null,
            },
            {
              imageUrl: 'image2',
              imageLabel: null,
            },
          ],
        },
      ],
      productClusters: [
        {
          name: 'name',
        },
      ],
      properties: [{ name: 'DefaultSKUSelected', values: ['2'] }],
    }

    const result = ProductSummary.mapCatalogProductToProductSummary(
      mockProduct,
      inheritedProps.preferredSKU
    )

    expect(result).toBeDefined()
    expect(result.sku.itemId).toBe('2')
  })

  it('ProductSummary should have a schema', () => {
    expect(ProductSummary.schema).toBeDefined()
  })
})
