/**
 * AddToTeamStore Test - Created by cazarez on 25/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { AddToTeamStore } from './index'

describe('<AddToTeamStore />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const openAddToTeamStoreModalAction = () => {}
    const props = { locale: 'en' }
    const history = {}
    const data: any = {
      myTeamstores: {
        fullCount: 0,
        teamStores: []
      },
      fetchMore: () => {}
    }
    ReactDOM.render(
      <IntlProvider {...props}>
        <AddToTeamStore
          data={data}
          {...{ history, openAddToTeamStoreModalAction }}
        />
      </IntlProvider>,
      div
    )
  })
})
