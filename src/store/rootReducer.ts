/**
 * Root reducer
 */
import { fromJS } from 'immutable'
import { combineReducers } from 'redux'
import home from '../screens/Home/reducer'
import { Reducer } from '../types/common'

export interface ReducersObject {
  home: any
  app: any
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
  home,
  app: appReducer
})

export default rootReducer
