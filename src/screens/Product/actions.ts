/**
 * Product  Actions - Created by cazarez on 09/03/18.
 */
import { DEFAULT_ACTION } from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})