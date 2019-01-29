import React from 'react'
import ContentLoader from 'react-content-loader'

const ImageLoader = () => (
  <ContentLoader
    style={{
      width: '100%',
      height: '100%',
    }}
    width={100}
    height={56}
    preserveAspectRatio="xMinYMin meet"
  >
    <rect width="100%" height="100%" />
  </ContentLoader>
)

export default ImageLoader
