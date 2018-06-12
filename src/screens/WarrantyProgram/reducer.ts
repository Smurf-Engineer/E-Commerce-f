/**
 * WarrantyProgram Reducer - Created by gustavomedina on 07/06/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_EMAIL,
  SET_ORDER_NUMBER,
  SET_PRODUCTS_AFFECTED,
  SET_PRODUCT_IS,
  SET_GENDER,
  SET_SIZE,
  SET_PROBLEMS,
  SET_ISSUE_DESCRIPTION
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
  issueDescription: ''
})

const warrantyProgramReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_FIRST_NAME:
      return state.set('firstName', action.someValue)
    case SET_LAST_NAME:
      return state.set('lastName', action.someValue)
    case SET_EMAIL:
      return state.set('email', action.someValue)
    case SET_ORDER_NUMBER:
      return state.set('orderNumber', action.someValue)
    case SET_PRODUCTS_AFFECTED:
      return state.set('productsAffected', action.someValue)
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
    default:
      return state
  }
}

export default warrantyProgramReducer
