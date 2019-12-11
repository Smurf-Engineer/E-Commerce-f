/**
 * PublishingTool  Actions - Created by eduardoquintero on 19/09/19.
 */

import {
  ON_RESET_REDUCER,
  SET_PRODUCT_CODE,
  ON_CHANGE_THEME
} from './constants'

import { AnyAction } from '../../types/common'

export const onResetReducer = (): AnyAction => ({
  type: ON_RESET_REDUCER
})

export const setProductCodeAction = (value: string): AnyAction => ({
  type: SET_PRODUCT_CODE,
  value
})

export const onChangeThemeAction = (id: number): AnyAction => ({
  type: ON_CHANGE_THEME,
  id
})
