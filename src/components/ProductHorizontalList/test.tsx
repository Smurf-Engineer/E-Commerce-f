/**
 * ProductHorizontalList Test - Created by david on 12/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ProductHorizontalList } from './index'
import { Product, Filter } from '../../types/common'

describe('<ProductHorizontalList />', () => {
  test('renders without exploding', () => {
    const products: Product[] = []
    const div = document.createElement('div')
    const category: Filter = {
      id: 1,
      name: '2js'
    }
    const sportFilter: Filter = {
      id: 1,
      name: '2js'
    }
    const data = {
      products,
      fetchMore: () => {}
    }
    ReactDOM.render(
      <ProductHorizontalList
        {...{ products, category, data, sportFilter }}
        onPressSeeAll={() => {}}
        onPressCustomize={() => {}}
        onPressQuickView={() => {}}
      />,
      div
    )
  })
})
