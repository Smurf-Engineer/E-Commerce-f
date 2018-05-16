/**
 * Payment Test - Created by miguelcanobbio on 16/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Payment from './index'

describe('<Payment />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Payment  />, div)
  })
})