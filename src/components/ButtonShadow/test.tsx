/**
 * ButtonShadow Test - Created by david on 09/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ButtonShadow from './index'

describe('<ButtonShadow />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ButtonShadow label="Test" selected={false} />, div)
  })
})
