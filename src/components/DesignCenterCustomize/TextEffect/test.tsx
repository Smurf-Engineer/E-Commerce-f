/**
 * TextEffect Test - Created by david on 29/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import TextEffect from './index'

describe('<TextEffect />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TextEffect  />, div)
  })
})