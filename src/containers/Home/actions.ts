/**
 * Home redux actions
 */
import { DEFAULT_ACTION } from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (): AnyAction => ({
  type: DEFAULT_ACTION
})
