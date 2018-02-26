/**
 * ColorButton Test - Created by david on 26/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ColorButton from './index'

describe('<ColorButton />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ColorButton  />, div)
  })
})