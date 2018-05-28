import PropTypes from 'prop-types'

export default {
  /** Product that owns the informations */
  product: PropTypes.shape({
    /** Product's link text */
    linkText: PropTypes.string.isRequired,
    /** Product's name */
    productName: PropTypes.string.isRequired,
    /** Product's brand */
    brand: PropTypes.string.isRequired,
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
        imageTag: PropTypes.string.isRequired,
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
  }),
  /** Shows the product list price */
  showListPrice: PropTypes.bool,
  /** Set pricing labels' visibility */
  showLabels: PropTypes.bool,
  /** Set installments' visibility */
  showInstallments: PropTypes.bool,
  /** Set the discount badge's visibility */
  showBadge: PropTypes.bool,
  /** Text shown on badge */
  badgeText: PropTypes.string,
  /** Custom buy button text */
  buyButtonText: PropTypes.string,
  /** Hides the buy button completely . If active, the button will not be shown in any condition */
  hideBuyButton: PropTypes.bool,
  /** Defines if the button is shown only if the mouse is on the summary */
  showButtonOnHover: PropTypes.bool,
}
