/**
 * ForgotPassword Test - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import ForgotPassword from './index'

describe('<ForgotPassword />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    const props = { open: false }
    ReactDOM.render(
      <IntlProvider {...props}>
        <ForgotPassword open={false} formatMessage={format} />
      </IntlProvider>,
      div
    )
  })
})
