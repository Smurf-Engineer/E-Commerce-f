/**
 * ProductModels Actions - Created by Jesús Apodaca on 16/12/19.
 */

import { OPEN_MODAL, EDIT_MODEL, CHANGE_NAME } from './constants'

import { AnyAction } from '../../types/common'

export const openModalAction = (open: boolean): AnyAction => ({
  type: OPEN_MODAL,
  open
})

export const setEditModel = (id: string): AnyAction => ({
  type: EDIT_MODEL,
  id
})

export const changeNameAction = (name: string): AnyAction => ({
  type: CHANGE_NAME,
  name
})
