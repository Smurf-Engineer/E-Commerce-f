/**
 * Checkout Reducer - Created by cazarez on 05/05/18.
 */
import { fromJS } from 'immutable'
import get from 'lodash/get'
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
  SHOW_BILLING_ADDRESS_FORM,
  SAME_BILLING_AND_SHIPPING_CHECKED,
  SAME_BILLING_AND_SHIPPING_UNCHECKED,
  SET_SHIPPING_ADDRESS,
  SET_BILLING_ADDRESS,
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
  SET_SELECTED_CARD_TO_PAY,
  SET_COUPON_CODE,
  DELETE_COUPON_CODE,
  OPEN_CURRENCY_WARNING,
  SET_SELECTED_ADDRESSES,
  PaymentOptions
} from './constants'
import { Reducer } from '../../types/common'

const ADDRESSES_TO_SHOW = 10

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  currentStep: 0,
  // Shipping
  firstName: '',
  lastName: '',
  street: '',
  apartment: '',
  country: '',
  stateProvince: '',
  stateProvinceCode: '',
  city: '',
  zipCode: '',
  phone: '',
  hasError: false,
  indexAddressSelected: -1,
  emailCheck: false,
  smsCheck: false,
  showForm: false,
  skip: 0,
  currentPage: 1,
  limit: ADDRESSES_TO_SHOW,
  // Billing
  billingAddressSelected: -1,
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
  cardHolderName: '',
  cardNumber: '',
  cardExpDate: '',
  cardBrand: '',
  stripeError: '',
  loadingBilling: false,
  stripeToken: '',
  showCardForm: false,
  showBillingForm: false,
  selectedCard: {},
  // Review
  loadingPlaceOrder: false,
  paymentMethod: 'credit card',
  countryId: null,
  openAddressesModal: false,
  couponCode: null,
  openCurrencyWarning: false
})

const checkoutReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case STEP_ADVANCE:
      return state.merge({
        currentStep: action.step,
        loadingBilling: false
      })
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
    case SET_SHIPPING_ADDRESS: {
      const { address, index } = action
      return state.merge({
        ...address,
        indexAddressSelected: index,
        showForm: false
      })
    }
    case SET_BILLING_ADDRESS: {
      const { address, index } = action
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
      } = address

      const selected = {
        billingFirstName: firstName,
        billingLastName: lastName,
        billingStreet: street,
        billingApartment: apartment,
        billingCountry: country,
        billingStateProvince: stateProvince,
        billingCity: city,
        billingZipCode: zipCode,
        billingPhone: phone
      }

      return state.merge({
        ...selected,
        billingAddressSelected: index,
        showBillingForm: false
      })
    }
    case SET_SELECTED_ADDRESSES: {
      const {
        address: {
          firstName,
          lastName,
          street,
          apartment,
          country,
          city,
          zipCode,
          phone,
          stateProvince
        },
        index
      } = action
      return state.merge({
        ...action.address,
        billingFirstName: firstName,
        billingLastName: lastName,
        billingStreet: street,
        billingApartment: apartment,
        billingCountry: country,
        billingStateProvince: stateProvince,
        billingCity: city,
        billingZipCode: zipCode,
        billingPhone: phone,
        indexAddressSelected: index
      })
    }
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
        showBillingForm: false,
        billingFirstName: firstName,
        billingLastName: lastName,
        billingStreet: street,
        billingApartment: apartment,
        billingCountry: country,
        billingStateProvince: stateProvince,
        billingCity: city,
        billingZipCode: zipCode,
        billingPhone: phone,
        billingAddressSelected: -1
      })
    }
    case SHOW_ADDRESS_FORM: {
      if (action.show) {
        return state.merge({
          showForm: true,
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
          indexAddressSelected: -1
        })
      }
      return state.set('showForm', false)
    }
    case SHOW_BILLING_ADDRESS_FORM: {
      if (action.show) {
        return state.merge({
          showBillingForm: true,
          billingFirstName: '',
          billingLastName: '',
          billingStreet: '',
          billingApartment: '',
          billingCountry: '',
          billingStateProvince: '',
          billingCity: '',
          billingZipCode: '',
          billingPhone: '',
          hasError: false,
          billingAddressSelected: -1
        })
      }
      return state.set('showBillingForm', false)
    }
    case SHOW_CARD_FORM: {
      if (!action.open) {
        const name = get(action, 'card.name', '')
        return state.merge({
          showCardForm: false,
          selectedCard: action.card,
          cardHolderName: name,
          stripeToken: ''
        })
      }
      return state.merge({
        showCardForm: action.open,
        selectedCard: '',
        cardHolderName: ''
      })
    }
    case SET_SELECTED_CARD_TO_PAY:
      return state.merge({
        ...action.card,
        selectedCard: action.card,
        cardHolderName: action.card.name,
        showCardForm: false
      })
    case SET_SKIP_VALUE:
      return state.merge({
        skip: action.skip,
        currentPage: action.currentPage
      })

    case SET_LOADING_BILLING:
      return state.set('loadingBilling', action.loading)
    case SET_STRIPE_TOKEN:
      return state.merge({
        stripeToken: action.token,
        stripeError: '',
        loadingBilling: false
      })
    case SET_STRIPE_CARD_DATA:
      return state.merge({
        stripeToken: action.stripeToken,
        selectedCard: action.card,
        loadingBilling: false,
        stripeError: false
      })
    case SET_LOADING_PLACE_ORDER:
      return state.set('loadingPlaceOrder', action.loading)
    case RESET_DATA:
      return initialState
    case SET_PAYMENT_METHOD: {
      const { method } = action
      if (method === PaymentOptions.PAYPAL) {
        return state.merge({
          paymentMethod: method,
          sameBillingAndShipping: false,
          billingFirstName: '',
          billingLastName: '',
          billingStreet: '',
          billingApartment: '',
          billingCountry: '',
          billingState: '',
          billingStateProvince: '',
          billingCity: '',
          billingZipCode: '',
          billingPhone: '',
          billingHasError: false
        })
      }
      return state.set('paymentMethod', method)
    }
    case SAVE_COUNTRY:
      return state.set('billingCountry', action.countryCode)
    case OPEN_ADDRESSES_MODAL:
      return state.set('openAddressesModal', action.open)
    case SET_COUPON_CODE:
      return state.set('couponCode', action.couponCode)
    case DELETE_COUPON_CODE:
      return state.set('couponCode', null)
    case OPEN_CURRENCY_WARNING:
      return state.set('openCurrencyWarning', action.open)
    default:
      return state
  }
}

export default checkoutReducer
