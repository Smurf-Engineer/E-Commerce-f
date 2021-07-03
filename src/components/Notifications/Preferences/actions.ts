import {
  SET_SETTINGS_LOADING
} from '../constants'
import { AnyAction } from '../../../types/common'

export const setSettingsLoadingAction = (
  loading: boolean
): AnyAction => ({
  type: SET_SETTINGS_LOADING,
  loading
})
