/**
 * OrderSummary Test - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { OrderSummary } from './index'

describe('<OrderSummary />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const props = { locale: 'en' }
    const format = (message: any) => 'string'
    const total = 0
    const subtotal = 0
    const data = {
      fetchMore: () => {},
      taxes: [],
      shipping: []
    }
    ReactDOM.render(
      <IntlProvider {...props}>
        <OrderSummary
          {...{ data }}
          formatMessage={format}
          {...{ total, subtotal }}
        />
      </IntlProvider>,
      div
    )
  })
})
