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
  MOVE_ROW,
  SET_STORE_DATA_TO_EDIT,
  DELETE_BANNER_ON_EDIT,
  OPEN_MODAL,
  CLEAR_DATA,
  SET_TEAM_STORE_STATUS,
  SET_PAGINATION_DATA,
  ON_UNSELECT_ITEM
} from './constants'
import { OPEN_QUICKVIEW_ACTION } from '../../components/MainLayout/constants'
import { Moment } from 'moment'
import { AnyAction, DesignType, TeamstoreType } from '../../types/common'

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

export const openModal = (open: boolean): AnyAction => ({
  type: OPEN_MODAL,
  open
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
  item: DesignType,
  checked: boolean
): AnyAction => ({
  type: SET_ITEM_SELECTED_ACTION,
  item,
  checked
})

export const deleteItemSelectedAction = (index: number): AnyAction => ({
  type: DELETE_ITEM_SELECTED_ACTION,
  index
})

export const setItemsAddAction = (): AnyAction => ({
  type: SET_ITEMS_ADD_ACTION
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

export const setDataToEditAction = (data: TeamstoreType): AnyAction => ({
  type: SET_STORE_DATA_TO_EDIT,
  data
})

export const deleteBannerOnEditAction = () => ({
  type: DELETE_BANNER_ON_EDIT
})

export const clearDataAction = () => ({
  type: CLEAR_DATA
})

export const setTeamStoreStatusAction = (show: boolean) => ({
  type: SET_TEAM_STORE_STATUS,
  show
})

export const setPaginationDataAction = (offset: number, page: number) => ({
  type: SET_PAGINATION_DATA,
  offset,
  page
})

export const onUnselectItemAction = (index: number) => ({
  type: ON_UNSELECT_ITEM,
  index
})
