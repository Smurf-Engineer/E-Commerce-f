/**
 * MobileAccessoryColor Test - Created by eduardo on 21/12/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AccessoryColor from './index'

describe('<AccessoryColor />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AccessoryColor />, div)
  })
})
