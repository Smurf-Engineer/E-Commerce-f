/**
 * Notifications Actions - Created by eduardoquintero on 26/10/20.
 */

import {
    SET_CURRENT_PAGE,
  } from './constants'
import { AnyAction } from '../../types/common'
  
export const setCurrentPageAction = (page: number): AnyAction => ({
    type: SET_CURRENT_PAGE,
    page
})
  