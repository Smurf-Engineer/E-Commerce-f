import { fromJS } from 'immutable'
import { SET_OPEN_KEYS, SET_INSTALLED_FONTS_ACTION } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  searchParam: '',
  showSearchResults: false,
  productId: 0,
  yotpoId: '',
  productGender: 0,
  hideQuickViewSliderButtons: false,
  openLogin: false,
  itemsInCart: 0,
  openLogoutModal: false,
  currentRegion: 'us',
  currentLanguage: 'en',
  callback: false,
  saveAndBuy: false,
  showTeamStores: false,
  fonts: {},
  openKeys: ['aboutOrders']
})

const MainLayoutReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPEN_KEYS:
      return state.set('openKeys', action.keys)
    case SET_INSTALLED_FONTS_ACTION:
      return state.set('fonts', fromJS(action.fonts))
    default:
      return state
  }
}

export default MainLayoutReducer
