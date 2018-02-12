/**
 * ProductThumbnail Test - Created by david on 12/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ProductThumbnail from './index'
import { Product } from '../../types/common'

describe('<ProductThumbnail />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const product = {
      id: 'test-0',
      images: { front: '', back: '', left: '', right: '' },
      type: '',
      description: '',
      priceRange: { from: 0, to: 1 },
      collections: 0,
      isTopProduct: false
    }
    ReactDOM.render(<ProductThumbnail {...{ product }} />, div)
  })
})
