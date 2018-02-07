/**
 * MenuBar Test - Created by david on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MenuBar from './index'

describe('<MenuBar />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<MenuBar />, div)
  })
})
