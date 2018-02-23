/**
 * FacebookGmailLogin Test - Created by cazarez on 21/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import FacebookGmailLogin from './index'

describe('<FacebookGmailLogin />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<FacebookGmailLogin  />, div)
  })
})