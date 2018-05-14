/**
 * MyAccountAddressesList Test - Created by miguelcanobbio on 14/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MyAccountAddressesList from './index'

describe('<MyAccountAddressesList />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<MyAccountAddressesList  />, div)
  })
})