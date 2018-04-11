/**
 * CreateStore Reducer - Created by david on 09/04/18.
 */
import { fromJS } from 'immutable'
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
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  teamSizeId: -1,
  teamSizeRange: '',
  name: '',
  startDate: '',
  startDateMoment: null,
  endDate: '',
  endDateMoment: null,
  privateStore: true,
  onDemand: false,
  passCode: '',
  openLocker: false
})

const createStoreReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    case UPDATE_NAME_ACTION:
      return state.set('name', action.name)
    case UPDATE_START_DATE_ACTION:
      return state.merge({
        startDate: action.date,
        startDateMoment: action.dateMoment,
        endDate: '',
        endDateMoment: null
      })
    case UPDATE_END_DATE_ACTION:
      return state.merge({
        endDate: action.date,
        endDateMoment: action.dateMoment
      })
    case UPDATE_PRIVATE_ACTION:
      return state.set('privateStore', action.active)
    case UPDATE_ON_DEMAND_ACTION:
      return state.set('onDemand', action.active)
    case SET_TEAM_SIZE_ACTION:
      return state.merge({
        teamSizeId: action.id,
        teamSizeRange: action.range
      })
    case UPDATE_PASS_CODE_ACTION:
      return state.set('passCode', action.code)
    case SET_OPEN_LOCKER_ACTION:
      return state.set('openLocker', action.isOpen)
    default:
      return state
  }
}

export default createStoreReducer
