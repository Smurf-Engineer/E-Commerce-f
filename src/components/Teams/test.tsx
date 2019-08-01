/**
 * Teams Test - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import Teams from './index'
import { BrowserRouter } from 'react-router-dom'

describe('<Teams />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    ReactDOM.render(
      <BrowserRouter>
        <IntlProvider {...props}>
          <Teams formatMessage={format} />
        </IntlProvider>
      </BrowserRouter>,
      div
    )
  })
})
