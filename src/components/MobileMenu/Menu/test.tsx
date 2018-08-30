/**
 * Menu Test - Created by david on 03/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import Menu from './index'

describe('<Menu />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const props = { locale: 'en' }
    const data = {
      categories: [],
      sports: []
    }
    const formatMessage = () => ''
    ReactDOM.render(
      <IntlProvider {...props}>
        <Menu
          {...{ formatMessage }}
          history={{}}
          loginButton={null}
          menuOpen={false}
          regionButton={null}
          data={data}
        />
      </IntlProvider>,
      div
    )
  })
})
