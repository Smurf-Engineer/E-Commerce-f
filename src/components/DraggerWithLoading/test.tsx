/**
 * TeamDragger Test - Created by david on 09/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import TeamDragger from './index'

describe('<TeamDragger />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const props = { locale: 'en' }
    ReactDOM.render(
      <IntlProvider {...props}>
        <TeamDragger
          onSelectImage={() => false}
          formatMessage={() => ''}
          loading={false}
        />
      </IntlProvider>,
      div
    )
  })
})
