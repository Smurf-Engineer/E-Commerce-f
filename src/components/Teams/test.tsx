/**
 * Teams Test - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import Teams from './index'

describe('<Teams />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    ReactDOM.render(
      <IntlProvider {...props}>
        <Teams />
      </IntlProvider>,
      div
    )
  })
})
