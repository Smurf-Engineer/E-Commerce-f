/**
 * ProductThumbnail Test - Created by david on 12/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ProductThumbnail from './index'

describe('<ProductThumbnail />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <ProductThumbnail
        id={0}
        isTopProduct={false}
        onPressCustomize={() => {}}
        onPressQuickView={() => {}}
      />,
      div
    )
  })
})
