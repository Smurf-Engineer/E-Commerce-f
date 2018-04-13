/**
 * ProductRow Test - Created by david on 12/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ProductRow from './index'

describe('<ProductRow />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const index = 0
    const productId = 0
    const image = ''
    const name = ''
    const description = ''
    const type = ''
    const startingPrice = 0
    const targetPrice = 0
    const currentOrders = 0
    const currentPrice = 0
    const visible = false
    const yotpoId = ''
    const onPressDelete = () => {}
    const onPressQuickView = () => {}
    const onPressVisible = () => {}

    ReactDOM.render(
      <ProductRow
        {...{
          index,
          productId,
          name,
          image,
          description,
          type,
          startingPrice,
          targetPrice,
          currentOrders,
          currentPrice,
          visible,
          onPressDelete,
          onPressQuickView,
          onPressVisible,
          yotpoId
        }}
      />,
      div
    )
  })
})
