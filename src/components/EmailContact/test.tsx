/**
 * EmailContact Test - Created by gustavomedina on 16/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import EmailContact from './index'

describe('<EmailContact />', () => {
  test('renders without exploding', () => {
    const format = (message: string) => 'string'
    const div = document.createElement('div')
    ReactDOM.render(
      <EmailContact
        open={false}
        requestClose={() => {}}
        formatMessage={format}
      />,
      div
    )
  })
})
