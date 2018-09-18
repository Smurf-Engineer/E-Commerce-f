import { fromJS } from 'immutable'
import {
  OPEN_DELETE_MODAL,
  OPEN_SHARE_MODAL,
  SET_STOREID_TO_DELETE
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  openDeleteModal: false,
  storeId: '',
  openShare: false
})

const myTeamStoresReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DELETE_MODAL:
      return state.merge({
        openDeleteModal: action.open,
        deleteStoreId: action.storeId
      })
    case OPEN_SHARE_MODAL:
      return state.merge({
        openShare: action.open,
        storeId: action.storeId
      })
    case SET_STOREID_TO_DELETE:
      return state.set('storeId', action.storeId)
    default:
      return state
  }
}

export default myTeamStoresReducer