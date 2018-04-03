/**
 * MenuBarMobile Test - Created by david on 02/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MenuBarMobile from './index'

describe('<MenuBarMobile />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<MenuBarMobile  />, div)
  })
})