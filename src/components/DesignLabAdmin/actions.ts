/**
 * DesignLabAdmin  Actions - Created by eduardoquintero on 12/06/19.
 */

import { CLEAR_REDUCER } from './constants'

import { AnyAction } from '../../types/common'

export const clearReducerAction = (): AnyAction => ({
  type: CLEAR_REDUCER
})
