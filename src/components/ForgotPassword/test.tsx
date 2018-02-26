/**
 * ForgotPassword Test - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ForgotPassword from './index'

describe('<ForgotPassword />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ForgotPassword open={false} />, div)
  })
})
