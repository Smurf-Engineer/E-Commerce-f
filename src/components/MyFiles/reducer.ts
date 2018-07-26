/**
 * MyFiles Reducer - Created by miguel canobbio on 06/25/18.
 */
import { fromJS } from 'immutable'
import {
  SET_PALETTES_ACTION,
  SHOW_DELETE_PALETTE_CONFIRM,
  HIDE_DELETE_PALETTE_CONFIRM,
  SHOW_DELETE_IMAGE_CONFIRM,
  HIDE_DELETE_IMAGE_CONFIRM,
  SET_DELETE_LOADING,
  RESET_REDUCER_DATA
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  palettes: [],
  indexImageToDelete: -1,
  indexPaletteToDelete: -1,
  showDeletePaletteConfirm: false,
  showDeleteImageConfirm: false,
  deleteLoading: false
})

const myFilesReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_PALETTES_ACTION:
      return state.set('palettes', action.palettes)
    case SHOW_DELETE_PALETTE_CONFIRM:
      return state.merge({
        showDeletePaletteConfirm: true,
        indexPaletteToDelete: action.index
      })
    case HIDE_DELETE_PALETTE_CONFIRM:
      return state.merge({
        showDeletePaletteConfirm: false,
        indexPaletteToDelete: -1
      })
    case SHOW_DELETE_IMAGE_CONFIRM:
      return state.merge({
        showDeleteImageConfirm: true,
        indexImageToDelete: action.index
      })
    case HIDE_DELETE_IMAGE_CONFIRM:
      return state.merge({
        showDeleteImageConfirm: false,
        indexImageToDelete: -1
      })
    case SET_DELETE_LOADING:
      return state.set('deleteLoading', action.loading)
    case RESET_REDUCER_DATA:
      return initialState
    default:
      return state
  }
}

export default myFilesReducer
