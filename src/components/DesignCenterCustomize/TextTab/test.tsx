/**
 * TextTab Test - Created by david on 17/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { TextTab } from './index'

describe('<TextTab />', () => {
  const props = { locale: 'en' }
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <IntlProvider {...props}>
        <TextTab text="text" onUpdateText={() => {}} onApplyText={() => {}} />
      </IntlProvider>,
      div
    )
  })
})
