/**
 * MenuSupport Test - Created by david on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import MenuSupport from './index'

describe('<MenuSupport />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const history = { location: null }
    ReactDOM.render(
      <IntlProvider {...props}>
        <MenuSupport
          {...{ history }}
          designHasChanges={false}
          openWithoutSaveModalAction={() => {}}
        />
      </IntlProvider>,
      div
    )
  })
})
