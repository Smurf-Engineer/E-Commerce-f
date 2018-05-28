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
  SET_DELETE_LOADING,
  RESET_REDUCER_DATA,
  SET_CARD_UPDATE
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

export const inputChangeAction = (id: number, value: string): AnyAction => ({
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

export const showDeleteCardConfirmAction = (cardId: number): AnyAction => ({
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
