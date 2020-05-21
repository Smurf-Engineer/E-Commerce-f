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
  RESET_REDUCER_DATA,
  SET_SETTINGS_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  RESET_PASSWORD_FORM,
  SET_PAYPAL_CURRENCY,
  SET_PAYPAL_CHECK,
  SET_LOADING,
  SET_FILE,
  OPEN_AFFILIATE
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

export const setPaypalCurrency = (value: string): AnyAction => ({
  type: SET_PAYPAL_CURRENCY,
  value
})

export const setPaypalCheck = (value: boolean): AnyAction => ({
  type: SET_PAYPAL_CHECK,
  value
})

export const setUploadingAction = (value: boolean): AnyAction => ({
  type: SET_LOADING,
  value
})

export const setFileAction = (value: string): AnyAction => ({
  type: SET_FILE,
  value
})

export const openAffiliate = (value: boolean): AnyAction => ({
  type: OPEN_AFFILIATE,
  value
})

export const setModalLoadingAction = (loading: boolean): AnyAction => ({
  type: SET_MODAL_LOADING,
  loading
})

export const setPasswordModalHasError = (hasError: boolean): AnyAction => ({
  type: SET_PASSWORD_FORM_HAS_ERROR,
  hasError
})

export const changePasswordSuccessAction = (): AnyAction => ({
  type: CHANGE_PASSWORD_SUCCESS
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

export const setMsrmntSystemAction = (system: string): AnyAction => ({
  type: SET_MSRMNT_SYSTEM,
  system
})

export const setMsrmntGenderAction = (gender: string): AnyAction => ({
  type: SET_MSRMNT_GENDER,
  gender
})

export const setSettingsLoadingAction = (
  key: string,
  loading: boolean
): AnyAction => ({
  type: SET_SETTINGS_LOADING,
  key,
  loading
})

export const resetPasswordFormAction = (): AnyAction => ({
  type: RESET_PASSWORD_FORM
})
