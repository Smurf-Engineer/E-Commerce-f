/**
 * Checkout  Actions - Created by cazarez on 05/05/18.
 */
import {
  DEFAULT_ACTION,
  STEP_ADVANCE,
  VALID_FORM,
  VALID_BILLING_FORM,
  CHANGE_INPUT,
  SELECT_DROPDOWN,
  SMS_CHECK,
  EMAIL_CHECK,
  SHOW_ADDRESS_FORM,
  SAME_BILLING_AND_SHIPPING_CHECKED,
  SAME_BILLING_AND_SHIPPING_UNCHECKED,
  SET_SELECTED_ADDRESS,
  SET_STRIPE_ERROR,
  SET_LOADING_BILLING,
  SET_STRIPE_TOKEN,
  SET_STRIPE_CARD_DATA,
  SET_LOADING_PLACE_ORDER,
  RESET_DATA,
  SET_PAYMENT_METHOD,
  SAVE_COUNTRY,
  OPEN_ADDRESSES_MODAL,
  SET_SKIP_VALUE,
  SHOW_CARD_FORM,
  SET_SELECTED_CARD_TO_PAY
} from './constants'
import { AnyAction, AddressType, CreditCardData } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const stepAdvanceAction = (step: number): AnyAction => ({
  type: STEP_ADVANCE,
  step
})

export const validFormAction = (hasError: boolean): AnyAction => ({
  type: VALID_FORM,
  hasError
})

export const invalidBillingFormAction = (hasError: boolean): AnyAction => ({
  type: VALID_BILLING_FORM,
  hasError
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

export const smsCheckAction = (checked: boolean): AnyAction => ({
  type: SMS_CHECK,
  checked
})

export const emailCheckAction = (checked: boolean): AnyAction => ({
  type: EMAIL_CHECK,
  checked
})

export const showAddressFormAction = (show: boolean): AnyAction => ({
  type: SHOW_ADDRESS_FORM,
  show
})

export const sameBillingAndAddressCheckedAction = (): AnyAction => ({
  type: SAME_BILLING_AND_SHIPPING_CHECKED
})

export const sameBillingAndAddressUncheckedAction = (): AnyAction => ({
  type: SAME_BILLING_AND_SHIPPING_UNCHECKED
})

export const setSelectedAddressAction = (
  address: AddressType,
  index: number
): AnyAction => ({
  type: SET_SELECTED_ADDRESS,
  address,
  index
})

export const setStripeErrorAction = (error: string): AnyAction => ({
  type: SET_STRIPE_ERROR,
  error
})

export const setLoadingBillingAction = (loading: boolean): AnyAction => ({
  type: SET_LOADING_BILLING,
  loading
})

export const setStripeTokenAction = (token: string): AnyAction => ({
  type: SET_STRIPE_TOKEN,
  token
})

export const setStripeCardDataAction = (card: CreditCardData): AnyAction => ({
  type: SET_STRIPE_CARD_DATA,
  card
})

export const setLoadingPlaceOrderAction = (loading: boolean): AnyAction => ({
  type: SET_LOADING_PLACE_ORDER,
  loading
})

export const resetReducerAction = (): AnyAction => ({
  type: RESET_DATA
})

export const setPaymentMethodAction = (method: string): AnyAction => ({
  type: SET_PAYMENT_METHOD,
  method
})

export const saveCountryAction = (countryId: number | null): AnyAction => ({
  type: SAVE_COUNTRY,
  countryId
})

export const openAddressesModalAction = (open: boolean): AnyAction => ({
  type: OPEN_ADDRESSES_MODAL,
  open
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

export const setSkipValueAction = (
  skip: number,
  currentPage: number
): AnyAction => ({
  type: SET_SKIP_VALUE,
  skip,
  currentPage
})
