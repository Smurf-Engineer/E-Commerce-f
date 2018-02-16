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
    ReactDOM.render(
      <ProductThumbnail isTopProduct={false} onPressCustomize={() => {}} />,
      div
    )
  })
})
