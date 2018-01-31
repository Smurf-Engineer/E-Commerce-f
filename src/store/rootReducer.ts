/**
 * Root reducer
 */
import { fromJS } from 'immutable'
import { combineReducers, AnyAction } from 'redux'
import home from '../containers/Home/reducer'
import { Reducer } from '../types/common'

export interface ReducersObject {
  app: any
  home: any
}

const appInitialState = fromJS({
  user: {}
})

const appReducer: Reducer<any> = (state = appInitialState, action) => {
  switch (action.type) {
    case 'Some type action':
      return state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  app: appReducer,
  home
})

export default rootReducer
