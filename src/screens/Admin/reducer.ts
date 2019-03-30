/**
 * Admin Reducer - Created by eduardoquintero on 28/03/19.
 */
import { fromJS } from 'immutable'
import { SET_DEFAULT_SCREEN } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  screen: '',
  defaultScreen: ''
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
    default:
      return state
  }
}

export default adminReducer
