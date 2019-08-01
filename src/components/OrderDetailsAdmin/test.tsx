import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { OrderDetailsAdmin } from './index'
import { OrderDetailsInfo } from '../../types/common'

describe('<OrderDetailsAdmin />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const orderQuery: OrderDetailsInfo = jest.genMockFromModule(
      '../../../__mocks__/orderQueryMock'
    )
    const data = {
      orderQuery,
      fetchMore: () => {}
    }
    ReactDOM.render(
      <IntlProvider locale="en">
        <OrderDetailsAdmin
          onReturn={() => {}}
          formatMessage={() => ''}
          orderId="rkB_7fgV7"
          {...{ data }}
          from={''}
          currentCurrency={''}
        />
      </IntlProvider>,
      div
    )
  })
})
