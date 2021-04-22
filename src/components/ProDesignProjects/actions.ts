/**
 * ProDesignProjects Actions - Created by eduardoquintero on 17/12/20.
 */

import {
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_CURRENT_SECTION
} from './constants'
import { AnyAction } from '../../types/common'

export const setCurrentPageAction = (page: number): AnyAction => ({
  type: SET_CURRENT_PAGE,
  page
})

export const setCurrentSectionAction = (page: number, projectId: number): AnyAction => ({
  type: SET_CURRENT_SECTION,
  page,
  projectId
})

export const resetDataAction = (): AnyAction => ({
  type: RESET_DATA
})
