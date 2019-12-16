/**
 * PublishingTool Reducer - Created by eduardoquintero on 02/12/19.
 */
import { fromJS } from 'immutable'
import {
  ON_RESET_REDUCER,
  SET_PRODUCT_CODE,
  ON_CHANGE_THEME,
  SET_THEME_TO_EDIT_ACTION,
  UPDATE_THEME_NAME_ACTION
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  productCode: '',
  selectedTheme: -1,
  currentTab: 0
})

const publishingToolReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case ON_RESET_REDUCER:
      return initialState
    case SET_PRODUCT_CODE:
      return state.set('productCode', action.value)
    case ON_CHANGE_THEME:
      return state.set('selectedTheme', action.id)
    case SET_THEME_TO_EDIT_ACTION:
      return state.merge({ editableTheme: action.theme })
    case UPDATE_THEME_NAME_ACTION:
      return state.setIn(['editableTheme', 'name'], action.name)
    default:
      return state
  }
}

export default publishingToolReducer
