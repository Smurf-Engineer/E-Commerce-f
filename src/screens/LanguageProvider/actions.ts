/**
 * LanguageProvider  Actions - Created by david on 20/02/18.
 */
import { CHANGE_LOCALE, SET_REGION_ACTION } from './constants'
import { AnyAction, RegionConfig } from '../../types/common'

export const changeLocaleAction = (locale: string): AnyAction => ({
  type: CHANGE_LOCALE,
  locale
})

export const setRegionAction = (payload: RegionConfig): AnyAction => ({
  type: SET_REGION_ACTION,
  payload
})
