/**
 * ColorChart Test - Created by eduardoquintero on 19/03/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { ColorChart } from './index'

describe('<ColorChart />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const props = { locale: 'en' }
    ReactDOM.render(
      <IntlProvider {...props}>
        <ColorChart
          open={true}
          handleClose={() => {}}
          formatMessage={() => ''}
          handleOpenForm={() => {}}
        />
      </IntlProvider>,
      div
    )
  })
})
