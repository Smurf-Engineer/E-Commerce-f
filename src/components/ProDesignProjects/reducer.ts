/**
 * ProDesignProjects Reducer - Created by eduardoquintero on 17/12/20.
 */

import { fromJS } from 'immutable'
import {
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_CURRENT_SECTION,
  Pages
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  startDate: '',
  orderBy: 'id',
  sort: 'DESC',
  projectId: null,
  currentSection: Pages.LIST
})

const ProDesignProjectsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case SET_CURRENT_SECTION:
      return state.merge({ currentSection: action.page, projectId: action.projectId })
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default ProDesignProjectsReducer
