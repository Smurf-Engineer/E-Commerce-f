/**
 * DesignCenter  Actions - Created by david on 23/02/18.
 */
import {
  DEFAULT_ACTION,
  CLEAR_STORE_ACTION,
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
  SET_SWIPING_TAB_ACTION,
  SET_THEME_SELECTED_ACTION,
  SET_STYLE_SELECTED_ACTION,
  OPEN_SHARE_MODAL,
  OPEN_SAVEDESIGN,
  SET_DESIGN_NAME,
  SAVE_DESIGN_ID,
  COLOR_BLOCK_HOVERED_ACTION,
  SET_CHECKED_TERMS,
  CLEAR_DESIGN_INFO,
  SAVE_DESIGN_LOADING,
  SET_TEXT_ACTION,
  SET_STYLE_COMPLEXITY_ACTION,
  SET_STYLE_COMPLEXITY_ACTION,
  OPEN_ADD_TOTEAMSTORE,
  SET_ITEM_TOADD
} from './constants'
import { AnyAction, Palette, TeamStoreItemtype } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const clearStoreAction = (): AnyAction => ({
  type: CLEAR_STORE_ACTION
})

export const setCurrentTabAction = (index: number): AnyAction => ({
  type: SET_CURRENT_TAB_ACTION,
  index
})

export const setColorBlockAction = (index: number): AnyAction => ({
  type: SET_COLOR_BLOCK_ACTION,
  index
})

export const setHoverColorBlockAction = (index: number): AnyAction => ({
  type: COLOR_BLOCK_HOVERED_ACTION,
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

export const setThemeAction = (id: number): AnyAction => ({
  type: SET_THEME_SELECTED_ACTION,
  id
})

export const openSaveDesignAction = (open: boolean, imageBase64: string) => ({
  type: OPEN_SAVEDESIGN,
  open,
  imageBase64
})

export const setDesignNameAction = (param: string): AnyAction => {
  return {
    type: SET_DESIGN_NAME,
    param
  }
}

// TODO: Temp any
export const setStyleAction = (style: any): AnyAction => ({
  type: SET_STYLE_SELECTED_ACTION,
  style
})

export const setStyleComplexity = (
  index: number,
  colors: string[]
): AnyAction => ({
  type: SET_STYLE_COMPLEXITY_ACTION,
  index,
  colors
})

export const openShareModalAction = (open: boolean): AnyAction => ({
  type: OPEN_SHARE_MODAL,
  open
})

export const saveDesignLoadingAction = (loading: boolean): AnyAction => ({
  type: SAVE_DESIGN_LOADING,
  loading
})

export const saveDesignIdAction = (id: string): AnyAction => ({
  type: SAVE_DESIGN_ID,
  id
})

export const setCheckedTermsAction = (checked: boolean): AnyAction => ({
  type: SET_CHECKED_TERMS,
  checked
})

export const clearDesignInfoAction = (): AnyAction => ({
  type: CLEAR_DESIGN_INFO
})

export const setTextAction = (text: string): AnyAction => ({
  type: SET_TEXT_ACTION,
  text
})

export const openAddToTeamStoreModalAction = (open: boolean): AnyAction => ({
  type: OPEN_ADD_TOTEAMSTORE,
  open
})

export const setItemToAddAction = (
  teamStoreItem: TeamStoreItemtype,
  teamStoreId: string
): AnyAction => ({
  type: SET_ITEM_TOADD,
  teamStoreItem,
  teamStoreId
})
