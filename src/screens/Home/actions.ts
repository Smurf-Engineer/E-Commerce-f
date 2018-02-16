/**
 * Home redux actions
 */
import { DEFAULT_ACTION, OPEN_QUICKVIEW_ACTION } from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const openQuickViewAction = (id: number | null): AnyAction => ({
  type: OPEN_QUICKVIEW_ACTION,
  id
})
