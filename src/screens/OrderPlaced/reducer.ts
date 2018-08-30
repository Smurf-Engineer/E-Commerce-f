/**
 * OrderPlaced Reducer - Created by cazarez on 22/05/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  EMAIL_ALERT_CHECKED,
  SMS_ALERT_CHECKED
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  sendEmailAlert: false,
  sendSmsAlert: false
})

const orderPlacedReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case EMAIL_ALERT_CHECKED:
      return state.set('sendEmailAlert', action.checked)
    case SMS_ALERT_CHECKED:
      return state.set('sendSmsAlert', action.checked)
    default:
      return state
  }
}

export default orderPlacedReducer
