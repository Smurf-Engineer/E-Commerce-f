/**
 * TeamDragger Test - Created by david on 09/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import TeamDragger from './index'

describe('<TeamDragger />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TeamDragger onSelectImage={() => {}} />, div)
  })
})
