/**
 * PayModal Types - Created by eduardoquintero on 16/01/20.
 */

const namespace = 'src/PayModal'

export const RESET_DATA = `${namespace}/RESET_DATA`
export const SET_PAYMENT = `${namespace}/SET_PAYMENT`
export const SET_LOADING_BILLING = `${namespace}/SET_LOADING_BILLING`
export const SET_STRIPE_ERROR = `${namespace}/SET_STRIPE_ERROR`
export const VALID_BILLING_FORM = `${namespace}/VALID_BILLING_FORM`
export const SHOW_CARD_FORM = `${namespace}/SHOW_CARD_FORM`
export const SET_SELECTED_CARD_TO_PAY = `${namespace}/SET_SELECTED_CARD_TO_PAY`
export const SET_SELECTED_ADDRESS = `${namespace}/SET_SELECTED_ADDRESS`
export const SHOW_BILLING_ADDRESS_FORM = `${namespace}/SHOW_BILLING_ADDRESS_FORM`
export const SET_PAYMENT_ID = `${namespace}/SET_PAYMENT_ID`
export const REMOVE_CLIENT_SECRET = `${namespace}/REMOVE_CLIENT_SECRET`
export const SET_STRIPE_CARD_DATA = `${namespace}/SET_STRIPE_CARD_DATA`
export const SELECT_DROPDOWN = `${namespace}/SELECT_DROPDOWN`
export const CHANGE_INPUT = `${namespace}/CHANGE_INPUT`
export const SAVE_COUNTRY = `${namespace}/SAVE_COUNTRY`
export const STEP_ADVANCE = `${namespace}/STEP_ADVANCE`
export const SET_LOADING_PLACE_ORDER = `${namespace}/SET_LOADING_PLACE_ORDER`
export const SET_STRIPE_IBAN_DATA = `${namespace}/SET_STRIPE_IBAN_DATA`

export enum PaymentOptions {
    PAYPAL = 'paypal',
    CREDITCARD = 'creditcard',
    IBAN = 'iban',
    INVOICE = 'invoice'
}