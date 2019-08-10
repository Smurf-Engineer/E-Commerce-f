import get from 'lodash/get'
import message from 'antd/lib/message'
import groupBy from 'lodash/groupBy'
import head from 'lodash/head'
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

      response.data.teamStore.items.forEach((item: TeamStoreItemtype) => {
        item.pricesByCurrency = groupBy(item.priceRange, 'shortName')
        Object.keys(item.pricesByCurrency).forEach(currency => {
          item.pricesByCurrency[currency] = get(
            head(item.pricesByCurrency[currency]),
            'price',
            ''
          )
        })
        return item.pricesByCurrency
      })
      dispatch(setTeamStoreDataAction(get(response, 'data', {})))
      dispatch(setLoadingAction(false))
    } catch (e) {
      dispatch(setLoadingAction(false))
      message.error(e)
    }
  }
}
