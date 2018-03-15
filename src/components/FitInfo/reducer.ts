/**
 * Home reducer
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_GENDER,
  SET_FIT_STYLE,
  SET_METRIC,
  SET_FIT_STYLE_DESCRIPTION,
  SET_FIT_STYLE_IMAGE
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  email: '',
  gender: 1,
  fitStyle: 1,
  fitStyleDescription: '',
  fitStyleImage: '',
  metric: 'IN'
})

const fitInfoReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_GENDER:
      return state.set('gender', action.param)
    case SET_FIT_STYLE:
      return state.set('fitStyle', action.param)
    case SET_FIT_STYLE_DESCRIPTION:
      return state.set('fitStyleDescription', action.param)
    case SET_FIT_STYLE_IMAGE:
      return state.set('fitStyleImage', action.param)
    case SET_METRIC:
      return state.set('metric', action.param)
    default:
      return state
  }
}

export default fitInfoReducer
