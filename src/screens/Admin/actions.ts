import {
  SET_DEFAULT_SCREEN,
  CLEAR_REDUCER,
  SET_LOADING,
  OPEN_FORGOT_PASSWORD
} from './constants'
import { AnyAction } from '../../types/common'

export const setDefaultScreenAction = (
  screen: string,
  openCreations?: boolean
): AnyAction => ({
  type: SET_DEFAULT_SCREEN,
  screen,
  openCreations: true
})

export const clearReducerAction = (): AnyAction => ({
  type: CLEAR_REDUCER
})

export const setLoadingAction = (loading: boolean) => ({
  type: SET_LOADING,
  loading
})

export const openForgotPasswordAction = () => ({
  type: OPEN_FORGOT_PASSWORD
})
