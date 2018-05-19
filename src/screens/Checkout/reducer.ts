/**
 * Checkout Reducer - Created by cazarez on 05/05/18.
 */
import { fromJS } from 'immutable'
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
  SET_STRIPE_CARD_DATA
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  currentStep: 2,
  // Shipping
  firstName: 'Miguel',
  lastName: 'Canobbio',
  street: 'papiro',
  apartment: '6109',
  country: 'usa',
  stateProvince: 'arizona',
  city: 'phoenix',
  zipCode: '80000',
  phone: '6671776980',
  hasError: false,
  indexAddressSelected: -1,
  emailCheck: false,
  smsCheck: false,
  showForm: false,
  // Billing
  billingFirstName: 'Miguel',
  billingLastName: 'Canobbio',
  billingStreet: 'papiro',
  billingApartment: '6109',
  billingCountry: 'usa',
  billingStateProvince: 'arizona',
  billingCity: 'phoenix',
  billingZipCode: '80000',
  billingPhone: '6671776980',
  billingHasError: false,
  sameBillingAndShipping: true, // TODO: RESET
  cardHolderName: 'Miguel Angel Canobbio',
  cardNumber: '4242',
  cardExpDate: '04/24',
  cardBrand: 'Visa',
  stripeError: '',
  loadingBilling: false,
  stripeToken: 'tok_1CTHovEpLzfrQsrn9nhz5y8t'
})

const checkoutReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case STEP_ADVANCE:
      return state.set('currentStep', action.step)
    case VALID_FORM:
      return state.set('hasError', action.hasError)
    case SET_STRIPE_ERROR:
      return state.merge({ stripeError: action.error, loadingBilling: false })
    case VALID_BILLING_FORM:
      return state.set('billingHasError', action.hasError)
    case CHANGE_INPUT:
      return state.merge({ [action.id]: action.value })
    case SELECT_DROPDOWN:
      return state.merge({ [action.id]: action.key })
    case SMS_CHECK:
      return state.set('smsCheck', action.checked)
    case EMAIL_CHECK:
      return state.set('emailCheck', action.checked)
    case SET_SELECTED_ADDRESS:
      return state.merge({
        ...action.address,
        indexAddressSelected: action.index
      })
    case SAME_BILLING_AND_SHIPPING_UNCHECKED:
      return state.merge({
        sameBillingAndShipping: false,
        billingFirstName: '',
        billingLastName: '',
        billingStreet: '',
        billingApartment: '',
        billingCountry: '',
        billingState: '',
        billingCity: '',
        billingZipCode: '',
        billingPhone: '',
        billingHasError: false
      })
    case SAME_BILLING_AND_SHIPPING_CHECKED: {
      const {
        firstName,
        lastName,
        street,
        apartment,
        country,
        city,
        zipCode,
        phone,
        stateProvince
      } = state.toJS()
      return state.merge({
        sameBillingAndShipping: true,
        billingFirstName: firstName,
        billingLastName: lastName,
        billingStreet: street,
        billingApartment: apartment,
        billingCountry: country,
        billingStateProvince: stateProvince,
        billingCity: city,
        billingZipCode: zipCode,
        billingPhone: phone
      })
    }
    case SHOW_ADDRESS_FORM:
      return state.set('showForm', action.show)
    case SET_LOADING_BILLING:
      return state.set('loadingBilling', action.loading)
    case SET_STRIPE_TOKEN:
      return state.merge({
        stripeToken: action.token,
        stripeError: '',
        loadingBilling: false
      })
    case SET_STRIPE_CARD_DATA:
      return state.merge({ ...action.stripeCardData })
    default:
      return state
  }
}

export default checkoutReducer
