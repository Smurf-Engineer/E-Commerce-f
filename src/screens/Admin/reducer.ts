/**
 * Admin Reducer - Created by eduardoquintero on 28/03/19.
 */
import { fromJS } from 'immutable'
import { SET_DEFAULT_SCREEN, CLEAR_REDUCER } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  screen: '',
  defaultScreen: '',
  openKeys: ['']
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
    case CLEAR_REDUCER:
      return state.merge(initialState)
    default:
      return state
  }
}

export default adminReducer
