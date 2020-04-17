/**
 * DesignLabAdmin  Actions - Created by eduardoquintero on 12/06/19.
 */

import {
  CLEAR_REDUCER,
  SET_DATA,
  SET_DELIVERY_DAYS,
  SET_PLAYLIST
} from './constants'

import { AnyAction } from '../../types/common'

export const clearReducerAction = (): AnyAction => ({
  type: CLEAR_REDUCER
})

export const setDataAction = (data: any): AnyAction => ({
  type: SET_DATA,
  data
})

export const setDeliveryDaysAction = (value: number): AnyAction => ({
  type: SET_DELIVERY_DAYS,
  value
})

export const setPlaylistAction = (value: string): AnyAction => ({
  type: SET_PLAYLIST,
  value
})
