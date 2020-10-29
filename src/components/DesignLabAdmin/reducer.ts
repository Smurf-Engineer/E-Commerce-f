/**´
 * DesignLabAdmin Reducer - Created by eduardoquintero on 12/06/19.
 */

import { fromJS } from 'immutable'
import { Reducer } from '../../types/common'
import {
  SET_DATA,
  SET_DELIVERY_DAYS,
  SET_PLAYLIST,
  SET_RATE,
  SET_CUTOFF_DAYS,
  SET_LOADING
} from './constants'

export const initialState = fromJS({
  loading: false,
  tutorialPlaylistChanged: false,
  deliveryDaysChanges: false,
  tutorialPlaylist: '',
  currencies: {
    usd: {
      cad: 0
    },
    cad: {
      usd: 0
    }
  },
  deliveryDays: 0,
  cutOffDays: 0,
  cutOffDaysChanges: false
})

const designLabAdminReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_RATE:
      const { title, currency, value } = action
      return state.setIn(['currencies', title, currency], value)
    case SET_LOADING:
      return state.set('loading', action.loading)
    case SET_DATA:
      const { currencies, data: { deliveryDays, tutorialPlaylist, cutOffDays } } = action
      return state.merge({ deliveryDays, tutorialPlaylist, cutOffDays, currencies })
    case SET_DELIVERY_DAYS:
      return state.merge({
        deliveryDays: action.value,
        deliveryDaysChanges: true
      })
    case SET_PLAYLIST:
      return state.merge({
        tutorialPlaylist: action.value,
        tutorialPlaylistChanged: true
      })
    case SET_CUTOFF_DAYS:
      return state.merge({
        cutOffDays: action.value,
        cutOffDaysChanges: true
      })
    default:
      return state
  }
}

export default designLabAdminReducer
