/**
 * StoreFront Reducer - Created by gustavomedina on 11/04/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  OPEN_SHARE_MODAL,
  OPEN_PASS_CODE,
  SET_PASS_CODE
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  passCode: '',
  openShare: false,
  openPassCode: false
})

const storeFrontReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case OPEN_SHARE_MODAL:
      return state.merge({
        openShare: action.open,
        storeId: action.storeId
      })
    case OPEN_PASS_CODE:
      return state.set('openPassCode', action.open)
    case SET_PASS_CODE:
      return state.merge({ passCode: action.param })
    default:
      return state
  }
}

export default storeFrontReducer
