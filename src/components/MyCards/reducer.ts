/**
 * MyCards Reducer - Created by miguel canobbio on 05/15/18.
 */
import { fromJS } from 'immutable'
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
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  cardHolderName: '',
  stripeError: '',
  cardIdToMutate: '',
  cardAsDefaultPayment: false,
  showCardModal: false,
  showDeleteCardConfirm: false,
  modalLoading: false,
  openCountryModal: false,
  billingCountry: '',
  deleteLoading: false,
  defaultPayment: false,
  hasError: false,
  loading: false
})

const adressesReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case VALID_FORM:
      return state.set('hasError', action.hasError)
    case CHANGE_INPUT:
      return state.merge({ [action.id]: action.value })
    case SHOW_CARD_MODAL: {
      if (action.show) {
        return state.set('showCardModal', true)
      } else {
        return initialState
      }
    }
    case SHOW_DELETE_CARD_CONFIRM:
      return state.merge({
        showDeleteCardConfirm: true,
        cardIdToMutate: action.cardId
      })
    case HIDE_DELETE_CARD_CONFIRM:
      return state.merge({
        showDeleteCardConfirm: false,
        cardIdToMutate: ''
      })
    case DEFAULT_PAYMENT_CHECK:
      return state.set('defaultPayment', action.checked)
    case SET_MODAL_LOADING:
      return state.set('modalLoading', action.loading)
    case SET_DELETE_LOADING:
      return state.set('deleteLoading', action.loading)
    case RESET_REDUCER_DATA:
      return initialState
    case SET_CARD_UPDATE:
      return state.merge({
        ...action.card,
        cardIdToMutate: action.card.id,
        showCardModal: true
      })
    case SET_STRIPE_ERROR:
      return state.merge({
        stripeError: action.error,
        hasError: true,
        modalLoading: false
      })
    case SET_DEFAULT_PAYMENT_CHECKED:
      return state.set('cardAsDefaultPayment', action.checked)
    case SET_LOADING:
      return state.set('loading', action.loading)
    case OPEN_COUNTRY_MODAL:
      return state.set('openCountryModal', action.open)
    case SAVE_COUNTRY:
      return state.set('billingCountry', action.countryCode)
    default:
      return state
  }
}

export default adressesReducer
