/**
 * StoreFront  Actions - Created by gustavomedina on 11/04/18.
 */
import {
  DEFAULT_ACTION,
  OPEN_SHARE_MODAL,
  OPEN_PASS_CODE,
  SET_PASS_CODE,
  OPEN_EMAIL_CONTACT,
  SET_EMAIL_CONTACT,
  SET_EMAIL_MESSAGE,
  SEND_MESSAGE_LOADING
} from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const openShareModalAction = (
  open: boolean,
  storeId?: string
): AnyAction => {
  return {
    type: OPEN_SHARE_MODAL,
    open,
    storeId
  }
}

export const openPassCodeDialogAction = (open: boolean) => ({
  type: OPEN_PASS_CODE,
  open
})

export const setPassCodeAction = (param: string): AnyAction => {
  return {
    type: SET_PASS_CODE,
    param
  }
}

export const openEmailContactDialogAction = (open: boolean) => ({
  type: OPEN_EMAIL_CONTACT,
  open
})

export const setEmailContactAction = (param: string): AnyAction => {
  return {
    type: SET_EMAIL_CONTACT,
    param
  }
}

export const setEmailMessageAction = (param: string): AnyAction => {
  return {
    type: SET_EMAIL_MESSAGE,
    param
  }
}

export const sendMessageLoadingAction = (loading: boolean): AnyAction => ({
  type: SEND_MESSAGE_LOADING,
  loading
})
