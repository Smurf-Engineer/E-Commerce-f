/**
 * WorkAtJakroo Test - Created by jorge on 31/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { WorkAtJakroo } from './index'
import { IntlProvider } from 'react-intl'

describe(' WorkAtJakroo Screen', () => {
  it('renders without exploding', () => {
    const div = document.createElement('div')
    // tslint:disable-next-line:no-empty
    ReactDOM.render(
      <IntlProvider>
        <WorkAtJakroo />
      </IntlProvider>,
      div
    )
  })
})
