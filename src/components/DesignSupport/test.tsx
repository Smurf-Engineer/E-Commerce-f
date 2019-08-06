/**
 * DesignSupport Test - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import DesignSupport from './index'
import { BrowserRouter } from 'react-router-dom'

describe('<DesignSupport />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    ReactDOM.render(
      <BrowserRouter>
        <IntlProvider {...props}>
          <DesignSupport formatMessage={format} />
        </IntlProvider>
      </BrowserRouter>,
      div
    )
  })
})
