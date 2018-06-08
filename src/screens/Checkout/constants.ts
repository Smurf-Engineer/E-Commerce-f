/**
 * Checkout Types - Created by cazarez on 05/05/18.
 */
const namespace = 'src/Checkout'

export const DEFAULT_ACTION = `${namespace}/DEFAULT_ACTION`
export const STEP_ADVANCE = `${namespace}/STEP_ADVANCE`
export const RESET_DATA = `${namespace}/RESET_DATA`
// Shipping
export const VALID_FORM = `${namespace}/VALID_FORM`
export const CHANGE_INPUT = `${namespace}/CHANGE_INPUT`
export const SELECT_DROPDOWN = `${namespace}/SELECT_DROPDOWN`
export const SMS_CHECK = `${namespace}/SMS_CHECK`
export const EMAIL_CHECK = `${namespace}/EMAIL_CHECK`
export const SET_SELECTED_ADDRESS = `${namespace}/SET_SELECTED_ADDRESS`
export const SHOW_ADDRESS_FORM = `${namespace}/SHOW_ADDRESS_FORM`
// Billing
export const VALID_BILLING_FORM = `${namespace}/VALID_BILLING_FORM`
export const SAME_BILLING_AND_SHIPPING_CHECKED = `${namespace}/SAME_BILLING_AND_SHIPPING_CHECKED`
export const SAME_BILLING_AND_SHIPPING_UNCHECKED = `${namespace}/SAME_BILLING_AND_SHIPPING_UNCHECKED`
export const SET_STRIPE_ERROR = `${namespace}/SET_STRIPE_ERROR`
export const SET_LOADING_BILLING = `${namespace}/SET_LOADING_BILLING`
export const SET_STRIPE_TOKEN = `${namespace}/SET_STRIPE_TOKEN`
export const SET_STRIPE_CARD_DATA = `${namespace}/SET_STRIPE_CARD_DATA`
// Review
export const SET_LOADING_PLACE_ORDER = `${namespace}/SET_LOADING_PLACE_ORDER`
export const SET_PAYMENT_METHOD = `${namespace}/SET_PAYMENT_METHOD`
