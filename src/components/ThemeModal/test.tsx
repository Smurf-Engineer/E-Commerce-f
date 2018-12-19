/**
 * ThemeModal Test - Created by david on 29/11/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ThemeModal from './index'

describe('<ThemeModal />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ThemeModal  />, div)
  })
})