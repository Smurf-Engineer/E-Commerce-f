/**
 * FitAndSizing Actions - Created by jorge on 01/08/18.
 */
import { SET_MSRMNT_SYSTEM } from './constants'
import { AnyAction } from '../../types/common'

export const setMsrmntSystemAction = (units: string): AnyAction => ({
  type: SET_MSRMNT_SYSTEM,
  units
})
