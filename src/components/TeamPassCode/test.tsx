/**
 * TeamPassCode Test - Created by gustavomedina on 13/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import TeamPassCode from './index'

describe('<TeamPassCode />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const props = { locale: 'en' }
    const openPassCode = false
    const closeModal = () => {}
    const setPass = (message: string) => {}
    const format = (message: string) => 'string'
    const handlePass = () => {}
    const passCode = ''
    ReactDOM.render(
      <IntlProvider {...props}>
        <TeamPassCode
          open={openPassCode}
          requestClose={closeModal}
          formatMessage={format}
          setPassCode={setPass}
          passCode={passCode}
          handleIngressPassCode={handlePass}
        />
      </IntlProvider>,
      div
    )
  })
})
