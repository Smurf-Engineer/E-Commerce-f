/**
 * ProductInfo Test - Created by cazarez on 13/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ProductInfo from './index'

describe('<ProductInfo />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <ProductInfo title="" showContent={false} toggleView={() => {}} />,
      div
    )
  })
})
