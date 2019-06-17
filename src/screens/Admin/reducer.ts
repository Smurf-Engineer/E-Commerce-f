/**
 * Admin Reducer - Created by eduardoquintero on 28/03/19.
 */
import { fromJS } from 'immutable'
import {
  SET_DEFAULT_SCREEN,
  CLEAR_REDUCER,
  SET_LOADING,
  OPEN_FORGOT_PASSWORD
} from './constants'
import { SET_CURRENT_SCREEN } from '../../components/AdminLayout/constants'

import { Reducer } from '../../types/common'

export const initialState = fromJS({
  screen: '',
  defaultScreen: '',
  openKeys: [''],
  loading: true,
  forgotPasswordOpen: false
})

const adminReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFAULT_SCREEN: {
      const { screen, openCreations } = action
      if (openCreations) {
        return state.merge({
          screen,
          defaultScreen: screen,
          openKeys: ['', 'myCreations']
        })
      }
      return state.merge({
        screen: action.screen,
        defaultScreen: action.screen
      })
    }
    case SET_CURRENT_SCREEN:
      return state.set('screen', action.screen)
    case CLEAR_REDUCER:
      return state.merge(initialState)
    case SET_LOADING:
      return state.set('loading', action.loading)
    case OPEN_FORGOT_PASSWORD:
      return state.set('forgotPasswordOpen', !state.get('forgotPasswordOpen'))
    default:
      return state
  }
}

export default adminReducer
