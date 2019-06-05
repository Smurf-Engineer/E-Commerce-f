/**
 * AboutUs Test - Created by Apodaca on 16/05/19.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import AboutUs from './index'

describe('<AboutUs />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    ReactDOM.render(
      <IntlProvider {...props}>
        <AboutUs formatMessage={format} />
      </IntlProvider>,
      div
    )
  })
})
