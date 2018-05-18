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
    const data: any = {
      myTeamStores: [],
      fetchMore: () => {}
    }
    const history = {}
    const openDeleteModal = false
    const deleteLoading = false
    const openShare = false
    const storeId = ''
    const openDeleteModalAction = () => {}
    const deleteTeamStore = () => {}
    const deleteLoadingAction = (loading: boolean) => {}
    const clearReducerAction = () => {}
    const openShareModalAction = () => {}
    ReactDOM.render(
      <MyTeamStores
        formatMessage={format}
        data={data}
        {...{
          history,
          openShare,
          storeId,
          deleteLoading,
          openDeleteModal,
          openDeleteModalAction,
          deleteTeamStore,
          deleteLoadingAction,
          clearReducerAction,
          openShareModalAction
        }}
      />,
      div
    )
  })
})
