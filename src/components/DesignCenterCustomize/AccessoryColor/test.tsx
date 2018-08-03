/**
 * AccessoryColor Test - Created by miguelcanobbio on 01/08/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AccessoryColor from './index'

describe('<AccessoryColor />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AccessoryColor  />, div)
  })
})