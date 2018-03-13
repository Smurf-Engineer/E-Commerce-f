/**
 * DesignCenter  Actions - Created by david on 23/02/18.
 */
import {
  DEFAULT_ACTION,
  SET_CURRENT_TAB_ACTION,
  SET_COLOR_BLOCK_ACTION,
  SET_COLOR_ACTION,
  SET_PALETTE_ACTION,
  SET_PALETTE_NAME_ACTION,
  SET_PALETTES_ACTION,
  SET_LOADING_MODEL,
  DESIGN_UNDO_ACTION,
  DESIGN_REDO_ACTION,
  DESIGN_RESET_ACTION,
  DESIGN_CLEAR_ACTION,
  SET_SWIPING_TAB_ACTION
} from './constants'
import { AnyAction, Palette } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setCurrentTabAction = (index: number): AnyAction => ({
  type: SET_CURRENT_TAB_ACTION,
  index
})

export const setColorBlockAction = (index: number): AnyAction => ({
  type: SET_COLOR_BLOCK_ACTION,
  index
})

export const setColorAction = (color: string): AnyAction => ({
  type: SET_COLOR_ACTION,
  color
})

export const setPaletteAction = (colors: string[]): AnyAction => ({
  type: SET_PALETTE_ACTION,
  colors
})

export const setPaletteNameAction = (name: string): AnyAction => ({
  type: SET_PALETTE_NAME_ACTION,
  name
})

export const setPalettesAction = (palettes: Palette[]): AnyAction => ({
  type: SET_PALETTES_ACTION,
  palettes
})

export const setLoadingModel = (loading: boolean): AnyAction => ({
  type: SET_LOADING_MODEL,
  loading
})

export const designUndoAction = (): AnyAction => ({
  type: DESIGN_UNDO_ACTION
})

export const designRedoAction = (): AnyAction => ({
  type: DESIGN_REDO_ACTION
})

export const designResetAction = (): AnyAction => ({
  type: DESIGN_RESET_ACTION
})

export const designClearAction = (): AnyAction => ({
  type: DESIGN_CLEAR_ACTION
})

export const setSwipingTabAction = (isSwiping: boolean): AnyAction => ({
  type: SET_SWIPING_TAB_ACTION,
  isSwiping
})
