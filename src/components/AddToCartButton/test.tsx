/**
 * AddToCartButton Test - Created by cazarez on 02/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AddToCartButton from './index'

describe('<AddToCartButton />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AddToCartButton label="" onClick={() => {}} />, div)
  })
})
