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
import shoppingCartPage from '../screens/ShoppingCartPage/reducer'
import myTeamStores from '../components/MyTeamStores/reducer'
import warrantyProgram from '../screens/WarrantyProgram/reducer'
import aboutUsPage from '../screens/AboutUsPage/reducer'
import { Reducer } from '../types/common'

export interface ReducersObject {
  aboutUsPage: any
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
  app: any
  menuGender: any
  menuSports: any
  layout: any
  menu: any
  forgot: any
  quickView: any
  fitInfo: any
  responsiveReducer: any
  addresses: any
  cards: any
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
  aboutUsPage,
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
  addresses,
  cards,
  responsive: responsiveReducer,
  app: appReducer
})

export default rootReducer
