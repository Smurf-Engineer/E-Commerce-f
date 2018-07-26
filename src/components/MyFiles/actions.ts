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
  SET_PALETTES_ACTION
} from './constants'
import { AnyAction, Palette } from '../../types/common'

export const setPalettesAction = (palettes: Palette[]): AnyAction => ({
  type: SET_PALETTES_ACTION,
  palettes
})

export const showDeletePaletteConfirmAction = (index: string): AnyAction => ({
  type: SHOW_DELETE_PALETTE_CONFIRM,
  index
})

export const hideDeletePaletteConfirmAction = (): AnyAction => ({
  type: HIDE_DELETE_PALETTE_CONFIRM
})

export const showDeleteImageConfirmAction = (index: string): AnyAction => ({
  type: SHOW_DELETE_IMAGE_CONFIRM,
  index
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
