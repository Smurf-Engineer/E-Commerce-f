/**
 * MyFiles Actions - Created by miguelcanobbio on 06/25/18.
 */
import {
  SHOW_DELETE_PALETTE_CONFIRM,
  HIDE_DELETE_PALETTE_CONFIRM,
  SHOW_DELETE_IMAGE_CONFIRM,
  HIDE_DELETE_IMAGE_CONFIRM,
  SET_DELETE_LOADING,
  RESET_REDUCER_DATA,
  SET_PALETTES_ACTION,
  SET_UPLOADING,
  UPLOAD_SUCCESS
} from './constants'
import { AnyAction, Palette } from '../../types/common'

export const setPalettesAction = (palettes: Palette[]): AnyAction => ({
  type: SET_PALETTES_ACTION,
  palettes
})

export const showDeletePaletteConfirmAction = (index: number): AnyAction => ({
  type: SHOW_DELETE_PALETTE_CONFIRM,
  index
})

export const hideDeletePaletteConfirmAction = (): AnyAction => ({
  type: HIDE_DELETE_PALETTE_CONFIRM
})

export const showDeleteImageConfirmAction = (id: string): AnyAction => ({
  type: SHOW_DELETE_IMAGE_CONFIRM,
  id
})

export const hideDeleteImageConfirmAction = (): AnyAction => ({
  type: HIDE_DELETE_IMAGE_CONFIRM
})

export const setDeleteLoadingAction = (loading: boolean): AnyAction => ({
  type: SET_DELETE_LOADING,
  loading
})

export const resetReducerDataAction = (): AnyAction => ({
  type: RESET_REDUCER_DATA
})

export const setUploadingAction = (loading: boolean): AnyAction => ({
  type: SET_UPLOADING,
  loading
})

export const uploadFileSuccessAction = (url: string): AnyAction => ({
  type: UPLOAD_SUCCESS,
  url
})