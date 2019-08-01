/**
 * OrderDetails Test - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { ApolloProvider } from 'react-apollo'
import { configureBrowserClient } from '../../apollo'
const client = configureBrowserClient()
import { OrderDetails } from './index'

describe('<OrderDetails />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <ApolloProvider {...{ client }}>
        <IntlProvider locale="en">
          <OrderDetails
            onReturn={() => {}}
            formatMessage={() => ''}
            orderId="rkB_7fgV7"
            from={''}
            currentCurrency={''}
          />
        </IntlProvider>
      </ApolloProvider>,
      div
    )
  })
})
