import React from 'react'
import ContentLoader from 'react-content-loader'

const ProductSummaryImageLoader = () => {
  const WIDTH = 100
  const HEIGHT = 56

  return (
    <ContentLoader
      style={{
        width: '100%',
        height: '100%',
      }}
      width={WIDTH}
      height={HEIGHT}
      preserveAspectRatio="xMinYMin meet"
    >
      <rect width="100%" height="100%" />
    </ContentLoader>
  )
}

export default ProductSummaryImageLoader
