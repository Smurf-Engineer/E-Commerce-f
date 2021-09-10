/**
 * Account Reducer - Created by david on 05/04/18.
 */
import { fromJS } from 'immutable'
import {
  SET_OPEN_KEYS,
  SET_CURRENT_SCREEN,
  SET_DEFAULT_SCREEN,
  CLEAR_REDUCER,
  SET_IS_MOBILE,
  SET_CURRENT_SHARE,
  OPEN_SIDEBAR_MOBILE,
  OPEN_ADD_TOTEAMSTORE,
  SET_ITEM_TOADD,
  PRO_DESIGN_PROJECTS,
  PRO_DESIGN,
  PROFILE_SETTINGS,
  ADDRESSES,
  CREDIT_CARDS,
  PROFILE_MENU,
  RESELLER,
  RESELLER_ABOUT,
  MY_STORES,
  RESELLER_ORDERS,
  RESELLER_PAYOUTS
} from './constants'
import { Reducer } from '../../types/common'

const profileSubMenus = [
  PROFILE_SETTINGS,
  ADDRESSES,
  CREDIT_CARDS
]

const directStoreSubMenus = [
  RESELLER_ABOUT,
  MY_STORES,
  RESELLER_ORDERS,
  RESELLER_PAYOUTS
]

const proDesignSubMenus = [
  PRO_DESIGN_PROJECTS
]

export const initialState = fromJS({
  openKeys: [''],
  screen: '',
  defaultScreen: '',
  isMobile: false,
  openShareModal: false,
  openAddToStoreModal: false,
  teamStoreId: '',
  savedDesignId: '',
  itemToAdd: {},
  openSidebar: false
})

const accountReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPEN_KEYS:
      return state.set('openKeys', action.keys)
    case OPEN_ADD_TOTEAMSTORE:
      return state.merge({
        openAddToStoreModal: action.open,
        savedDesignId: action.id,
        itemToAdd: {},
        teamStoreId: ''
      })
    case SET_ITEM_TOADD:
      return state.merge({
        teamStoreId: action.teamStoreId,
        itemToAdd: action.teamStoreItem
      })
    case SET_DEFAULT_SCREEN: {
      const { screen, openCreations } = action
      if (screen === PRO_DESIGN_PROJECTS) {
        return state.merge({
          screen,
          defaultScreen: screen,
          openKeys: ['', PRO_DESIGN]
        })
      }
      if (openCreations) {
        return state.merge({
          screen,
          defaultScreen: screen,
          openKeys: ['', 'myCreations']
        })
      }
      const openKeys = []
      if (profileSubMenus.includes(screen)) {
        openKeys.push(PROFILE_MENU)
      } else if (directStoreSubMenus.includes(screen)) {
        openKeys.push(RESELLER)
      } else if (proDesignSubMenus.includes(screen)) {
        openKeys.push(PRO_DESIGN)
      }
      return state.merge({
        screen: action.screen,
        defaultScreen: action.screen,
        openKeys
      })
    }
    case SET_CURRENT_SCREEN:
      return state.set('screen', action.screen)
    case SET_CURRENT_SHARE:
      return state.merge({
        savedDesignId: action.savedDesignId,
        openShareModal: action.openShareModal
      })
    case SET_IS_MOBILE:
      return state.set('isMobile', action.isMobile)
    case OPEN_SIDEBAR_MOBILE:
      return state.set('openSidebar', action.open)
    case CLEAR_REDUCER:
      return state.merge({
        screen: '',
        openKeys: ['']
      })
    default:
      return state
  }
}

export default accountReducer
