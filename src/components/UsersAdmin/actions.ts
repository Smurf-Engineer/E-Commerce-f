/**
 * UsersAdmin  Actions - Created by eduardoquintero on 29/05/19.
 */

import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT,
  ON_INPUT_CHANGE,
  SET_DESIGN,
  ON_CHANGE_SECTION,
  ON_TOGGLE_MODAL,
  ON_RESET_MODAL,
  SET_LOADING,
  CHANGE_NOTE,
  SET_SEARCH,
  CLOSE_INTERNAL,
  OPEN_INTERNAL,
  SET_SEARCH_MANAGER,
  SET_AFFILIATE_PAGE,
  SET_RESELLER_PAGE,
  SET_CHECKED,
  CHANGE_INTERNAL
} from './constants'

import { AnyAction, sorts } from '../../types/common'

export const setOrderByAction = (orderBy: string, sort: sorts): AnyAction => ({
  type: SET_ORDER_BY,
  orderBy,
  sort
})

export const setCurrentPageAction = (page: number): AnyAction => ({
  type: SET_CURRENT_PAGE,
  page
})

export const resetDataAction = (): AnyAction => ({
  type: RESET_DATA
})

export const onCloseInternal = (): AnyAction => ({
  type: CLOSE_INTERNAL
})

export const openInternal = (id: string): AnyAction => ({
  type: OPEN_INTERNAL,
  id
})

export const handleOnInternalChange = (value: string): AnyAction => ({
  type: CHANGE_INTERNAL,
  value
})

export const setSearchTextAction = (searchText: string) => ({
  type: SET_SEARCH_TEXT,
  searchText
})

export const setCheckedAction = (name: string, checked: boolean) => ({
  type: SET_CHECKED,
  name,
  checked
})

export const setDesignSelected = (designId: string) => ({
  type: SET_DESIGN,
  designId
})

export const setNoteText = (text: string) => ({
  type: CHANGE_NOTE,
  text
})

export const onInputChangeAction = (id: string, value: string) => ({
  type: ON_INPUT_CHANGE,
  id,
  value
})

export const onChangeSectionAction = (section: number) => ({
  type: ON_CHANGE_SECTION,
  section
})

export const onToggleModalAction = () => ({
  type: ON_TOGGLE_MODAL
})

export const onResetModalAction = () => ({
  type: ON_RESET_MODAL
})

export const setLoadingAction = (loading: boolean) => ({
  type: SET_LOADING,
  loading
})

export const onChangePage = (page: number): AnyAction => ({
  type: SET_AFFILIATE_PAGE,
  page
})

export const onChangePageReseller = (page: number): AnyAction => ({
  type: SET_RESELLER_PAGE,
  page
})

export const setSearchRep = (value: string) => ({
  type: SET_SEARCH,
  value
})

export const setSearchManager = (value: string) => ({
  type: SET_SEARCH_MANAGER,
  value
})
