/**
 * Login Test - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Login from './index'

describe('<Login />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    ReactDOM.render(
      <Login open={false} requestClose={() => {}} formatMessage={format} />,
      div
    )
  })
})
