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
    ReactDOM.render(
      <ItemOrder {...{ orderNumber, date, trackingNumber, status }} />,
      div
    )
  })
})
