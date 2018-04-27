/**
 * TeamPassCode Test - Created by gustavomedina on 13/04/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { TeamPassCode } from './index'

describe('<TeamPassCode />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const props = { locale: 'en' }
    const openPassCode = false
    const closeModal = () => {}
    const setPass = (message: string) => {}
    const format = (message: string) => 'string'
    const getTeamStoreMutation = (variables: any) => {}
    const teamStoreId = ''
    ReactDOM.render(
      <IntlProvider {...props}>
        <TeamPassCode
          open={openPassCode}
          requestClose={closeModal}
          formatMessage={format}
          setPassCode={setPass}
          teamStoreId={teamStoreId}
          getTeamStoreMutation={getTeamStoreMutation}
        />
      </IntlProvider>,
      div
    )
  })
})
