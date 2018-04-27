/**
 * CreateStore  Actions - Created by david on 09/04/18.
 */
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
  MOVE_ROW
} from './constants'
import { OPEN_QUICKVIEW_ACTION } from '../../components/MainLayout/constants'
import { Moment } from 'moment'
import { AnyAction, DesignType } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setTeamSizeAction = (id: number, range: string): AnyAction => ({
  type: SET_TEAM_SIZE_ACTION,
  id,
  range
})

export const updateNameAction = (name: string): AnyAction => ({
  type: UPDATE_NAME_ACTION,
  name
})

export const setLoadingAction = (isLoading: boolean): AnyAction => ({
  type: SET_LOADING_ACTION,
  isLoading
})

export const updateStartDateAction = (
  dateMoment: Moment,
  date: string
): AnyAction => ({
  type: UPDATE_START_DATE_ACTION,
  dateMoment,
  date
})

export const updateEndDateAction = (
  dateMoment: Moment,
  date: string
): AnyAction => ({
  type: UPDATE_END_DATE_ACTION,
  dateMoment,
  date
})

export const updatePrivateAction = (active: boolean): AnyAction => ({
  type: UPDATE_PRIVATE_ACTION,
  active
})

export const updateOnDemandAction = (active: boolean): AnyAction => ({
  type: UPDATE_ON_DEMAND_ACTION,
  active
})

export const updatePassCodeAction = (code: string): AnyAction => ({
  type: UPDATE_PASS_CODE_ACTION,
  code
})

export const setOpenLockerAction = (isOpen: boolean): AnyAction => ({
  type: SET_OPEN_LOCKER_ACTION,
  isOpen
})

export const setItemSelectedAction = (
  id: number,
  checked: boolean
): AnyAction => ({
  type: SET_ITEM_SELECTED_ACTION,
  id,
  checked
})

export const deleteItemSelectedAction = (index: number): AnyAction => ({
  type: DELETE_ITEM_SELECTED_ACTION,
  index
})

export const setItemsAddAction = (items: DesignType[]): AnyAction => ({
  type: SET_ITEMS_ADD_ACTION,
  items
})

export const clearStoreAction = (): AnyAction => ({
  type: CREATE_STORE_SUCCESS
})

export const setItemVisibleAction = (
  index: number,
  visible: boolean
): AnyAction => ({
  type: SET_ITEM_VISIBLE_ACTION,
  index,
  visible
})

export const openQuickViewAction = (
  id: number,
  yotpoId: string | null,
  hideSliderButtons?: boolean
): AnyAction => ({
  type: OPEN_QUICKVIEW_ACTION,
  id,
  yotpoId,
  hideSliderButtons
})

export const moveRowAction = (index: number, hoverIndex: number, row: any) => ({
  type: MOVE_ROW,
  index,
  hoverIndex,
  row
})
