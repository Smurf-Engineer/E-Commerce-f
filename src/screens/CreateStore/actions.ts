/**
 * CreateStore  Actions - Created by david on 09/04/18.
 */
import { DEFAULT_ACTION, SET_TEAM_SIZE_ACTION } from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setTeamSizeAction = (id: number, range: string): AnyAction => ({
  type: SET_TEAM_SIZE_ACTION,
  id,
  range
})
