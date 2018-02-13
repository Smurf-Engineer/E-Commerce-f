/**
 * Home redux actions
 */
import {
  DEFAULT_ACTION,
  SET_SPORT_SELECTED,
  SET_CATEGORY_SELECTED,
  CLEAR_STATE_ACTION
} from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setSportAction = (sport: number): AnyAction => ({
  type: SET_SPORT_SELECTED,
  sport
})

export const setCategoryAction = (category: number): AnyAction => ({
  type: SET_CATEGORY_SELECTED,
  category
})

export const setClearAction = (): AnyAction => ({
  type: CLEAR_STATE_ACTION
})
