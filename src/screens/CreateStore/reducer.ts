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
  SET_PAGINATION_DATA,
  OPEN_MODAL,
  ON_UNSELECT_ITEM,
  CHANGE_BULLETIN, SET_ITEM_PRICE
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  teamSizeId: 1,
  teamSizeRange: '2-5',
  name: '',
  startDate: '',
  startDateMoment: null,
  initialStartDate: null,
  endDate: '',
  endDateMoment: null,
  privateStore: false,
  onDemand: true,
  passCode: '',
  openLocker: false,
  selectedItems: {},
  items: [],
  loading: true,
  open: false,
  banner: '',
  bulletin: '',
  showTeamStores: null,
  limit: 12,
  offset: 0,
  currentPage: 1,
  datesEdited: false,
  datesEditedTemporal: false
})

const createStoreReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    case CHANGE_BULLETIN:
      return state.set('bulletin', action.value)
    case OPEN_MODAL:
      return state.set('open', action.open)
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
        endDateMoment: null,
        datesEditedTemporal: action.datesEdited
      })
    case UPDATE_END_DATE_ACTION:
      return state.merge({
        endDate: action.date,
        endDateMoment: action.dateMoment,
        datesEditedTemporal: action.datesEdited
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
      return state.merge({ openLocker: action.isOpen, selectedItems: {} })
    case SET_ITEM_SELECTED_ACTION: {
      const {
        design: { id }
      } = action.item
      return state.setIn(['selectedItems', id], action.item)
    }
    case ON_UNSELECT_ITEM: {
      return state.removeIn(['selectedItems', action.keyName])
    }
    case DELETE_ITEM_SELECTED_ACTION: {
      const { index } = action
      const selectedItems = state.get('items')
      const updatedSelectedItems = selectedItems.delete(index)
      return state.set('items', updatedSelectedItems)
    }
    case SET_ITEMS_ADD_ACTION: {
      const items = state.get('items').toJS()
      const selectedItems = state.get('selectedItems')
      const itemsMap = selectedItems.valueSeq((item: any) => item)
      return state.merge({
        items: [...items, ...itemsMap],
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
    case SET_ITEM_PRICE: {
      const { value, currency, itemIndex, abbreviation } = action
      const items = state.get('items')
      const currencyIndex = currency < 0 ? 0 : Number(currency)
      const updatedItems = items
        .setIn([itemIndex, 'resellerRange', currencyIndex, 'price'], value)
        .setIn([itemIndex, 'resellerRange', currencyIndex, 'abbreviation'], abbreviation)
      return state.merge({ items: updatedItems })
    }
    case MOVE_ROW: {
      const { index, hoverIndex } = action
      const items = state.get('items')
      const oldItem = state.getIn(['items', index])
      const updatedItems = items.delete(index).insert(hoverIndex, oldItem)
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
          bulletin,
          passCode,
          items,
          teamSize: { id: sizeId, size },
          datesEdited
        }
      } = action
      const startDateMoment = startDate ? moment(startDate) : null
      return state.merge({
        storeId: id,
        storeShortId: shortId,
        name: name,
        passCode,
        bulletin,
        startDate: startDate,
        startDateMoment,
        initialStartDate: startDateMoment,
        endDate: endDate,
        endDateMoment: endDate ? moment(endDate) : null,
        teamSizeId: sizeId,
        teamSizeRange: size,
        loading: false,
        items: items,
        privateStore: privateStore,
        onDemand: onDemand,
        banner: banner,
        datesEdited,
        datesEditedTemporal: datesEdited
      })
    }
    case DELETE_BANNER_ON_EDIT:
      return state.merge({ banner: '' })
    case CLEAR_DATA:
      return initialState
    case SET_PAGINATION_DATA: {
      return state.merge({
        offset: action.offset,
        currentPage: action.page,
        loading: false
      })
    }
    default:
      return state
  }
}

export default createStoreReducer
