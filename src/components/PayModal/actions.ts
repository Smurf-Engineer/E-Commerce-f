/**
 * PayModal  Actions - Created by eduardoquintero on 16/01/20.
 */

import {
  CHANGE_INPUT,
  REMOVE_CLIENT_SECRET,
  RESET_DATA,
  SAVE_COUNTRY,
  SELECT_DROPDOWN,
  SET_LOADING_BILLING,
  SET_LOADING_PLACE_ORDER,
  SET_PAYMENT,
  SET_PAYMENT_ID,
  SET_SELECTED_ADDRESS,
  SET_SELECTED_CARD_TO_PAY,
  SET_STRIPE_CARD_DATA,
  SET_STRIPE_ERROR,
  SHOW_BILLING_ADDRESS_FORM,
  SHOW_CARD_FORM,
  STEP_ADVANCE,
  VALID_BILLING_FORM,
} from './constants'

import { AddressType, AnyAction, CreditCardData } from '../../types/common'

export const resetDataAction = (): AnyAction => ({
  type: RESET_DATA
})

export const setPaymentMethodAction = (value: string): AnyAction => ({
  type: SET_PAYMENT,
  value
})

export const setLoadingBillingAction = (loading: boolean): AnyAction => ({
  type: SET_LOADING_BILLING,
  loading
})

export const setStripeErrorAction = (error: string): AnyAction => ({
  type: SET_STRIPE_ERROR,
  error
})

export const invalidBillingFormAction = (hasError: boolean): AnyAction => ({
  type: VALID_BILLING_FORM,
  hasError
})

export const showCardFormAction = (
  open: boolean,
  card?: string
): AnyAction => ({
  type: SHOW_CARD_FORM,
  open,
  card
})

export const selectCardToPayAction = (
  card: CreditCardData,
  cardId?: string
) => {
  return {
    type: SET_SELECTED_CARD_TO_PAY,
    card,
    cardId
  }
}

export const setSelectedAddressAction = (
  address: AddressType,
  index: number,
  billing: boolean
): AnyAction => ({
  type: SET_SELECTED_ADDRESS,
  address,
  index,
  billing
})

export const showBillingAddressFormAction = (show: boolean): AnyAction => ({
  type: SHOW_BILLING_ADDRESS_FORM,
  show
})

export const satPaymentIdAction = (
  paymentClientSecret: string,
  intentId: string
): AnyAction => ({
  type: SET_PAYMENT_ID,
  paymentClientSecret,
  intentId
})

export const removeClientSecretAction = (): AnyAction => ({
  type: REMOVE_CLIENT_SECRET
})

export const setStripeCardDataAction = (
  card: CreditCardData,
  stripeToken: string
): AnyAction => ({
  type: SET_STRIPE_CARD_DATA,
  card,
  stripeToken
})

export const selectDropdownAction = (id: string, key: string): AnyAction => ({
  type: SELECT_DROPDOWN,
  id,
  key
})

export const inputChangeAction = (id: number, value: string): AnyAction => ({
  type: CHANGE_INPUT,
  id,
  value
})

export const stepAdvanceAction = (step: number): AnyAction => ({
  type: STEP_ADVANCE,
  step
})

export const setLoadingPlaceOrderAction = (loading: boolean): AnyAction => ({
  type: SET_LOADING_PLACE_ORDER,
  loading
})

export const saveCountryAction = (countryCode: string | null): AnyAction => ({
  type: SAVE_COUNTRY,
  countryCode
})