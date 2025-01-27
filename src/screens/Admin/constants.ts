/**
 * Admin Types - Created by eduardoquintero on 28/03/19.
 */
const namespace = 'src/Admin'

export const NOTIFICATIONS = 'notifications'
export const ORDER_STATUS = 'orderStatus'
export const DISCOUNTS = 'discounts'
export const PRO_ASSIST = 'proAssist'
export const PRODUCT_CATALOG = 'productCatalog'
export const DESIGN_SEARCH = 'designSearch'
export const HOMEPAGE = 'homepage'
export const DESIGN_LAB = 'designLab'
export const USERS = 'users'
export const DESIGN_TOOLS = 'designTools'
export const AFFILIATES_PAYOUTS = 'affiliatesPayouts'
export const AFFILIATES = 'affiliates'
export const RESELLER_ORDERS = 'resellerOrders'
export const RESELLER_PAYOUTS = 'resellerPayouts'
export const EDIT_NAVIGATION = 'editNavigation'
export const PRO_DESIGN = 'proDesign'
export const PUBLISHING_TOOL = 'publishingTool'
export const SET_DEFAULT_SCREEN = `${namespace}/SET_DEFAULT_SCREEN`
export const CLEAR_REDUCER = `${namespace}/CLEAR_REDUCER`
export const SET_LOADING = `${namespace}/SET_LOADING`
export const OPEN_FORGOT_PASSWORD = `${namespace}/OPEN_FORGOT_PASSWORD`

export const keys = {
  ['/admin/']: NOTIFICATIONS,
  ['/admin/orders']: ORDER_STATUS,
  ['/admin/discounts']: DISCOUNTS,
  ['/admin/proAssist']: PRO_ASSIST,
  ['/admin/design-search']: PRODUCT_CATALOG,
  ['/admin/products']: DESIGN_SEARCH,
  ['/admin/users']: USERS,
  ['/admin/reseller-payouts']: RESELLER_PAYOUTS,
  ['/admin/reseller-orders']: RESELLER_ORDERS,
  ['/admin/affiliates-payouts']: AFFILIATES_PAYOUTS,
  ['/admin/affiliates']: AFFILIATES,
  ['/admin/edit-navigation']: EDIT_NAVIGATION,
  ['/admin/design-lab']: DESIGN_LAB,
  ['/admin/add-pro-design']: PRO_DESIGN,
  ['/admin/publishing-tool']: PUBLISHING_TOOL,
  ['/admin/design-tools']: DESIGN_TOOLS
}
