/**
 * OutlineColor Test - Created by david on 29/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import OutlineColor from './index'

describe('<OutlineColor />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<OutlineColor  />, div)
  })
})