/**
 * SocialMedia Test - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SocialMedia from './index'

describe('<SocialMedia />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SocialMedia formatMessage={() => ''} />, div)
  })
})
