/**
 * PayModal Reducer - Created by eduardoquintero on 16/01/20.
 */

import { fromJS } from 'immutable'
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
  SET_STRIPE_IBAN_DATA,
  SHOW_BILLING_ADDRESS_FORM,
  SHOW_CARD_FORM,
  STEP_ADVANCE,
  VALID_BILLING_FORM,
} from './constants'
import { Reducer } from '../../types/common'
import get from 'lodash/get'

export const initialState = fromJS({
  loading: false,
  currentStep: 0,
  cardHolderName: '',
  paymentMethod: '',
  billingFirstName: '',
  billingLastName: '',
  billingStreet: '',
  billingApartment: '',
  billingCountry: '',
  billingStateProvince: '',
  billingCity: '',
  shippingSave: false,
  billingSave: false,
  billingZipCode: '',
  billingPhone: '',
  billingHasError: false,
  cardNumber: '',
  cardExpDate: '',
  cardBrand: '',
  stripeError: '',
  ibanError: false,
  loadingBilling: false,
  stripeToken: '',
  showCardForm: false,
  showBillingForm: false,
  loadingPlaceOrder: false,
  selectedCard: {},
  ibanData: {},
  intentId: '',
  paymentClientSecret: '',
  indexAddressSelected: -1,
})

const payModalReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENT:
      return state.set('paymentMethod', action.value)
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
          billingSave: true,
          hasError: false,
          indexAddressSelected: -1
        })
      }
      return state.set('showBillingForm', false)
    }
    case SAVE_COUNTRY:
      return state.set('billingCountry', action.countryCode)
    case SET_LOADING_PLACE_ORDER:
      return state.set('loadingPlaceOrder', action.loading)
    case STEP_ADVANCE:
      return state.merge({
        currentStep: action.step,
        loadingBilling: false
      })
    case SET_SELECTED_CARD_TO_PAY:
      return state.merge({
        ...action.card,
        selectedCard: action.card,
        cardHolderName: action.card.name,
        showCardForm: false
      })
    case SET_SELECTED_ADDRESS: {
      const { address, index, billing } = action
      let selected = { ...address }
      if (billing) {
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

        selected = {
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
      }
      const addressType = billing ? 'billingSave' : 'shippingSave'
      return state.merge({
        ...selected,
        indexAddressSelected: index,
        [addressType]: index === -1,
        showForm: false
      })
    }
    case SET_STRIPE_IBAN_DATA:
      return state.merge({
        ibanData: action.iban,
        loadingBilling: false,
        stripeError: false
      })
    case CHANGE_INPUT:
      return state.merge({ [action.id]: action.value })
    case SET_STRIPE_CARD_DATA:
      return state.merge({
        stripeToken: action.stripeToken,
        selectedCard: action.card,
        loadingBilling: false,
        stripeError: false
      })
    case SET_LOADING_BILLING:
      return state.set('loadingBilling', action.loading)
    case SET_STRIPE_ERROR:
      return state.merge({ stripeError: action.error, loadingBilling: false })
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
    case SET_PAYMENT_ID:
      const { paymentClientSecret, intentId } = action
      return state.merge({ paymentClientSecret, intentId })
    case SELECT_DROPDOWN:
      return state.merge({ [action.id]: action.key })
    case REMOVE_CLIENT_SECRET:
      return state.merge({ paymentClientSecret: '', intentId: '' })
    case VALID_BILLING_FORM:
      return state.set('billingHasError', action.hasError)
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default payModalReducer
