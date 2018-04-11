/**
 * CreateStore  Actions - Created by david on 09/04/18.
 */
import {
  DEFAULT_ACTION,
  SET_TEAM_SIZE_ACTION,
  UPDATE_NAME_ACTION,
  UPDATE_START_DATE_ACTION,
  UPDATE_END_DATE_ACTION,
  UPDATE_PRIVATE_ACTION,
  UPDATE_ON_DEMAND_ACTION,
  UPDATE_PASS_CODE_ACTION,
  SET_OPEN_LOCKER_ACTION
} from './constants'
import { Moment } from 'moment'
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

export const updateNameAction = (name: string): AnyAction => ({
  type: UPDATE_NAME_ACTION,
  name
})

export const updateStartDateAction = (
  dateMoment: Moment,
  date: string
): AnyAction => ({
  type: UPDATE_START_DATE_ACTION,
  dateMoment,
  date
})

export const updateEndDateAction = (
  dateMoment: Moment,
  date: string
): AnyAction => ({
  type: UPDATE_END_DATE_ACTION,
  dateMoment,
  date
})

export const updatePrivateAction = (active: boolean): AnyAction => ({
  type: UPDATE_PRIVATE_ACTION,
  active
})

export const updateOnDemandAction = (active: boolean): AnyAction => ({
  type: UPDATE_ON_DEMAND_ACTION,
  active
})

export const updatePassCodeAction = (code: string): AnyAction => ({
  type: UPDATE_PASS_CODE_ACTION,
  code
})

export const setOpenLockerAction = (isOpen: boolean): AnyAction => ({
  type: SET_OPEN_LOCKER_ACTION,
  isOpen
})
