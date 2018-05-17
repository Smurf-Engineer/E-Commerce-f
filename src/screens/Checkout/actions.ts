/**
 * Checkout  Actions - Created by cazarez on 05/05/18.
 */
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
import { AnyAction, AddressType } from '../../types/common'

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
