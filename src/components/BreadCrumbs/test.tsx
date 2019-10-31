/**
 * AboutUs Test - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import BreadCrumbs from './index'
import { BreadRoute } from '../../types/common'

describe('<AboutUs />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const routes: BreadRoute[] = [
      {
        url: '/',
        label: 'Home'
      }
    ]
    ReactDOM.render(
      <IntlProvider {...props}>
        <BrowserRouter>
          <BreadCrumbs {...{ routes }} />
        </BrowserRouter>
      </IntlProvider>,
      div
    )
  })
})
