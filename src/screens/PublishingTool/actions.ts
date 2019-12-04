/**
 * PublishingTool  Actions - Created by eduardoquintero on 19/09/19.
 */

import { ON_RESET_REDUCER } from './constants'

import { AnyAction } from '../../types/common'

export const onResetReducer = (): AnyAction => ({
  type: ON_RESET_REDUCER
})
