/**
 * DesignTools  Actions - Created by Jesús Apodaca on 04/12/19.
 */

import { ON_RESET_REDUCER, SET_UPLOADING_ACTION } from './constants'

import { AnyAction } from '../../types/common'

export const onResetReducer = (): AnyAction => ({
  type: ON_RESET_REDUCER
})

export const setUploadingAction = (isLoading: boolean): AnyAction => ({
  type: SET_UPLOADING_ACTION,
  isLoading
})
