/**
 * MenuGender reducer
 */

import { fromJS } from 'immutable'
import {
  SET_CATEGORY_SELECTED,
  CLEAR_STATE_ACTION,
  SET_GENDER_SELECTED
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  categorySelected: 0,
  genderSelected: 0,
  genderOptions: [
    { id: 1, name: 'Men', visible: false },
    { id: 2, name: 'Women', visible: false }
  ]
})

const menuSportsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_SELECTED:
      return state.set('categorySelected', action.category)
    case CLEAR_STATE_ACTION:
      return initialState
    case SET_GENDER_SELECTED:
      return state.merge({ genderSelected: action.gender, categorySelected: 0 })
    default:
      return state
  }
}

export default menuSportsReducer
