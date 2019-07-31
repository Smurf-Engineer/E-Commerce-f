/**
 * ColorChartForm Test - Created by eduardoquintero on 19/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ColorChartForm } from './index'
import { IntlProvider } from 'react-intl'

describe('<ColorChartForm />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const props = { locale: 'en' }
    ReactDOM.render(
      <IntlProvider {...props}>
        <ColorChartForm
          open={true}
          handleClose={() => {}}
          formatMessage={() => ''}
          loading={false}
          onRequestColorChart={() => {}}
        />
      </IntlProvider>,
      div
    )
  })
})
