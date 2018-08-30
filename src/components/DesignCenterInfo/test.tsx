/**
 * DesignCenterInfo Test - Created by david on 23/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import DesignCenterInfo from './index'

describe('<DesignCenterInfo />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const props = { locale: 'en' }
    ReactDOM.render(
      <IntlProvider {...props}>
        <DesignCenterInfo
          label="theme"
          model="none"
          onPressQuickView={() => {}}
        />
      </IntlProvider>,
      div
    )
  })
})
