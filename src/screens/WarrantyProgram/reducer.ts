/**
 * WarrantyProgram Reducer - Created by gustavomedina on 07/06/18.
 */
import { fromJS } from 'immutable'
import {
  SET_PRODUCT_IS,
  SET_GENDER,
  SET_SIZE,
  SET_PROBLEMS,
  SET_ISSUE_DESCRIPTION,
  SET_LOADING_ACTION,
  VALID_FORM,
  RESET_REDUCER_DATA,
  CHANGE_INPUT
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  firstName: '',
  lastName: '',
  email: '',
  orderNumber: '',
  productsAffected: '',
  productIs: '',
  gender: '',
  size: '',
  problems: [],
  issueDescription: '',
  loadingSend: false,
  hasError: false
})

const warrantyProgramReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_IS:
      return state.set('productIs', action.someValue)
    case SET_GENDER:
      return state.set('gender', action.someValue)
    case SET_SIZE:
      return state.set('size', action.someValue)
    case SET_PROBLEMS:
      return state.set('problems', action.someValue)
    case SET_ISSUE_DESCRIPTION:
      return state.set('issueDescription', action.someValue)
    case SET_LOADING_ACTION:
      return state.set('loadingSend', action.someValue)
    case VALID_FORM:
      return state.set('hasError', action.someValue)
    case RESET_REDUCER_DATA:
      return initialState
    case CHANGE_INPUT:
      return state.merge({ [action.id]: action.value })
    default:
      return state
  }
}

export default warrantyProgramReducer
