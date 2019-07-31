/**
 * OrderDetails Test - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createMemoryHistory } from 'history'
import { IntlProvider } from 'react-intl'
import { ProductDetailsAdmin } from './index'
import { QueryProps, Product } from '../../types/common'

interface Data extends QueryProps {
  product: Product
}

describe('<ProductDetailsAdmin />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const product: Product = jest.genMockFromModule('productMock')
    const data: Data = {
      product,
      fetchMore: () => {}
    }
    const match = jest.fn()
    const history = createMemoryHistory()
    ReactDOM.render(
      <IntlProvider locale="en">
        <ProductDetailsAdmin
          {...{ data, match, history }}
          setProductAction={() => {}}
          formatMessage={() => ''}
        />
      </IntlProvider>,
      div
    )
  })
})
