/**
 * SignUp Test - Created by cazarez on 21/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SignUp from './index'

describe('<SignUp />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SignUp />, div)
  })
})
