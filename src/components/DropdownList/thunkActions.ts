import message from 'antd/lib/message'
import get from 'lodash/get'
import { setSportsAction } from './actions'
import { getSportsQuery } from './data'
import { NavbarSports } from '../../types/common'

export const getSportsMenu = (client: any) => {
  return async (dispatch: any) => {
    try {
      const { query } = client
      const response = await query({
        query: getSportsQuery,
        fetchPolicy: 'network-only'
      })
      const sportsData = get(response, 'data.sports', [])
      const sportOptions = sportsData.map(({ name, route }: NavbarSports) => ({
        label: name.toLowerCase(),
        menuOpen: false,
        route
      }))
      dispatch(setSportsAction(sportOptions, sportsData))
    } catch (e) {
      message.error('Error loading menu')
    }
  }
}
