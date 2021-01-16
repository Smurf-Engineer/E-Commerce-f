/**
 * DesignLabAdmin  Actions - Created by eduardoquintero on 12/06/19.
 */

import {
  CLEAR_REDUCER,
  SET_DATA,
  SET_DELIVERY_DAYS,
  SET_PLAYLIST,
  SET_CUTOFF_DAYS, SET_RATE, SET_LOADING
} from './constants'

import { AnyAction, Currency } from '../../types/common'

export const clearReducerAction = (): AnyAction => ({
  type: CLEAR_REDUCER
})

export const setDataAction = (data: any, currencies: Currency[]): AnyAction => ({
  type: SET_DATA,
  data,
  currencies
})

export const setDeliveryDaysAction = (value: number): AnyAction => ({
  type: SET_DELIVERY_DAYS,
  value
})

export const setLoadingAction = (loading: boolean): AnyAction => ({
  type: SET_LOADING,
  loading
})

export const setRateAction = (title: string, currency: string, value: number): AnyAction => ({
  type: SET_RATE,
  title,
  currency,
  value
})

export const setPlaylistAction = (value: string): AnyAction => ({
  type: SET_PLAYLIST,
  value
})

export const setCutoffDaysAction = (value: number): AnyAction => ({
  type: SET_CUTOFF_DAYS,
  value
})
