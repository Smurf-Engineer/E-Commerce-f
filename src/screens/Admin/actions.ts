import { SET_DEFAULT_SCREEN } from './constants'
import { AnyAction } from '../../types/common'

export const setDefaultScreenAction = (
  screen: string,
  openCreations?: boolean
): AnyAction => ({
  type: SET_DEFAULT_SCREEN,
  screen,
  openCreations: true
})
