import { fromJS } from 'immutable'
import {
  SHOW_HEADER_SEARCH_RESULTS,
  SET_SEARCH_PARAM,
  OPEN_QUICKVIEW_ACTION,
  OPEN_LOGIN_MODAL,
  SAVE_USER_TO_LOCAL,
  LOGOUT,
  GET_TOTAL_CART_ITEMS
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  searchParam: '',
  showSearchResults: false,
  productId: 0,
  yotpoId: '',
  hideQuickViewSliderButtons: false,
  openLogin: false,
  itemsInCart: 0
})

const MainLayoutReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_PARAM:
      return state.merge({ searchParam: action.param, showSearchResults: true })
    case SHOW_HEADER_SEARCH_RESULTS:
      return state.set('showSearchResults', action.show)
    case OPEN_QUICKVIEW_ACTION:
      return state.merge({
        productId: action.id,
        yotpoId: action.yotpoId,
        hideQuickViewSliderButtons: action.hideSliderButtons
      })
    case OPEN_LOGIN_MODAL:
      return state.set('openLogin', action.open)
    case SAVE_USER_TO_LOCAL: {
      return state.set('user', action.user)
    }
    case LOGOUT: {
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user')
      }
      return state.set('user', {})
    }
    case GET_TOTAL_CART_ITEMS: {
      if (localStorage.getItem('cart')) {
        const cart = JSON.parse(localStorage.getItem('cart') as string)
        const cartList = cart || []
        let totalItems = 0
        for (const cartItem of cartList) {
          for (const itemDetails of cartItem.itemDetails) {
            totalItems = totalItems + itemDetails.quantity
          }
        }
        return state.set('itemsInCart', totalItems)
      }
      return state.set('itemsInCart', 0)
    }
    default:
      return state
  }
}

export default MainLayoutReducer
