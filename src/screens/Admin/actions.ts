import { SET_DEFAULT_SCREEN, CLEAR_REDUCER } from './constants'
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
