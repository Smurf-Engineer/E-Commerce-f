/**
 * CustomerSupport Test - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import CustomerSupport from './index'

describe('<CustomerSupport />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    ReactDOM.render(
      <IntlProvider {...props}>
        <CustomerSupport />
      </IntlProvider>,
      div
    )
  })
})
