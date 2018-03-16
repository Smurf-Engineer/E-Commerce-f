/**
 * Fit redux actions
 */
import {
  DEFAULT_ACTION,
  SET_GENDER,
  SET_FIT_STYLE,
  SET_METRIC,
  SET_FIT_STYLE_DESCRIPTION,
  SET_FIT_STYLE_IMAGE
} from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setGender = (param: number): AnyAction => {
  return {
    type: SET_GENDER,
    param
  }
}

export const setFitStyle = (param: number): AnyAction => {
  return {
    type: SET_FIT_STYLE,
    param
  }
}

export const setFitStyleDescription = (param: string): AnyAction => {
  return {
    type: SET_FIT_STYLE_DESCRIPTION,
    param
  }
}

export const setFitStyleImage = (param: string): AnyAction => {
  return {
    type: SET_FIT_STYLE_IMAGE,
    param
  }
}

export const setMetric = (param: string): AnyAction => {
  return {
    type: SET_METRIC,
    param
  }
}
