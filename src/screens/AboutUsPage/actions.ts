/**
 * AboutUsPage  Actions - Created by gustavomedina on 14/06/18.
 */
import { DEFAULT_ACTION } from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})