/**
 * MobileMenu Test - Created by david on 03/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { MobileMenu } from './index'

describe('<MobileMenu />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const formatMessage = () => ''
    ReactDOM.render(
      <MobileMenu
        {...{ formatMessage }}
        history={{}}
        data={{} as any}
        loginButton={null}
      />,
      div
    )
  })
})
