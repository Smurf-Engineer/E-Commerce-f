/**
 * ProductCatalog  Actions - Created by cazarez on 27/02/18.
 */
import { InspirationType, ImageFile, Product, DesignType } from '../../types/common'
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
  SET_SUCCESS_MODAL_OPEN,
  ON_EXPAND_INSPIRATION,
  ON_CLOSE_INSPIRATION,
  SET_FROM_SCRATCH,
  RESET_COLOR_SELECTION,
  SELECT_PRODUCT,
  ADD_TAG,
  REMOVE_TAG,
  RESET_INSPIRATION,
  REMOVE_FROM_LIST,
  ADD_TO_LIST,
  SET_DESCRIPTION,
  OPEN_RENAME_MODAL,
  ON_RENAME_FILE,
  ON_SET_RENAMING,
  CHANGE_LOCAL_NAME,
  SET_FILE_TERMS,
  SET_OPEN_BUILD,
  SET_HIGHLIGHT,
  SET_FROM_DESIGN,
  SET_PAGINATION_DATA,
  SET_SELECTED_DESIGN
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

export const setPaginationDataAction = (offset: number, page: number) => ({
  type: SET_PAGINATION_DATA,
  offset,
  page
})

export const setDesignSelectedAction = (id: string, design: DesignType) => ({
  type: SET_SELECTED_DESIGN,
  id,
  design
})

export const goToPage = (page: number) => ({
  type: GO_TO_NEXT_PAGE,
  page
})

export const setOpenBuild = (open: boolean) => ({
  type: SET_OPEN_BUILD,
  open
})

export const setHighlight = (active: boolean) => ({
  type: SET_HIGHLIGHT,
  active
})

export const setInspirationPageAction = (skip: number, newPage: number) => ({
  type: SET_INSPIRATION_PAGE,
  skip,
  newPage
})

export const setInspirationDataAction = (data: InspirationType[], fullCount: number, reset: boolean) => ({
  type: SET_INSPIRATION_DATA,
  data,
  fullCount,
  reset
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

export const onExpandInspirationAction = (
  inspirationId: number,
  image: string,
  name: string,
  isSelected: boolean,
  tags: string[]
  ) => ({
  type: ON_EXPAND_INSPIRATION,
  inspirationId,
  image,
  name,
  isSelected,
  tags
})

export const onCloseInspirationAction = () => ({
  type: ON_CLOSE_INSPIRATION
})

export const setFromScratchAction = (fromScratch: boolean) => ({
  type: SET_FROM_SCRATCH,
  fromScratch
})

export const setFromDesignAction = (fromDesign: boolean) => ({
  type: SET_FROM_DESIGN,
  fromDesign
})

export const resetColorSelectionAction = () => ({
  type: RESET_COLOR_SELECTION
})

export const selectProductAction = (product: Product) => ({
  type: SELECT_PRODUCT,
  product
})

export const addTagAction = (value: string) => ({
  type: ADD_TAG,
  value
})

export const removeTagAction = (value: string) => ({
  type: REMOVE_TAG,
  value
})

export const resetInspirationDataAction = () => ({
  type: RESET_INSPIRATION,
})

export const removeFromListAction = (listName: string, name: string) => ({
  type: REMOVE_FROM_LIST,
  listName,
  name
})

export const addToListAction = (listName: string, name: string) => ({
  type: ADD_TO_LIST,
  listName,
  name
})

export const setDescriptionAction = (contentState: string | null, validLength: boolean) => ({
  type: SET_DESCRIPTION,
  contentState,
  validLength
})

export const openRenameModalAction = (open: boolean, id?: number) => ({
  type: OPEN_RENAME_MODAL,
  open,
  id
})

export const onRenameChangeAction = (value: string) => ({
  type: ON_RENAME_FILE,
  value
})

export const onSetRenamingFile = (loading: boolean) => ({
  type: ON_SET_RENAMING,
  loading
})

export const changeLocalNameAction = (id: number, value: string) => ({
  type: CHANGE_LOCAL_NAME,
  id,
  value
})

export const setFileTermsAction = (checked: boolean) => ({
  type: SET_FILE_TERMS,
  checked
})