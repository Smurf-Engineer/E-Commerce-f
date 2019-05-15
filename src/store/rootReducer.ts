/**
 * Root reducer
 */
import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import fitWidget from '../screens/FitWidget/reducer'
import designerTool from '../screens/DesignerTool/reducer'
import designs from '../screens/Designs/reducer'
import productDetail from '../screens/ProductDetail/reducer'
import productCatalog from '../screens/ProductCatalogue/reducer'
import createStore from '../screens/CreateStore/reducer'
import designCenter from '../screens/DesignCenter/reducer'
import languageProvider from '../screens/LanguageProvider/reducer'
import account from '../screens/Account/reducer'
import home from '../screens/Home/reducer'
import reset from '../screens/ResetPassword/reducer'
import storeFront from '../screens/StoreFront/reducer'
import subscriptionTest from '../screens/ResetPassword/reducer'
import teamstoreProductPage from '../screens/TeamstoreProductPage/reducer'
import searchTeamstores from '../screens/SearchTeamstores/reducer'
import checkout from '../screens/Checkout/reducer'
import orderPlaced from '../screens/OrderPlaced/reducer'
import menuGender from '../components/MenuGender/reducer'
import menuSports from '../components/MenuSports/reducer'
import layout from '../components/MainLayout/reducer'
import menu from '../components/DropdownList/reducer'
import forgot from '../components/ForgotPassword/reducer'
import fitInfo from '../components/FitInfo/reducer'
import addresses from '../components/MyAddresses/reducer'
import cards from '../components/MyCards/reducer'
import profileSettings from '../components/ProfileSettings/reducer'
import shoppingCartPage from '../screens/ShoppingCartPage/reducer'
import myTeamStores from '../components/MyTeamStores/reducer'
import warrantyProgram from '../screens/WarrantyProgram/reducer'
import myLocker from '../components/MyLocker/reducer'
import myFiles from '../components/MyFiles/reducer'
import orderHistory from '../components/OrderHistory/reducer'
import orderHistoryAdmin from '../components/orderHistoryAdmin/reducer'
import productCatalogAdmin from '../components/ProductCatalog/reducer'
import productDetailAdmin from '../components/ProductDetailsAdmin/reducer'
import overview from '../components/Overview/reducer'
import customProductDetail from '../screens/CustomProductDetail/reducer'
import fitAndSizing from '../screens/FitAndSizing/reducer'
import designSearch from '../screens/DesignSearch/reducer'
import admin from '../screens/Admin/reducer'
import adminLayout from '../components/AdminLayout/reducer'
import { Reducer } from '../types/common'
import {
  SET_USER_ACTION,
  SET_USER_AGENT_ACTION,
  SET_COUNTRY_CODE
} from './constants'

export interface ReducersObject {
  designSearch: any
  customProductDetail: any
  warrantyProgram: any
  orderPlaced: any
  myTeamStores: any
  checkout: any
  designerTool: any
  shoppingCartPage: any
  storeFront: any
  createStore: any
  searchTeamstores: any
  teamstoreProductPage: any
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
  productDetailAdmin: any
  app: any
  menuGender: any
  productCatalogAdmin: any
  menuSports: any
  layout: any
  menu: any
  forgot: any
  quickView: any
  fitInfo: any
  responsiveReducer: any
  addresses: any
  cards: any
  profileSettings: any
  myLocker: any
  myFiles: any
  orderHistory: any
  orderHistoryAdmin: any
  overview: any
  fitAndSizing: any
  admin: any
  adminLayout: any
}

const appInitialState = fromJS({
  user: null,
  initialCountryCode: 'us'
})

const appReducer: Reducer<any> = (state = appInitialState, action) => {
  switch (action.type) {
    case SET_USER_ACTION:
      return state.set('user', action.user)
    case SET_USER_AGENT_ACTION:
      return state.merge({
        clientInfo: action.client,
        initialCountryCode: action.country
      })
    case SET_COUNTRY_CODE:
      return state.set('initialCountryCode', action.country)
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
  designSearch,
  customProductDetail,
  warrantyProgram,
  orderPlaced,
  myTeamStores,
  checkout,
  designerTool,
  shoppingCartPage,
  storeFront,
  createStore,
  searchTeamstores,
  teamstoreProductPage,
  account,
  subscriptionTest,
  fitWidget,
  designs,
  productDetail,
  productCatalog,
  productCatalogAdmin,
  designCenter,
  productDetailAdmin,
  languageProvider,
  menu,
  forgot,
  home,
  reset,
  menuGender,
  menuSports,
  layout,
  fitInfo,
  addresses,
  cards,
  profileSettings,
  myLocker,
  myFiles,
  orderHistory,
  orderHistoryAdmin,
  overview,
  fitAndSizing,
  responsive: responsiveReducer,
  app: appReducer,
  admin,
  adminLayout
})

export default rootReducer
