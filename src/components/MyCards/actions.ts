/**
 * CA Actions - Created by miguelcanobbio on 05/15/18.
 */
import {
  DEFAULT_ACTION,
  VALID_FORM,
  CHANGE_INPUT,
  DEFAULT_PAYMENT_CHECK,
  SHOW_CARD_MODAL,
  SHOW_DELETE_CARD_CONFIRM,
  HIDE_DELETE_CARD_CONFIRM,
  SET_MODAL_LOADING,
  OPEN_COUNTRY_MODAL,
  SAVE_COUNTRY,
  SET_DELETE_LOADING,
  RESET_REDUCER_DATA,
  SET_CARD_UPDATE,
  SET_STRIPE_ERROR,
  SET_DEFAULT_PAYMENT_CHECKED,
  SET_LOADING
} from './constants'
import { AnyAction, CreditCardData } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const validFormAction = (hasError: boolean): AnyAction => ({
  type: VALID_FORM,
  hasError
})

export const setDefaultPaymentCheckedAction = (
  checked: boolean
): AnyAction => ({
  type: SET_DEFAULT_PAYMENT_CHECKED,
  checked
})

export const inputChangeAction = (id: string, value: string): AnyAction => ({
  type: CHANGE_INPUT,
  id,
  value
})

export const defaultPaymentAction = (checked: boolean): AnyAction => ({
  type: DEFAULT_PAYMENT_CHECK,
  checked
})

export const showCardModalAction = (show: boolean): AnyAction => ({
  type: SHOW_CARD_MODAL,
  show
})

export const showDeleteCardConfirmAction = (cardId: string): AnyAction => ({
  type: SHOW_DELETE_CARD_CONFIRM,
  cardId
})

export const hideDeleteCardConfirmAction = (): AnyAction => ({
  type: HIDE_DELETE_CARD_CONFIRM
})

export const setModalLoadingAction = (loading: boolean): AnyAction => ({
  type: SET_MODAL_LOADING,
  loading
})

export const setDeleteLoadingAction = (loading: boolean): AnyAction => ({
  type: SET_DELETE_LOADING,
  loading
})

export const resetReducerDataAction = (): AnyAction => ({
  type: RESET_REDUCER_DATA
})

export const setCardToUpdateAction = (card: CreditCardData): AnyAction => ({
  type: SET_CARD_UPDATE,
  card
})

export const setStripeErrorAction = (error: string): AnyAction => ({
  type: SET_STRIPE_ERROR,
  error
})

export const setLoadingAction = (loading: boolean): AnyAction => ({
  type: SET_LOADING,
  loading
})

export const openCountryModalAction = (open: boolean): AnyAction => ({
  type: OPEN_COUNTRY_MODAL,
  open
})

export const saveCountryAction = (countryCode: string | null): AnyAction => ({
  type: SAVE_COUNTRY,
  countryCode
})
