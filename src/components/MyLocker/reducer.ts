/**
 * MyLocker Reducer - Created by miguelcanobbio on 21/06/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_LOADING,
  SET_ERROR,
  SET_DESIGNS_DATA,
  SET_DELETE_MODAL_DATA,
  SET_MODAL_LOADING,
  RESET_MODAL_DATA,
  SET_RENAME_MODAL_DATA,
  RESET_RENAME_MODAL_DATA,
  ON_CHANGE_DESIGN_NAME,
  SET_RENAME_MODAL_LOADING
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  loading: true,
  error: false,
  fullCount: '',
  designs: [],
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
  }
})

const productCatalogReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_LOADING:
      return state.set('loading', action.loading)
    case SET_ERROR:
      return state.merge({ error: action.error, loading: false })
    case SET_DESIGNS_DATA: {
      const {
        data: {
          designs: { designs, fullCount }
        }
      } = action.data
      return state.merge({
        designs,
        fullCount,
        offset: action.offset,
        currentPage: action.page,
        loading: false
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
    default:
      return state
  }
}

export default productCatalogReducer
