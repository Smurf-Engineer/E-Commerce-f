/**
 * Root reducer
 */
import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import fitWidget from '../screens/FitWidget/reducer'
import designs from '../screens/Designs/reducer'
import productDetail from '../screens/ProductDetail/reducer'
import productCatalog from '../screens/ProductCatalogue/reducer'
import designCenter from '../screens/DesignCenter/reducer'
import languageProvider from '../screens/LanguageProvider/reducer'
import account from '../screens/Account/reducer'
import home from '../screens/Home/reducer'
import reset from '../screens/ResetPassword/reducer'
import subscriptionTest from '../screens/ResetPassword/reducer'
import menuGender from '../components/MenuGender/reducer'
import menuSports from '../components/MenuSports/reducer'
import layout from '../components/MainLayout/reducer'
import menu from '../components/DropdownList/reducer'
import forgot from '../components/ForgotPassword/reducer'
import fitInfo from '../components/FitInfo/reducer'
import { Reducer } from '../types/common'

export interface ReducersObject {
  account: any
  subscriptionTest: any
  fitWidget: any
  designs: any
  productDetail: any
  product: any
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
  responsiveReducer: any
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

const responsiveInitialState = fromJS({
  phone: null,
  tablet: null,
  mobile: null,
  desktop: null,
  fakeWidth: 1200
})

const responsiveReducer: Reducer<any> = (
  state = responsiveInitialState,
  action
) => {
  switch (action.type) {
    case '@@react-responsive-redux/SET_MOBILE_DETECT': {
      const { phone, tablet, mobile, desktop } = action
      let fakeWidth = 1200

      if (mobile) {
        if (phone) {
          fakeWidth = 767
        } else if (tablet) {
          fakeWidth = 991
        } else {
          fakeWidth = 767
        }
      }

      return state.merge({
        phone,
        tablet,
        mobile,
        desktop,
        fakeWidth
      })
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  account,
  subscriptionTest,
  fitWidget,
  designs,
  productDetail,
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
  responsive: responsiveReducer,
  app: appReducer
})

export default rootReducer
