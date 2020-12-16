/**
 * ProductCatalog  Actions - Created by cazarez on 27/02/18.
 */
import { InspirationType, ImageFile } from '../../types/common'
import { Moment } from 'moment'
import {
  SELECT_ELEMENT,
  DESELECT_ELEMENT,
  GO_TO_NEXT_PAGE,
  SET_INSPIRATION_PAGE,
  SET_INSPIRATION_DATA,
  SET_INSPIRATION_LOADING,
  SET_PALETTE,
  SET_UPLOADING_FILE,
  SET_FILE,
  OPEN_LOCKER,
  ADD_LOCKER_ITEMS,
  DESELECT_LOCKER_FILE,
  SELECT_TEAM_SIZE,
  SET_INPUT,
  ON_SELECT_DATE,
  ON_CHECK_SMS,
  ON_CHECK_EMAIL,
  SET_SAVING_INTAKE,
  SET_SUCCESS_MODAL_OPEN
} from './constants'

export const selectElementAction = (elementId: number, listName: string, index?: number) => ({
  type: SELECT_ELEMENT,
  elementId,
  listName,
  index
})

export const deselectElementAction = (elementId: number | string, listName: string, index?: number) => ({
  type: DESELECT_ELEMENT,
  elementId,
  listName,
  index
})

export const goToPage = (page: number) => ({
  type: GO_TO_NEXT_PAGE,
  page
})

export const setInspirationPageAction = (skip: number, newPage: number) => ({
  type: SET_INSPIRATION_PAGE,
  skip,
  newPage
})

export const setInspirationDataAction = (data: InspirationType[], fullCount: number) => ({
  type: SET_INSPIRATION_DATA,
  data,
  fullCount
})

export const setInspirationLoadingAction = (loading: boolean) => ({
  type: SET_INSPIRATION_LOADING,
  loading
})

export const selectPaletteAction = (primaryColor: string, accentColors: string[], index: number) => ({
  type: SET_PALETTE,
  primaryColor,
  accentColors,
  index
})

export const setUploadingFileAction = (uploading: boolean) => ({
  type: SET_UPLOADING_FILE,
  uploading
})

export const setFileAction = (file: ImageFile, listName: string) => ({
  type: SET_FILE,
  file,
  listName
})

export const openUserLockerAction = (open: boolean) => ({
  type: OPEN_LOCKER,
  open
})

export const onAddItemsAction = () => ({
  type: ADD_LOCKER_ITEMS
})

export const deselectLockerItemAction = (elementId: number, listName: string) => ({
  type: DESELECT_LOCKER_FILE,
  elementId,
  listName
})

export const onSelectTeamSizeAction = (size: string) => ({
  type: SELECT_TEAM_SIZE,
  size
}) 

export const onSetInputAction = (key: string, value: string) => ({
  type: SET_INPUT,
  key,
  value
})

export const onSelectDateAction = (dateMoment: Moment, date: string) => ({
  type: ON_SELECT_DATE,
  dateMoment,
  date
})

export const onCheckSmsChangeAction = (checked: boolean) => ({
  type: ON_CHECK_SMS,
  checked
})

export const onCheckEmailChangeAction = (checked: boolean) => ({
  type: ON_CHECK_EMAIL,
  checked
})

export const onSetSavingIntake = (saving: boolean) => ({
  type: SET_SAVING_INTAKE,
  saving
})

export const onSetSuccessModalOpen = (open: boolean) => ({
  type: SET_SUCCESS_MODAL_OPEN,
  open
})