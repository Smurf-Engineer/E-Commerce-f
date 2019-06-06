/**
 * DiscountsAdmin  Actions - Created by eduardoquintero on 30/05/19.
 */

import {
  CLEAR_REDUCER,
  SET_URL_IMAGE,
  SET_LOADING,
  SET_HOMEPAGE_INFO,
  SET_URL,
  SET_LOADERS
} from './constants'

import { AnyAction } from '../../types/common'

export const clearReducerAction = (): AnyAction => ({
  type: CLEAR_REDUCER
})

export const setUrlImage = (
  url: string,
  section: string,
  imageType: string
) => ({
  type: SET_URL_IMAGE,
  url,
  section,
  imageType
})

export const setLoadingAction = (imageType: string, loading: boolean) => ({
  type: SET_LOADING,
  imageType,
  loading
})

export const setHomepageInfoAction = (data: any): AnyAction => {
  return {
    type: SET_HOMEPAGE_INFO,
    data
  }
}

export const setUrlAction = (value: string): AnyAction => {
  return {
    type: SET_URL,
    value
  }
}

export const setLoadersAction = (
  section: string,
  loading: boolean
): AnyAction => {
  return {
    type: SET_LOADERS,
    section,
    loading
  }
}
