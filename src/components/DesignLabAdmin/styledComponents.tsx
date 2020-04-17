/**´
 * DesignLabAdmin Reducer - Created by eduardoquintero on 12/06/19.
 */

import { fromJS } from 'immutable'
import { Reducer } from '../../types/common'
import { SET_DATA, SET_DELIVERY_DAYS, SET_PLAYLIST } from './constants'

export const initialState = fromJS({
  loading: false,
  tutorialPlaylistChanged: false,
  deliveryDaysChanges: false,
  tutorialPlaylist: '',
  deliveryDays: 0
})

const designLabAdminReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      const { deliveryDays, tutorialPlaylist } = action.data
      return state.merge({ deliveryDays, tutorialPlaylist })
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
    default:
      return state
  }
}

export default designLabAdminReducer
