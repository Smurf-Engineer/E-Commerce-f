/**
 * Home redux actions
 */
import { DEFAULT_ACTION, SET_PASSWORD, SET_CONFIRM_PASSWORD } from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setPassword = (param: string): AnyAction => {
  return {
    type: SET_PASSWORD,
    param
  }
}

export const setConfirmPassword = (param: string): AnyAction => {
  return {
    type: SET_CONFIRM_PASSWORD,
    param
  }
}
