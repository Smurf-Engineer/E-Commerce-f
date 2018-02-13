/**
 * PriceQuantity Test - Created by cazarez on 08/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import PriceQuantity from './index'

describe('<PriceQuantity />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<PriceQuantity price={0} quantity={''} />, div)
  })
})
