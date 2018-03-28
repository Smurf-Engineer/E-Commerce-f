/**
 * Designs  Actions - Created by david on 27/03/18.
 */
import { DEFAULT_ACTION, SET_LOADING_ACTION } from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setLoadingAction = (isLoading: boolean): AnyAction => ({
  type: SET_LOADING_ACTION,
  isLoading
})
