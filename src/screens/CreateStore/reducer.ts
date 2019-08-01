/**
 * CreateStore Reducer - Created by david on 09/04/18.
 */
import { fromJS } from 'immutable'
import moment from 'moment'
import {
  DEFAULT_ACTION,
  SET_TEAM_SIZE_ACTION,
  UPDATE_NAME_ACTION,
  UPDATE_START_DATE_ACTION,
  UPDATE_END_DATE_ACTION,
  UPDATE_PRIVATE_ACTION,
  UPDATE_ON_DEMAND_ACTION,
  UPDATE_PASS_CODE_ACTION,
  SET_OPEN_LOCKER_ACTION,
  SET_ITEM_SELECTED_ACTION,
  DELETE_ITEM_SELECTED_ACTION,
  SET_ITEMS_ADD_ACTION,
  SET_ITEM_VISIBLE_ACTION,
  SET_LOADING_ACTION,
  CREATE_STORE_SUCCESS,
  MOVE_ROW,
  SET_STORE_DATA_TO_EDIT,
  DELETE_BANNER_ON_EDIT,
  CLEAR_DATA,
  SET_TEAM_STORE_STATUS
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  teamSizeId: 1,
  teamSizeRange: '2-5',
  name: '',
  startDate: '',
  startDateMoment: null,
  endDate: '',
  endDateMoment: null,
  privateStore: true,
  onDemand: true,
  passCode: '',
  openLocker: false,
  selectedItems: {},
  items: [],
  loading: true,
  banner: '',
  showTeamStores: null
})

const createStoreReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    case SET_LOADING_ACTION:
      return state.set('loading', action.isLoading)
    case CREATE_STORE_SUCCESS:
      return initialState
    case UPDATE_NAME_ACTION:
      return state.set('name', action.name)
    case UPDATE_START_DATE_ACTION:
      return state.merge({
        startDate: action.date,
        startDateMoment: action.dateMoment,
        endDate: '',
        endDateMoment: null
      })
    case UPDATE_END_DATE_ACTION:
      return state.merge({
        endDate: action.date,
        endDateMoment: action.dateMoment
      })
    case UPDATE_PRIVATE_ACTION:
      return state.set('privateStore', action.active)
    case UPDATE_ON_DEMAND_ACTION:
      return state.merge({
        onDemand: action.active,
        teamSizeId: 1,
        teamSizeRange: '2-5'
      })
    case SET_TEAM_SIZE_ACTION:
      return state.merge({
        teamSizeId: action.id,
        teamSizeRange: action.range
      })
    case UPDATE_PASS_CODE_ACTION:
      return state.set('passCode', action.code)
    case SET_OPEN_LOCKER_ACTION:
      return state.set('openLocker', action.isOpen)
    case SET_ITEM_SELECTED_ACTION:
      return state.setIn(['selectedItems', action.id], action.checked)
    case DELETE_ITEM_SELECTED_ACTION: {
      const { index } = action
      const selectedItems = state.get('items')
      const updatedSelectedItems = selectedItems.delete(index)
      return state.set('items', updatedSelectedItems)
    }
    case SET_ITEMS_ADD_ACTION: {
      const items = state.get('items')
      const addItem = items.push(...action.items)
      const itemsMap = addItem.map((item: any) => fromJS(item))
      return state.merge({
        items: itemsMap,
        openLocker: false,
        selectedItems: {}
      })
    }
    case SET_ITEM_VISIBLE_ACTION: {
      const { index, visible } = action
      const items = state.get('items')
      const updatedItems = items.setIn([index, 'visible'], visible)
      return state.merge({ items: updatedItems })
    }
    case MOVE_ROW: {
      const { index, hoverIndex, row } = action
      const items = state.get('items')
      const updatedItems = items.splice(index, 1).insert(hoverIndex, row)
      return state.set('items', updatedItems)
    }
    case SET_STORE_DATA_TO_EDIT: {
      const {
        data: {
          id,
          shortId,
          name,
          banner,
          startDate,
          endDate,
          privateStore,
          onDemand,
          items,
          teamSize: { id: sizeId, size }
        }
      } = action
      return state.merge({
        storeId: id,
        storeShortId: shortId,
        name: name,
        startDate: startDate,
        startDateMoment: startDate ? moment(startDate) : null,
        endDate: endDate,
        endDateMoment: endDate ? moment(endDate) : null,
        teamSizeId: sizeId,
        teamSizeRange: size,
        loading: false,
        items: items,
        privateStore: privateStore,
        onDemand: onDemand,
        banner: banner
      })
    }
    case DELETE_BANNER_ON_EDIT:
      return state.merge({ banner: '' })
    case CLEAR_DATA:
      return state.merge({
        teamSizeId: 1,
        teamSizeRange: '2-5',
        name: '',
        startDate: '',
        startDateMoment: null,
        endDate: '',
        endDateMoment: null,
        privateStore: true,
        onDemand: true,
        passCode: '',
        openLocker: false,
        selectedItems: {},
        items: [],
        loading: true,
        banner: ''
      })
    case SET_TEAM_STORE_STATUS:
      return state.set('showTeamStores', action.show)
    default:
      return state
  }
}

export default createStoreReducer
