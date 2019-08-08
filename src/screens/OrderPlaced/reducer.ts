/**
 * OrderPlaced Reducer - Created by cazarez on 22/05/18.
 */
import { fromJS } from 'immutable'
import { EMAIL_ALERT_CHECKED, SMS_ALERT_CHECKED } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  sendEmailAlert: false,
  sendSmsAlert: false
})

const orderPlacedReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_ALERT_CHECKED:
      return state.set('sendEmailAlert', action.checked)
    case SMS_ALERT_CHECKED:
      return state.set('sendSmsAlert', action.checked)
    default:
      return state
  }
}

export default orderPlacedReducer
