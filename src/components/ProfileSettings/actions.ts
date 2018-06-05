/**
 * ProfileSettings Actions - Created by miguelcanobbio on 05/31/18.
 */
import {
  DEFAULT_ACTION,
  CHANGE_INPUT,
  SELECT_DROPDOWN,
  SHOW_PASSWORD_MODAL,
  SET_MODAL_LOADING,
  SET_PASSWORD_FORM_HAS_ERROR,
  SET_SMS_CONFIRMATION_CHECKED,
  SET_SMS_UPDATES_CHECKED,
  SET_EMAIL_NEWSLETTER_CHECKED,
  SET_MSRMNT_SYSTEM,
  SET_MSRMNT_GENDER,
  RESET_REDUCER_DATA
} from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const inputChangeAction = (id: number, value: string): AnyAction => ({
  type: CHANGE_INPUT,
  id,
  value
})

export const selectDropdownAction = (id: string, key: string): AnyAction => ({
  type: SELECT_DROPDOWN,
  id,
  key
})

export const showPasswordModalAction = (show: boolean): AnyAction => ({
  type: SHOW_PASSWORD_MODAL,
  show
})

export const setModalLoadingAction = (loading: boolean): AnyAction => ({
  type: SET_MODAL_LOADING,
  loading
})

export const setPasswordModalValid = (hasError: boolean): AnyAction => ({
  type: SET_PASSWORD_FORM_HAS_ERROR,
  hasError
})

export const resetReducerDataAction = (): AnyAction => ({
  type: RESET_REDUCER_DATA
})

export const setSmsConfirmationChecked = (checked: boolean): AnyAction => ({
  type: SET_SMS_CONFIRMATION_CHECKED,
  checked
})

export const setSmsUpdatesChecked = (checked: boolean): AnyAction => ({
  type: SET_SMS_UPDATES_CHECKED,
  checked
})

export const setEmailConfirmationChecked = (checked: boolean): AnyAction => ({
  type: SET_EMAIL_NEWSLETTER_CHECKED,
  checked
})

export const SetMsrmntSystemAction = (system: string): AnyAction => ({
  type: SET_MSRMNT_SYSTEM,
  system
})

export const SetMsrmntGenderAction = (gender: string): AnyAction => ({
  type: SET_MSRMNT_GENDER,
  gender
})
