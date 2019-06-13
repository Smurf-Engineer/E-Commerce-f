/**
 * OrderDetails Test - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { OrderDetails } from './index'

describe('<OrderDetails />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <IntlProvider locale="en">
        <OrderDetails
          onReturn={() => {}}
          formatMessage={() => ''}
          orderId="rkB_7fgV7"
        />
      </IntlProvider>,
      div
    )
  })
})
