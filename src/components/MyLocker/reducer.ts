/**
 * MyLocker Reducer - Created by miguelcanobbio on 21/06/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_LOADING,
  SET_ERROR,
  SET_PAGINATION_DATA,
  SET_DELETE_MODAL_DATA,
  SET_MODAL_LOADING,
  RESET_MODAL_DATA,
  SET_RENAME_MODAL_DATA,
  RESET_RENAME_MODAL_DATA,
  ON_CHANGE_DESIGN_NAME,
  SET_RENAME_MODAL_LOADING,
  SET_SEARCH_TEXT,
  SET_FILTERS,
  RESET_FILTERS
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  loading: false,
  error: false,
  limit: 12,
  offset: 0,
  currentPage: 1,
  deleteModal: {
    openDeleteModal: false,
    currentDesignId: '',
    currentDesignName: '',
    modalLoading: false
  },
  renameModal: {
    openRenameModal: false,
    currentDesignId: '',
    currentDesignName: '',
    modalLoading: false,
    newName: ''
  },
  userName: '',
  searchText: '',
  filter: '',
  filterProDesign: false,
  startDate: null,
  endDate: null
})

const productCatalogReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_LOADING:
      return state.set('loading', action.loading)
    case SET_ERROR:
      return state.merge({ error: action.error, loading: false })
    case SET_PAGINATION_DATA: {
      return state.merge({
        offset: action.offset,
        currentPage: action.page
      })
    }
    case SET_DELETE_MODAL_DATA:
      return state.set('deleteModal', action.payload)
    case SET_MODAL_LOADING: {
      const deleteModalData = state.get('deleteModal')
      const deleteModal = {
        ...deleteModalData,
        modalLoading: action.loading
      }
      return state.set('deleteModal', deleteModal)
    }
    case RESET_MODAL_DATA: {
      const deleteModal = {
        openDeleteModal: false,
        currentDesignId: '',
        currentDesignName: '',
        modalLoading: false
      }
      return state.set('deleteModal', deleteModal)
    }
    case SET_RENAME_MODAL_DATA:
      return state.set('renameModal', fromJS(action.payload))
    case RESET_RENAME_MODAL_DATA:
      const renameModal = {
        openRenameModal: false,
        currentDesignId: '',
        currentDesignName: '',
        modalLoading: false,
        newName: ''
      }
      return state.set('renameModal', fromJS(renameModal))
    case ON_CHANGE_DESIGN_NAME:
      return state.setIn(['renameModal', 'newName'], action.name)
    case SET_RENAME_MODAL_LOADING:
      return state.setIn(['renameModal', 'modalLoading'], action.loading)
    case SET_SEARCH_TEXT:
      return state.merge({ searchText: action.searchText, currentPage: 1 })
    case SET_FILTERS: {
      const { filter, filterProDesign, startDate, endDate } = action
      return state.merge({
        filter,
        filterProDesign,
        startDate,
        endDate,
        currentPage: 1
      })
    }
    case RESET_FILTERS: {
      return state.merge({
        searchText: '',
        filter: '',
        filterProDesign: false,
        startDate: null,
        endDate: null,
        currentPage: 1
      })
    }
    default:
      return state
  }
}

export default productCatalogReducer
