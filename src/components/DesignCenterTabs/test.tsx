/**
 * DesignCenterTabs Test - Created by david on 23/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import DesignCenterTabs from './index'

describe('<DesignCenterTabs />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const props = { locale: 'en' }
    ReactDOM.render(
      <IntlProvider {...props}>
        <DesignCenterTabs
          designHasChanges={false}
          currentTheme={0}
          styleIndex={0}
          currentTab={0}
          onSelectTab={() => {}}
        />
      </IntlProvider>,
      div
    )
  })
})
