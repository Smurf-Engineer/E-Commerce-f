/**
 * CustomProductDetail Reducer - Created by jorge on 03/08/18.
 */
import { fromJS } from 'immutable'
import { DEFAULT_ACTION, SET_SELECTED_GENDER } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  selectedGender: {}
})

const customProductDetailReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_SELECTED_GENDER:
      return state.set('selectedGender', action.selected)
    default:
      return state
  }
}

export default customProductDetailReducer
