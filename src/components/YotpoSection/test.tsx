/**
 * AboutUs Test - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { createMemoryHistory } from 'history'
import YotpoSection from './index'

describe('<YotpoSection />', () => {
  test('renders without exploding', () => {
    const props = { locale: 'en' }
    const div = document.createElement('div')
    const format = (message: string) => 'string'
    const history = createMemoryHistory()
    ReactDOM.render(
      <IntlProvider {...props}>
        <YotpoSection
          {...{ history }}
          formatMessage={format}
          yotpoId={''}
          mediaFiles={[]}
          products={[]}
          name={''}
          currentCurrency={''}
        />
      </IntlProvider>,
      div
    )
  })
})
