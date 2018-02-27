/**
 * DesignCenter  Actions - Created by david on 23/02/18.
 */
import {
  DEFAULT_ACTION,
  SET_CURRENT_TAB_ACTION,
  SET_COLOR_BLOCK_ACTION
} from './constants'
import { AnyAction } from '../../types/common'

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
