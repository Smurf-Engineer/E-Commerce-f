/**
 * ProductHorizontalList Test - Created by david on 12/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ProductHorizontalList } from './index'
import { ProductType, Filter } from '../../types/common'

describe('<ProductHorizontalList />', () => {
  test('renders without exploding', () => {
    const products: ProductType = {
      fullCount: '0',
      products: []
    } as ProductType
    const div = document.createElement('div')
    const categoryFilter: Filter = {
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
    const formatMessage = () => ''
    ReactDOM.render(
      <ProductHorizontalList
        {...{ products, categoryFilter, data, sportFilter, formatMessage }}
        onPressSeeAll={() => {}}
        onPressCustomize={() => {}}
        onPressQuickView={() => {}}
      />,
      div
    )
  })
})
