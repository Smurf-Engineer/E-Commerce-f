/**
 * ProductModels Actions - Created by Jesús Apodaca on 16/12/19.
 */

import { ON_TAB_CLICK } from './constants'

import { AnyAction } from '../../types/common'

export const onTabClickAction = (selectedKey: string): AnyAction => ({
  type: ON_TAB_CLICK,
  selectedKey
})
