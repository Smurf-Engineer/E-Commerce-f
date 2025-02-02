const namespace = 'src/MainLayout'

// LOGIN MODAL
export const LOGOUT = `${namespace}/LOGOUT`
export const SAVE_USER_TO_LOCAL = `${namespace}/SAVE_USER_TO_LOCAL`
export const SET_OPEN_KEYS = `${namespace}/SET_OPEN_KEYS`
export const SET_CURRENT_SCREEN = `${namespace}/SET_CURRENT_SCREEN`

export const SET_INSTALLED_FONTS_ACTION = `${namespace}/SET_INSTALLED_FONTS_ACTION`

export const ADMIN_ROUTE = '/admin'

export const NOTIFICATIONS = 'notifications'
export const ORDERS = 'aboutOrders'
export const ORDER_STATUS = 'orderStatus'
export const DISCOUNTS = 'discounts'
export const PRO_ASSIST = 'proAssist'
export const PRODUCTS = 'products'
export const PRODUCT_INTERNAL = 'productInternal'
export const PRODUCT_CATALOG = 'productCatalog'
export const DESIGN_SEARCH = 'designSearch'
export const DESIGN_SEARCH_ASSETS = 'designSearchDownload'
export const EDIT_CONTENT = 'editContent'
export const HOMEPAGE = 'homepage'
export const DESIGN_LAB = 'designLab'
export const USERS = 'users'
export const PAYDAY = 'payday'
export const USER_LIST = 'usersList'
export const SET_ADMIN = 'setAdmin'
export const ROLE_MANAGEMENT = 'roleManagement'
export const SALES_REP = 'salesRep'
export const AFFILIATES_PAYOUTS = 'affiliatesPayouts'
export const AFFILIATES = 'affiliates'
export const RESELLER_ORDERS = 'resellerOrders'
export const RESELLER_PAYOUTS = 'resellerPayouts'
export const RESELLER = 'reseller'
export const MAKE_PAYOUTS = 'makePayouts'
export const IGNORE_STATUS_PAYOUTS = 'ignoreStatusPayouts'
export const TEAM_STORES = 'teamStores'
export const LOGOUT_MENU = 'logout'
export const EDIT_NAVIGATION = 'editNavigation'
export const PRO_DESIGN = 'proDesign'
export const ADD_PRO_DESIGN = 'addProDesign'
export const PUBLISHING_TOOL = 'publishingTool'
export const CREATE_DESIGNS = 'createDesigns'
export const DESIGN_LAB_TOOLS = 'designLabTools'

export const BADGE = 'badge'

export const options = [
  {
    title: NOTIFICATIONS,
    options: []
  },
  {
    title: ORDERS,
    options: [ORDER_STATUS, DISCOUNTS, DESIGN_SEARCH, PRO_ASSIST]
  },
  {
    title: EDIT_CONTENT,
    options: [EDIT_NAVIGATION, DESIGN_LAB]
  },
  {
    title: PRODUCTS,
    options: [PRODUCT_CATALOG, PRODUCT_INTERNAL]
  },
  {
    title: USERS,
    options: [USER_LIST, ROLE_MANAGEMENT, SALES_REP]
  },
  {
    title: RESELLER,
    options: [RESELLER_ORDERS, RESELLER_PAYOUTS]
  },
  {
    title: PAYDAY,
    options: [AFFILIATES_PAYOUTS, AFFILIATES]
  },
  {
    title: TEAM_STORES,
    options: []
  },
  {
    title: PRO_DESIGN,
    options: [ADD_PRO_DESIGN]
  },
  {
    title: PUBLISHING_TOOL,
    options: [CREATE_DESIGNS, DESIGN_LAB_TOOLS]
  }
]
