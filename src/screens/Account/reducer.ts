/**
 * Account Reducer - Created by david on 05/04/18.
 */
import { fromJS } from 'immutable'
import {
  SET_OPEN_KEYS,
  SET_CURRENT_SCREEN,
  CLEAR_REDUCER,
  SET_IS_MOBILE,
  OPEN_SIDEBAR_MOBILE,
  PROFILE_SETTINGS
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  openKeys: [''],
  screen: PROFILE_SETTINGS,
  isMobile: false,
  openSidebar: false
})

const accountReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPEN_KEYS:
      return state.set('openKeys', action.keys)
    case SET_CURRENT_SCREEN:
      return state.set('screen', action.screen)
    case SET_IS_MOBILE:
      return state.set('isMobile', action.isMobile)
    case OPEN_SIDEBAR_MOBILE:
      return state.set('openSidebar', action.open)
    case CLEAR_REDUCER:
      return state.merge({
        screen: '',
        openKeys: ['']
      })
    default:
      return state
  }
}

export default accountReducer
