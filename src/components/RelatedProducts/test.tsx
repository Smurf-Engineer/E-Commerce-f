/**
 * RelatedProducts Test - Created by jorge on 10/08/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '../../store'
import { RelatedProducts } from './index'

describe('<RelatedProducts />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const store = configureStore(window.__PRELOADED_STATE__)
    const history = jest.fn()
    const dispatch = jest.fn()
    ReactDOM.render(
      <Provider {...{ store }}>
        <RelatedProducts
          formatMessage={() => ''}
          {...{ history, dispatch }}
          currentCurrency={''}
          phone={false}
          products={[]}
        />
      </Provider>,
      div
    )
  })
})
