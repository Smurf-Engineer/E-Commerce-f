/**
 * ImagesGrid Test - Created by gustavomedina on 22/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ImagesGrid from './index'
import { IntlProvider } from 'react-intl'

describe('<ImagesGrid />', () => {
  it('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    // tslint:disable-next-line:no-empty
    ReactDOM.render(
      <IntlProvider {...props}>
        <ImagesGrid />
      </IntlProvider>,
      div
    )
  })
})
