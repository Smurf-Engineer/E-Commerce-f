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
  SET_LOADING_ITEM
} from './constants'

import {
  AnyAction,
  sorts,
  TeamStoreAdminType,
  Currency
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
