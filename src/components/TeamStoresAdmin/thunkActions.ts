import get from 'lodash/get'
import message from 'antd/lib/message'
import groupBy from 'lodash/groupBy'
import { setTeamStoreDataAction, setLoadingAction } from './actions'
import { getTeamStoreQuery } from './TeamStoreDetails/data'
import { TeamStoreItemtype } from '../../types/common'

export const getTeamStore = (query: any, teamStoreId: string) => {
  return async (dispatch: any) => {
    dispatch(setLoadingAction(true))
    try {
      const response = await query({
        query: getTeamStoreQuery,
        variables: { teamStoreId },
        fetchPolicy: 'network-only'
      })
      response.data.teamStore.items.map(
        (item: TeamStoreItemtype) =>
          (item.pricesByQuantity = groupBy(item.priceRange, 'quantity'))
      )
      dispatch(setTeamStoreDataAction(get(response, 'data', {})))
      dispatch(setLoadingAction(false))
    } catch (e) {
      dispatch(setLoadingAction(false))
      message.error(e)
    }
  }
}
