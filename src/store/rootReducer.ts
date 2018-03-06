/**
 * Root reducer
 */
import { fromJS } from 'immutable'
import { combineReducers } from 'redux'
import designCenter from '../screens/DesignCenter/reducer'
import languageProvider from '../screens/LanguageProvider/reducer'
import home from '../screens/Home/reducer'
import reset from '../screens/ResetPassword/reducer'
import menuGender from '../components/MenuGender/reducer'
import menuSports from '../components/MenuSports/reducer'
import layout from '../components/MainLayout/reducer'
import menu from '../components/DropdownList/reducer'
import { Reducer } from '../types/common'

export interface ReducersObject {
  designCenter: any
  languageProvider: any
  home: any
  reset: any
  app: any
  menuGender: any
  menuSports: any
  layout: any
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
  designCenter,
  languageProvider,
  menu,
  home,
  reset,
  menuGender,
  menuSports,
  layout,
  app: appReducer
})

export default rootReducer
