/**
 * Checkout Reducer - Created by cazarez on 05/05/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  STEP_ADVANCE,
  VALID_FORM,
  CHANGE_INPUT,
  SELECT_DROPDOWN,
  SMS_CHECK,
  EMAIL_CHECK
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  currentStep: 0,
  firstName: '',
  lastName: '',
  street: '',
  apartment: '',
  country: '',
  state: '',
  city: '',
  zipCode: '',
  phone: '',
  hasError: false,
  emailCheck: false,
  smsCheck: false
})

const checkoutReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case STEP_ADVANCE:
      return state.set('currentStep', action.step)
    case VALID_FORM:
      return state.set('hasError', action.hasError)
    case CHANGE_INPUT:
      return state.merge({ [action.id]: action.value })
    case SELECT_DROPDOWN:
      return state.merge({ [action.id]: action.key })
    case SMS_CHECK:
      return state.set('smsCheck', action.checked)
    case EMAIL_CHECK:
      return state.set('emailCheck', action.checked)
    default:
      return state
  }
}

export default checkoutReducer
