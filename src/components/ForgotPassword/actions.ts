/**
 * Home redux actions
 */
import { DEFAULT_ACTION, SET_EMAIL } from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setEmail = (param: string): AnyAction => {
  return {
    type: SET_EMAIL,
    param
  }
}
