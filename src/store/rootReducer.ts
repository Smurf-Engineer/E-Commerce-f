/**
 * Root reducer
 */
import { fromJS } from 'immutable'
import { combineReducers } from 'redux'
import home from '../screens/Home/reducer'
import menuGender from '../components/MenuGender/reducer'
import menuSports from '../components/MenuSports/reducer'
import menu from '../components/DropdownList/reducer'
import { Reducer } from '../types/common'

export interface ReducersObject {
  home: any
  app: any
  menuGender: any
  menuSports: any
  menu: any
  quickView: any
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
  menu,
  home,
  menuGender,
  menuSports,
  app: appReducer
})

export default rootReducer
