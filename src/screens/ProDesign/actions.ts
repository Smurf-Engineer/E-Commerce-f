/**
 * ProDesign  Actions - Created by eduardoquintero on 19/09/19.
 */

import { ON_TAB_CLICK } from './constants'

import { AnyAction } from '../../types/common'

export const onTabClickAction = (selectedKey: string): AnyAction => ({
  type: ON_TAB_CLICK,
  selectedKey
})
