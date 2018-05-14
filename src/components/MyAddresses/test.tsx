/**
 * MyAddresses Test - Created by miguelcanobbio on 14/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MyAddresses from './index'

describe('<MyAddresses />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<MyAddresses  />, div)
  })
})