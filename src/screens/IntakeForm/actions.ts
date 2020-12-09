/**
 * ProductCatalog  Actions - Created by cazarez on 27/02/18.
 */
import { InspirationType } from '../../types/common'
import {
  SELECT_ELEMENT,
  DESELECT_ELEMENT,
  GO_TO_NEXT_PAGE,
  SET_INSPIRATION_PAGE,
  SET_INSPIRATION_DATA,
  SET_INSPIRATION_LOADING
} from './constants'

export const selectElementAction = (elementId: number, listName: string) => ({
  type: SELECT_ELEMENT,
  elementId,
  listName
})

export const deselectElementAction = (elementId: number, listName: string) => ({
  type: DESELECT_ELEMENT,
  elementId,
  listName
})

export const goToPage = (page: number) => ({
  type: GO_TO_NEXT_PAGE,
  page
})

export const setInspirationPageAction = (skip: number, newPage: number) => ({
  type: SET_INSPIRATION_PAGE,
  skip,
  newPage
})

export const setInspirationDataAction = (data: InspirationType[], fullCount: number) => ({
  type: SET_INSPIRATION_DATA,
  data,
  fullCount
})

export const setInspirationLoadingAction = (loading: boolean) => ({
  type: SET_INSPIRATION_LOADING,
  loading
})