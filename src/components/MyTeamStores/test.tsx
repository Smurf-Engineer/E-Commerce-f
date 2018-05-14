/**
 * MyTeamStores Test - Created by cazarez on 14/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { MyTeamStores } from './index'

describe('<MyTeamStores />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: any) => 'string'
    const data = {
      myTeamStores: [],
      fetchMore: () => {}
    }
    ReactDOM.render(<MyTeamStores formatMessage={format} data={data} />, div)
  })
})
