/**
 * MenuGender reducer
 */

import { fromJS } from 'immutable'
import {
  SET_SPORT_SELECTED,
  SET_CATEGORY_SELECTED,
  CLEAR_STATE_ACTION
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  sportSelected: 0,
  categorySelected: 0
})

const menuGenderReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPORT_SELECTED:
      return state.set('sportSelected', action.sport)
    case SET_CATEGORY_SELECTED:
      return state.set('categorySelected', action.category)
    case CLEAR_STATE_ACTION:
      return initialState
    default:
      return state
  }
}

export default menuGenderReducer
