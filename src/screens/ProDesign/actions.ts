/**
 * ProDesign  Actions - Created by eduardoquintero on 19/09/19.
 */

import {
  ON_TAB_CLICK,
  SET_PRODUCT_CODE,
  UPLOAD_FILE_ACTION_SUCCESS,
  SET_UPLOADING_FILE_ACTION,
  GO_TO_COLOR_SECTION,
  SET_STITCHING_COLOR_ACTION,
  SET_COLOR_ACTION,
  SET_SELECTED_USER,
  SET_INPUT_VALUE,
  OPEN_MODAL,
  SET_SAVING_DESIGN,
  SAVE_DESIGN_SUCCESS,
  SET_USER_TO_SEARCH,
  SET_PRODUCT_TO_SEARCH
} from './constants'

import { AnyAction, StitchingColor, UserFiles } from '../../types/common'

export const onTabClickAction = (selectedKey: string): AnyAction => ({
  type: ON_TAB_CLICK,
  selectedKey
})

export const setProductCodeAction = (productCode: string): AnyAction => ({
  type: SET_PRODUCT_CODE,
  productCode
})

export const uploadFileSuccessAction = (url: UserFiles, fileName: string) => ({
  type: UPLOAD_FILE_ACTION_SUCCESS,
  url,
  fileName
})

export const setUploadingAction = (isUploading: boolean) => ({
  type: SET_UPLOADING_FILE_ACTION,
  isUploading
})

export const goToColorSectionAction = (index: number) => ({
  type: GO_TO_COLOR_SECTION,
  index
})

export const setStitchingColorAction = (stitchingColor: StitchingColor) => ({
  type: SET_STITCHING_COLOR_ACTION,
  stitchingColor
})

export const setColorAction = (color: string, id: string) => ({
  type: SET_COLOR_ACTION,
  color,
  id
})

export const setSelectedUserAction = (email: string) => ({
  type: SET_SELECTED_USER,
  email
})

export const setInputValueAction = (id: string, value: string) => ({
  type: SET_INPUT_VALUE,
  id,
  value
})

export const setSaveModalOpenAction = () => ({
  type: OPEN_MODAL
})

export const setSavingDesignAction = (saving: boolean) => ({
  type: SET_SAVING_DESIGN,
  saving
})

export const setSavingDesignSuccessAction = () => ({
  type: SAVE_DESIGN_SUCCESS
})

export const setUserToSearchAction = (value: string) => ({
  type: SET_USER_TO_SEARCH,
  value
})

export const setProductToSearchAction = (value: string): AnyAction => ({
  type: SET_PRODUCT_TO_SEARCH,
  value
})
