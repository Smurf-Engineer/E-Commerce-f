/**
 * Menu Test - Created by david on 03/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Menu from './index'

describe('<Menu />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Menu history={{}} loginButton={null} />, div)
  })
})
