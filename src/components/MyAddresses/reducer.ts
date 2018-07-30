/**
 * Addresses Reducer - Created by miguel canobbio on 05/15/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  VALID_FORM,
  CHANGE_INPUT,
  SELECT_DROPDOWN,
  DEFAULT_SHIPPING_CHECK,
  DEFAULT_BILLING_CHECK,
  SHOW_ADDRESS_MODAL,
  SHOW_DELETE_ADDRESS_CONFIRM,
  HIDE_DELETE_ADDRESS_CONFIRM,
  SET_MODAL_LOADING,
  SET_DELETE_LOADING,
  SET_ADDRESS_UPDATE,
  RESET_REDUCER_DATA,
  SET_SKIP_VALUE
} from './constants'
import { Reducer } from '../../types/common'

const ADDRESSES_TO_SHOW = 10

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  firstName: '',
  lastName: '',
  street: '',
  apartment: '',
  country: '',
  stateProvince: '',
  city: '',
  zipCode: '',
  phone: '',
  addressIdToMutate: -1,
  showAddressModal: false,
  showDeleteAddressConfirm: false,
  modalLoading: false,
  deleteLoading: false,
  defaultBilling: false,
  defaultShipping: false,
  hasError: false,
  currentPage: 1,
  skip: 0,
  limit: ADDRESSES_TO_SHOW
})

const adressesReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case VALID_FORM:
      return state.set('hasError', action.hasError)
    case CHANGE_INPUT:
      return state.merge({ [action.id]: action.value })
    case SELECT_DROPDOWN:
      return state.merge({ [action.id]: action.key })
    case SHOW_ADDRESS_MODAL:
      return state.set('showAddressModal', action.show)
    case SHOW_DELETE_ADDRESS_CONFIRM:
      return state.merge({
        showDeleteAddressConfirm: true,
        addressIdToMutate: action.addressId
      })
    case HIDE_DELETE_ADDRESS_CONFIRM:
      return state.set('showDeleteAddressConfirm', false)
    case DEFAULT_SHIPPING_CHECK:
      return state.set('defaultShipping', action.checked)
    case DEFAULT_BILLING_CHECK:
      return state.set('defaultBilling', action.checked)
    case SET_MODAL_LOADING:
      return state.set('modalLoading', action.loading)
    case SET_DELETE_LOADING:
      return state.set('deleteLoading', action.loading)
    case RESET_REDUCER_DATA:
      return initialState
    case SET_ADDRESS_UPDATE:
      return state.merge({
        ...action.address,
        addressIdToMutate: action.address.id,
        showAddressModal: true
      })
    case SET_SKIP_VALUE:
      return state.merge({
        skip: action.skip,
        currentPage: action.currentPage
      })
    default:
      return state
  }
}

export default adressesReducer
