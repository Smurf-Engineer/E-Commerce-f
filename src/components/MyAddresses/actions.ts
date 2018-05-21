/**
 * Addresses Actions - Created by miguelcanobbio on 05/15/18.
 */
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
  RESET_REDUCER_DATA,
  SET_ADDRESS_UPDATE
} from './constants'
import { AnyAction, AddressType } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const validFormAction = (hasError: boolean): AnyAction => ({
  type: VALID_FORM,
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

export const defaultShippingAction = (checked: boolean): AnyAction => ({
  type: DEFAULT_SHIPPING_CHECK,
  checked
})

export const defaultBillingAction = (checked: boolean): AnyAction => ({
  type: DEFAULT_BILLING_CHECK,
  checked
})

export const showAddressModalAction = (show: boolean): AnyAction => ({
  type: SHOW_ADDRESS_MODAL,
  show
})

export const showDeleteAddressConfirmAction = (
  addressId: number
): AnyAction => ({
  type: SHOW_DELETE_ADDRESS_CONFIRM,
  addressId
})

export const hideDeleteAddressConfirmAction = (): AnyAction => ({
  type: HIDE_DELETE_ADDRESS_CONFIRM
})

export const setModalLoadingAction = (loading: boolean): AnyAction => ({
  type: SET_MODAL_LOADING,
  loading
})

export const setDeleteLoadingAction = (loading: boolean): AnyAction => ({
  type: SET_DELETE_LOADING,
  loading
})

export const resetReducerDataAction = (): AnyAction => ({
  type: RESET_REDUCER_DATA
})

export const setAddressToUpdateAction = (address: AddressType): AnyAction => ({
  type: SET_ADDRESS_UPDATE,
  address
})
