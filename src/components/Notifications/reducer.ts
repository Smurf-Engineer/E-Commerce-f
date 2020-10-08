/**
 * Notifications Reducer - Created by eduardoquintero on 07/10/20.
 */

import { fromJS } from 'immutable'
import {
  SET_CURRENT_PAGE,
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1
})

const notificationsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    default:
    return state
  }
}

export default notificationsReducer
