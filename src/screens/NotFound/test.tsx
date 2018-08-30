import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { NotFound } from './index'

describe(' NotFound Screen', () => {
  it('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    // tslint:disable-next-line:no-empty
    ReactDOM.render(
      <IntlProvider {...props}>
        <NotFound history={{}} />
      </IntlProvider>,
      div
    )
  })
})
