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
import designLabLanding from '../screens/DesignLabLanding/reducer'
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
import affiliateOptions from '../components/AffiliateOptions/reducer'
import shoppingCartPage from '../screens/ShoppingCartPage/reducer'
import myTeamStores from '../components/MyTeamStores/reducer'
import warrantyProgram from '../screens/WarrantyProgram/reducer'
import myLocker from '../components/MyLocker/reducer'
import myFiles from '../components/MyFiles/reducer'
import payModal from '../components/PayModal/reducer'
import orderHistory from '../components/OrderHistory/reducer'
import orderHistoryAdmin from '../components/OrderHistoryAdmin/reducer'
import discountsAdmin from '../components/DiscountsAdmin/reducer'
import homepageAdmin from '../components/HomepageAdmin/reducer'
import designLabAdmin from '../components/DesignLabAdmin/reducer'
import productCatalogAdmin from '../components/ProductCatalog/reducer'
import productDetailAdmin from '../components/ProductDetailsAdmin/reducer'
import productForm from '../components/ProductForm/reducer'
import usersAdmin from '../components/UsersAdmin/reducer'
import overview from '../components/Overview/reducer'
import customProductDetail from '../screens/CustomProductDetail/reducer'
import designApproval from '../screens/DesignApproval/reducer'
import fitAndSizing from '../screens/FitAndSizing/reducer'
import designSearchAdmin from '../components/DesignSearch/reducer'
import admin from '../screens/Admin/reducer'
import adminLayout from '../components/AdminLayout/reducer'
import productInternalsAdmin from '../components/ProductInternalsAdmin/reducer'
import teamStoresAdmin from '../components/TeamStoresAdmin/reducer'
import productModels from '../screens/ProductModels/reducer'
import proDesign from '../screens/ProDesign/reducer'
import publishingTool from '../screens/PublishingTool/reducer'
import designTools from '../screens/DesignTools/reducer'
import proAssist from '../components/ProAssist/reducer'
import userFiles from '../components/UsersAdmin/UserFiles/reducer'
import roleCatalog from '../components/RoleList/reducer'
import salesRep from '../components/SalesRep/reducer'
import resellers from '../components/Resellers/reducer'
import resellerOptions from '../components/ResellerOptions/reducer'
import resellerOrders from '../components/ResellerOrders/reducer'
import resellerAbout from '../components/ResellerAbout/reducer'
import resellerPayouts from '../components/ResellerPayouts/reducer'
import affiliates from '../components/Affiliates/reducer'
import affiliatesAbout from '../components/AffiliateAbout/reducer'
import affiliatesOrders from '../components/AffiliatesOrders/reducer'
import affiliatesPayouts from '../components/AffiliatesPayouts/reducer'
import intakeForm from '../screens/IntakeForm/reducer'
import intakeProductCatalog from '../components/ProductCatalogue/reducer'
import proDesignProjects from '../components/ProDesignProjects/reducer'
import notifications from '../components/Notifications/reducer'
import notificationSettings from '../components/Notifications/Preferences/reducer'

import { Reducer } from '../types/common'
import {
  SET_USER_ACTION,
  SET_USER_AGENT_ACTION,
  SET_COUNTRY_CODE,
  SET_PRO_DESIGN
} from './constants'

export interface ReducersObject {
  customProductDetail: any
  warrantyProgram: any
  orderPlaced: any
  myTeamStores: any
  checkout: any
  designerTool: any
  shoppingCartPage: any
  resellerAbout: any
  storeFront: any
  designApproval: any
  createStore: any
  designSearchAdmin: any
  roleCatalog: any
  affiliatesAbout: any
  salesRep: any
  resellerOptions: any
  proDesignProjects: any
  affiliates: any
  affiliatesOrders: any
  affiliatesPayouts: any
  searchTeamstores: any
  teamstoreProductPage: any
  account: any
  payModal: any
  fitWidget: any
  resellers: any
  designs: any
  resellerOrders: any
  productDetail: any
  productForm: any
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
  resellerPayouts: any
  productModels: any
  menu: any
  forgot: any
  quickView: any
  fitInfo: any
  responsiveReducer: any
  addresses: any
  cards: any
  profileSettings: any
  affiliateOptions: any
  myLocker: any
  myFiles: any
  orderHistory: any
  designLabLanding: any
  orderHistoryAdmin: any
  usersAdmin: any
  discountsAdmin: any
  homepageAdmin: any
  designLabAdmin: any
  overview: any
  fitAndSizing: any
  admin: any
  adminLayout: any
  productInternalsAdmin: any
  teamStoresAdmin: any
  proDesign: any
  publishingTool: any
  designTools: any
  proAssist: any
  userFiles: any
  intakeForm: any
  intakeProductCatalog: any
  notifications: any
  notificationSettings: any
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
    case SET_PRO_DESIGN:
      return state.set('proDesign', action.proDesign)
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
  customProductDetail,
  warrantyProgram,
  orderPlaced,
  myTeamStores,
  affiliatesAbout,
  resellerOptions,
  checkout,
  designLabLanding,
  proDesignProjects,
  designerTool,
  designApproval,
  resellerPayouts,
  shoppingCartPage,
  resellerOrders,
  payModal,
  storeFront,
  resellers,
  resellerAbout,
  productModels,
  createStore,
  affiliates,
  affiliatesOrders,
  affiliatesPayouts,
  searchTeamstores,
  teamstoreProductPage,
  account,
  fitWidget,
  designs,
  designSearchAdmin,
  productForm,
  productDetail,
  productCatalog,
  productCatalogAdmin,
  designCenter,
  productDetailAdmin,
  languageProvider,
  menu,
  forgot,
  salesRep,
  home,
  roleCatalog,
  reset,
  menuGender,
  menuSports,
  layout,
  fitInfo,
  addresses,
  cards,
  affiliateOptions,
  profileSettings,
  myLocker,
  myFiles,
  orderHistory,
  orderHistoryAdmin,
  discountsAdmin,
  homepageAdmin,
  designLabAdmin,
  overview,
  fitAndSizing,
  responsive: responsiveReducer,
  app: appReducer,
  admin,
  adminLayout,
  usersAdmin,
  productInternalsAdmin,
  teamStoresAdmin,
  proDesign,
  publishingTool,
  designTools,
  proAssist,
  userFiles,
  intakeForm,
  intakeProductCatalog,
  notifications,
  notificationSettings
})

export default rootReducer
