import get from 'lodash/get'
import message from 'antd/lib/message'
import groupBy from 'lodash/groupBy'
import head from 'lodash/head'
import {
  setTeamStoreDataAction,
  setLoadingAction,
  setImage,
  setSavingAction,
  setTeamData
} from './actions'
import { getTeamStoreQuery } from './TeamStoreDetails/data'
import { TeamStoreItemtype } from '../../types/common'
import config from '../../config'
import { getTeamStoreEdit } from './CreateStore/data'

export const getTeamStore = (query: any, teamStoreId: string) => {
  return async (dispatch: any) => {
    dispatch(setLoadingAction(true))
    try {
      const response = await query({
        query: getTeamStoreQuery,
        variables: { teamStoreId },
        fetchPolicy: 'no-cache'
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
    } catch (e) {
      message.error(e)
      dispatch(setLoadingAction(false))
    }
  }
}

export const uploadBanner = (file: Blob, opened: boolean) => {
  return async (dispatch: any) => {
    dispatch(setSavingAction(true))
    try {
      let bannerResp = ''
      if (file) {
        const formData = new FormData()
        formData.append('file', file as any, 'banner.jpeg')
        const user = JSON.parse(localStorage.getItem('user') || '')
        const uploadResp = await fetch(`${config.graphqlUriBase}uploadBanner`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: formData
        })
        const { image } = await uploadResp.json()
        bannerResp = image
      }
      dispatch(setImage(bannerResp, opened))
    } catch (e) {
      dispatch(setSavingAction(false))
      message.error(e)
    }
  }
}

export const getEditStore = (query: any, teamStoreId: string) => {
  return async (dispatch: any) => {
    dispatch(setLoadingAction(true))
    try {
      const response = await query({
        query: getTeamStoreEdit,
        variables: { teamStoreId },
        fetchPolicy: 'no-cache'
      })
      const teamStore = get(response, 'data.teamStore', {})
      dispatch(setTeamData(teamStore))
    } catch (e) {
      message.error(e)
      dispatch(setLoadingAction(false))
    }
  }
}
