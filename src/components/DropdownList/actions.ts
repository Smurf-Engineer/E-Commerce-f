/**
 * Menu redux actions
 */
import {
  SET_MENU_GENDER_SELECTED,
  SET_MENU_SPORT_SELECTED,
  SET_GENDER_SPORT_SELECTED,
  SET_SPORTS
} from './constants'
import { Option } from './index'
import { AnyAction, Filter } from '../../types/common'

export const setMenuGenderSelectedAction = (
  index: number,
  visible: boolean
): AnyAction => ({
  type: SET_MENU_GENDER_SELECTED,
  index,
  visible
})

export const setMenuSportSelectedAction = (
  index: number,
  visible: boolean
): AnyAction => ({
  type: SET_MENU_SPORT_SELECTED,
  index,
  visible
})

export const setGenderSportAction = (sport: number): AnyAction => ({
  type: SET_GENDER_SPORT_SELECTED,
  sport
})

export const setSportsAction = (
  sportOptions: Option[],
  sportsData: Filter[]
): AnyAction => ({
  type: SET_SPORTS,
  sportOptions,
  sportsData
})
