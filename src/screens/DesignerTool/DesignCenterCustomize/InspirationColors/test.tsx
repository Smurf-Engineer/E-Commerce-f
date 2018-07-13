/**
 * InspirationColors Test - Created by david on 11/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import InspirationColors from './index'

describe('<InspirationColors />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<InspirationColors  />, div)
  })
})