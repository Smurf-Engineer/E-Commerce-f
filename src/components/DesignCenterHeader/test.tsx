/**
 * DesignCenterHeader Test - Created by david on 23/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import DesignCenterHeader from './index'

describe('<DesignCenterHeader />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const props = { locale: 'en' }
    ReactDOM.render(
      <IntlProvider {...props}>
        <DesignCenterHeader onPressBack={() => {}} />
      </IntlProvider>,
      div
    )
  })
})
