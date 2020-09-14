/**
 * ItemOrder Test - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ItemOrder from './index'

describe('<ItemOrder />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const orderNumber = 123456
    const date = '02/01/18'
    const trackingNumber = 'EX1234567890'
    const status = 'Shipped'
    const shortId = '12abcd123'
    const onOrderClick = () => { }
    const sendOrder = () => { }
    const formatMessage = () => { }
    ReactDOM.render(
      <ItemOrder
        {...{
          onOrderClick,
          orderNumber,
          date,
          trackingNumber,
          status,
          shortId,
          sendOrder,
          formatMessage
        }}
      />,
      div
    )
  })
})
