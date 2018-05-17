/**
 * Checkout Reducer - Created by cazarez on 05/05/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  STEP_ADVANCE,
  VALID_FORM,
  CHANGE_INPUT,
  SELECT_DROPDOWN,
  SMS_CHECK,
  EMAIL_CHECK,
  SHOW_ADDRESS_FORM,
  SAME_BILLING_AND_SHIPPING_CHECKED,
  SAME_BILLING_AND_SHIPPING_UNCHECKED,
  SET_SELECTED_ADDRESS
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  currentStep: 0,
  // Shipping
  // shippingAddress: {
  firstName: '',
  lastName: '',
  street: '',
  apartment: '',
  country: '',
  stateProvince: '',
  city: '',
  zipCode: '',
  phone: '',
  hasError: false,
  indexAddressSelected: -1,
  // },
  emailCheck: false,
  smsCheck: false,
  showForm: false,
  // Billing
  billingFirstName: '',
  billingLastName: '',
  billingStreet: '',
  billingApartment: '',
  billingCountry: '',
  billingStateProvince: '',
  billingCity: '',
  billingZipCode: '',
  billingPhone: '',
  billingHasError: false,
  sameBillingAndShipping: false,
  cardHolderName: ''
})

const checkoutReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case STEP_ADVANCE:
      return state.set('currentStep', action.step)
    case VALID_FORM:
      return state.set('hasError', action.hasError)
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
    default:
      return state
  }
}

export default checkoutReducer
