/**
 * DesignCenterStyle Test - Created by david on 12/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import DesignCenterStyle from './index'

describe('<DesignCenterStyle />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const testFunc = () => {}
    ReactDOM.render(
      <IntlProvider {...props}>
        <DesignCenterStyle onSelectStyle={testFunc} />
      </IntlProvider>,
      div
    )
  })
})
