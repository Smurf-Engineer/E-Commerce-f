/**
 * ContactInfo Test - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import ContactInfo from './index'

describe('<ContactInfo />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    ReactDOM.render(
      <IntlProvider {...props}>
        <ContactInfo formatMessage={format} />
      </IntlProvider>,
      div
    )
  })
})
