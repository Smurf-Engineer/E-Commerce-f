/**
 * TeamStoresAdmin  Actions - Created by eduardoquintero on 15/07/19.
 */

import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT,
  SET_LOADING,
  SET_PRICE_ITEM,
  SET_TEAM_STORE_DATA,
  SET_LOADING_ITEM,
  SET_OPEN_LOCKER_ACTION,
  SET_ITEM_SELECTED_ACTION,
  ON_UNSELECT_ITEM,
  SET_ITEMS_ADD_ACTION,
  SET_PAGINATION_DATA,
  SET_SAVING_ACTION,
  DELETE_ITEM_SELECTED_ACTION,
  SET_ITEM_VISIBLE_ACTION,
  MOVE_ROW,
  SET_NAME,
  SET_FEATURED,
  SET_OPEN_MODAL,
  SET_IMAGE,
  SET_SELECTED_USER,
  SET_USER_TO_SEARCH
} from './constants'

import {
  AnyAction,
  sorts,
  TeamStoreAdminType,
  Currency,
  DesignType,
  LockerTableType
} from '../../types/common'
import { QueryProps } from 'react-apollo'

interface TeamStoresData extends QueryProps {
  teamStore: TeamStoreAdminType
  currencies: Currency[]
}

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

export const setSearchTextAction = (searchText: string) => ({
  type: SET_SEARCH_TEXT,
  searchText
})

export const setLoadingAction = (loading: boolean) => ({
  type: SET_LOADING,
  loading
})

export const setPriceAction = (
  value: number,
  currency: string,
  itemIndex: number
) => ({
  type: SET_PRICE_ITEM,
  value,
  currency,
  itemIndex
})

export const setTeamStoreDataAction = ({
  teamStore,
  currencies
}: TeamStoresData) => ({
  type: SET_TEAM_STORE_DATA,
  teamStore,
  currencies
})

export const setLoadingItemAction = (itemIndex: string, loading: boolean) => ({
  type: SET_LOADING_ITEM,
  itemIndex,
  loading
})

export const setOpenLockerAction = (isOpen: boolean): AnyAction => ({
  type: SET_OPEN_LOCKER_ACTION,
  isOpen
})

export const setItemSelectedAction = (
  item: DesignType,
  checked: boolean
): AnyAction => ({
  type: SET_ITEM_SELECTED_ACTION,
  item,
  checked
})

export const onUnselectItemAction = (keyName: string) => ({
  type: ON_UNSELECT_ITEM,
  keyName
})

export const setItemsAddAction = (): AnyAction => ({
  type: SET_ITEMS_ADD_ACTION
})

export const setPaginationData = (offset: number, page: number) => ({
  type: SET_PAGINATION_DATA,
  offset,
  page
})

export const deleteItemSelectedAction = (index: number): AnyAction => ({
  type: DELETE_ITEM_SELECTED_ACTION,
  index
})

export const setItemVisibleAction = (
  index: number,
  visible: boolean
): AnyAction => ({
  type: SET_ITEM_VISIBLE_ACTION,
  index,
  visible
})

export const moveRowAction = (
  index: number,
  hoverIndex: number,
  row: LockerTableType
) => ({
  type: MOVE_ROW,
  index,
  hoverIndex,
  row
})

export const setNameAction = (name: string) => ({
  type: SET_NAME,
  name
})

export const setFeaturedAction = (featured: boolean) => ({
  type: SET_FEATURED,
  featured
})

export const openModal = (opened: boolean) => ({
  type: SET_OPEN_MODAL,
  opened
})

export const setImage = (imagePreviewUrl: string, opened: boolean) => ({
  type: SET_IMAGE,
  imagePreviewUrl,
  opened
})

export const setSavingAction = (saving: boolean) => ({
  type: SET_SAVING_ACTION,
  saving
})

export const setSelectedUser = (user: string) => ({
  type: SET_SELECTED_USER,
  user
})

export const setUserToSearch = (searchText: string) => ({
  type: SET_USER_TO_SEARCH,
  searchText
})
// TODO: Add new tests for the new actions once everything is completed
