import { COMMENTER_TYPE, APPROVER_TYPE } from '../../constants'
import {
    BLUE_STATUS,
    GREEN_BRIGHT,
    RED_DARK,
    ORANGE_STATUS,
    COLOR_IN_DESIGN,
    COLOR_AM_REVIEW,
    COLOR_EDIT_REQUEST
} from '../../theme/colors'

/**
 * Designs Types - Created by david on 27/03/18.
 */
const namespace = 'src/Designs'

export const DEFAULT_ACTION = `${namespace}/DEFAULT_ACTION`
export const SET_OPEN_MODAL = `${namespace}/SET_OPEN_MODAL`
export const SET_UPLOADING = `${namespace}/SET_UPLOADING`
export const SET_FILE = `${namespace}/SET_FILE`
export const DELETE_FILE = `${namespace}/DELETE_FILE`
export const SET_NOTE = `${namespace}/SET_NOTE`
export const SET_REPLY = `${namespace}/SET_REPLY`
export const SET_SENDING_NOTE = `${namespace}/SET_SENDING_NOTE`
export const SET_APPROVE_LOADING = `${namespace}/SET_APPROVE_LOADING`
export const SET_EDIT_PROJECT = `${namespace}/SET_EDIT_PROJECT`

// Tabs Key
export const APPROVAL = 'approval'
export const COLOR = 'color'
export const COLLAB = 'collab'
export const COMMENTS = 'comments'

// Member Colors
export const memberColors = [
    BLUE_STATUS,
    GREEN_BRIGHT,
    RED_DARK,
    ORANGE_STATUS,
    COLOR_IN_DESIGN,
    COLOR_AM_REVIEW,
    COLOR_EDIT_REQUEST,
]

export const memberTypeOptions = [
    COMMENTER_TYPE,
    APPROVER_TYPE
]