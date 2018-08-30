/**
 * YotpoReviews Test - Created by cazarez on 14/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import YotpoReviews from './index'

describe('<YotpoReviews />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    window.yotpo = {} as any
    ReactDOM.render(
      <IntlProvider {...props}>
        <YotpoReviews yotpoId="" />
      </IntlProvider>,
      div
    )
  })
})
