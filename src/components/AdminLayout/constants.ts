const namespace = 'src/MainLayout'

// LOGIN MODAL
export const LOGOUT = `${namespace}/LOGOUT`
export const SAVE_USER_TO_LOCAL = `${namespace}/SAVE_USER_TO_LOCAL`
export const SET_OPEN_KEYS = `${namespace}/SET_OPEN_KEYS`
export const SET_CURRENT_SCREEN = `${namespace}/SET_CURRENT_SCREEN`

export const SET_INSTALLED_FONTS_ACTION = `${namespace}/SET_INSTALLED_FONTS_ACTION`

export const ORDERS = 'aboutOrders'
export const ORDER_STATUS = 'orderStatus'
export const PRODUCT_CATALOG = 'productCatalog'
export const EDIT_CONTENT = 'editContent'
export const HOMEPAGE = 'homepage'
export const LOGOUT_MENU = 'logout'

export const options = [
  {
    title: ORDERS,
    options: [ORDER_STATUS]
  },
  {
    title: PRODUCT_CATALOG,
    options: []
  },
  {
    title: EDIT_CONTENT,
    options: [HOMEPAGE]
  }
]
