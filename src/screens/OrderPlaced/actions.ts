/**
 * OrderPlaced  Actions - Created by cazarez on 22/05/18.
 */
import { EMAIL_ALERT_CHECKED, SMS_ALERT_CHECKED } from './constants'
import { AnyAction } from '../../types/common'

export const emailAlertCheckedAction = (checked: boolean): AnyAction => ({
  type: EMAIL_ALERT_CHECKED,
  checked
})

export const smsAlertCheckedAction = (checked: boolean): AnyAction => ({
  type: SMS_ALERT_CHECKED,
  checked
})
