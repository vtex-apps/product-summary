import React, {Component} from 'react'
import { injectIntl } from 'react-intl'

import ProductImage from './product-image/ProductImage'

/* 
  sMock Data
 */
const product = {
  items: {
    images: [
      {
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1f/Sport_Club_Corinthians_Paulista_Logo.png",
        imageText: "Corinthians"
      },
      {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/1200px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png",
        imageText: "São Paulo"
      },
      {
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Santos_FC_logo.svg/501px-Santos_FC_logo.svg.png",
        imageText: "Santos"
      },
      {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/2000px-Palmeiras_logo.svg.png",
        imageText: "Palmeiras"
      }
    ]
  }
}

class GettingStartedIndex extends Component {
  render () {
    return (
      <div>
        <ProductImage product={product}/>
      </div>
    )
  }
}

export default injectIntl(GettingStartedIndex)
