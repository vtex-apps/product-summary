import PropTypes from 'prop-types'

export const productShape = PropTypes.shape({
  /** Product's link text */
  linkText: PropTypes.string.isRequired,
  /** Product's name */
  productName: PropTypes.string.isRequired,
  /** Product's brand */
  brand: PropTypes.string,
  /** Product's SKU */
  sku: PropTypes.shape({
    /** SKU name */
    name: PropTypes.string.isRequired,
    /** SKU id */
    itemId: PropTypes.string.isRequired,
    /** SKU Image to be shown */
    image: PropTypes.shape({
      /** Image URL */
      imageUrl: PropTypes.string.isRequired,
      /** Image tag as string */
      imageTag: PropTypes.string,
    }).isRequired,
    /** SKU seller */
    seller: PropTypes.shape({
      /** Seller comertial offer */
      commertialOffer: PropTypes.shape({
        /** SKU installments */
        Installments: PropTypes.arrayOf(
          PropTypes.shape({
            /** Installment value */
            Value: PropTypes.number.isRequired,
            /** Interest rate (zero if interest-free) */
            InterestRate: PropTypes.number.isRequired,
            /** Calculated total value */
            TotalValuePlusInterestRate: PropTypes.number,
            /** Number of installments */
            NumberOfInstallments: PropTypes.number.isRequired,
            /** Installments offer name */
            Name: PropTypes.string,
          })
        ),
        /** Selling Price */
        Price: PropTypes.number.isRequired,
        /** List Price */
        ListPrice: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  /** Product's collections */
  productClusters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
})
