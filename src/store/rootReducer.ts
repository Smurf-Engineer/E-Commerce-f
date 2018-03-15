/**
 * Root reducer
 */
import { fromJS } from 'immutable'
import { combineReducers } from 'redux'
import productCatalog from '../screens/ProductCatalogue/reducer'
import designCenter from '../screens/DesignCenter/reducer'
import languageProvider from '../screens/LanguageProvider/reducer'
import home from '../screens/Home/reducer'
import reset from '../screens/ResetPassword/reducer'
import menuGender from '../components/MenuGender/reducer'
import menuSports from '../components/MenuSports/reducer'
import layout from '../components/MainLayout/reducer'
import menu from '../components/DropdownList/reducer'
import forgot from '../components/ForgotPassword/reducer'
import fitInfo from '../components/FitInfo/reducer'
import { Reducer } from '../types/common'

export interface ReducersObject {
  productCatalog: any
  designCenter: any
  languageProvider: any
  home: any
  reset: any
  app: any
  menuGender: any
  menuSports: any
  layout: any
  menu: any
  forgot: any
  quickView: any
  fitInfo: any
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
  productCatalog,
  designCenter,
  languageProvider,
  menu,
  forgot,
  home,
  reset,
  menuGender,
  menuSports,
  layout,
  fitInfo,
  app: appReducer
})

export default rootReducer
