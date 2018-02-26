/**
 * DesignCenterTabs Test - Created by david on 23/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
const props = { locale: 'en' }
import DesignCenterTabs from './index'

describe('<DesignCenterTabs />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <IntlProvider {...props}>
        <DesignCenterTabs currentTab={0} onSelectTab={() => {}} />
      </IntlProvider>,
      div
    )
  })
})
