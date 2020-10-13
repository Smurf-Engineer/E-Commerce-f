/**
 * Login Test - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ResellerSignup } from './index'

describe('<ResellerSignup />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    const user = () => { }
    ReactDOM.render(
      <ResellerSignup
        open={false}
        requestClose={() => { }}
        formatMessage={format}
        login={user}
      />,
      div
    )
  })
})
