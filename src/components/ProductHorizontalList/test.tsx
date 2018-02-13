/**
 * ProductHorizontalList Test - Created by david on 12/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ProductHorizontalList from './index'
import { Product } from '../../types/common'

describe('<ProductHorizontalList />', () => {
  test('renders without exploding', () => {
    const products: Product[] = []
    const div = document.createElement('div')
    ReactDOM.render(
      <ProductHorizontalList {...{ products }} onPressSeeAll={() => {}} />,
      div
    )
  })
})
