import { fromJS } from 'immutable'
import {
  SET_SETTINGS_LOADING
} from '../constants'
import { Reducer } from '../../../types/common'

export const initialState = fromJS({
  loadingSettings: false
})

const notificationSettingsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTINGS_LOADING:
      return state.set('loadingSettings', action.loading)
    default:
      return state
  }
}

export default notificationSettingsReducer
