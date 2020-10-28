/**
 * Logout Test - Created by cazarez on 27/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Logout from './index'

describe('<Logout />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    ReactDOM.render(
      <Logout title={''} logout={() => {}} goTo={() => {}} formatMessage={format} />,
      div
    )
  })
})
