/**
 * SearchBar Test - Created by cazarez on 13/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import SearchBar from './index'

describe('<SearchBar />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    ReactDOM.render(
      <IntlProvider {...props}>
        <SearchBar search={() => {}} formatMessage={format} />
      </IntlProvider>,
      div
    )
  })
})
