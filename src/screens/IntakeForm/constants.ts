/**
 * IntakeForm Types - Created by eduardoquintero on 17/11/20.
 */
const namespace = 'src/IntakeForm'

export const SELECT_ELEMENT = `${namespace}/SELECT_ELEMENT`
export const DESELECT_ELEMENT = `${namespace}/DESELECT_ELEMENT`
export const GO_TO_NEXT_PAGE = `${namespace}/GO_TO_NEXT_PAGE`
export const SET_INSPIRATION_PAGE = `${namespace}/SET_INSPIRATION_PAGE`
export const SET_INSPIRATION_DATA = `${namespace}/SET_INSPIRATION_DATA`
export const SET_INSPIRATION_LOADING = `${namespace}/SET_INSPIRATION_LOADING`
export const SET_PALETTE = `${namespace}/SET_PALETTE`
export const SET_UPLOADING_FILE = `${namespace}/SET_UPLOADING_FILE`
export const SET_FILE = `${namespace}/SET_FILE`
export const OPEN_LOCKER = `${namespace}/OPEN_LOCKER`
export const ADD_LOCKER_ITEMS = `${namespace}/ADD_LOCKER_ITEMS`
export const DESELECT_LOCKER_FILE = `${namespace}/DESELECT_LOCKER_FILE`
export const SELECT_TEAM_SIZE = `${namespace}/SELECT_TEAM_SIZE`
export const SET_INPUT = `${namespace}/SET_INPUT`
export const ON_SELECT_DATE = `${namespace}/ON_SELECT_DATE`
export const ON_CHECK_SMS = `${namespace}/ON_CHECK_SMS`
export const ON_CHECK_EMAIL = `${namespace}/ON_CHECK_EMAIL`
export const SET_SAVING_INTAKE = `${namespace}/SET_SAVING_INTAKE`
export const SET_SUCCESS_MODAL_OPEN = `${namespace}/SET_SUCCESS_MODAL_OPEN`
export const SET_SMS_ALERTS_MODAL_OPEN = `${namespace}/SET_SMS_ALERTS_MODAL_OPEN`
export const ON_EXPAND_INSPIRATION = `${namespace}/ON_EXPAND_INSPIRATION`
export const ON_CLOSE_INSPIRATION = `${namespace}/ON_CLOSE_INSPIRATION`
export const SET_FROM_SCRATCH = `${namespace}/SET_FROM_SCRATCH`
export const RESET_COLOR_SELECTION = `${namespace}/RESET_COLOR_SELECTION`
export const SELECT_PRODUCT = `${namespace}/SELECT_PRODUCT`
export const ADD_TAG = `${namespace}/ADD_TAG`
export const REMOVE_TAG = `${namespace}/REMOVE_TAG`
export const RESET_INSPIRATION = `${namespace}/RESET_INSPIRATION`
export const REMOVE_FROM_LIST = `${namespace}/REMOVE_FROM_LIST`
export const ADD_TO_LIST = `${namespace}/ADD_TO_LIST`
export const SET_DESCRIPTION = `${namespace}/SET_DESCRIPTION`
export const OPEN_RENAME_MODAL = `${namespace}/OPEN_RENAME_MODAL`
export const ON_RENAME_FILE = `${namespace}/ON_RENAME_FILE`
export const ON_SET_RENAMING = `${namespace}/ON_SET_RENAMING`
export const CHANGE_LOCAL_NAME = `${namespace}/CHANGE_LOCAL_NAME`
export const SET_FILE_TERMS = `${namespace}/SET_FILE_TERMS`
export const SET_FROM_DESIGN = `${namespace}/SET_FROM_DESIGN`
export const SET_PAGINATION_DATA = `${namespace}/SET_PAGINATION_DATA`
export const SET_SELECTED_DESIGN = `${namespace}/SET_SELECTED_DESIGN`
export const SET_OPEN_BUILD = `${namespace}/SET_OPEN_BUILD`
export const SET_HIGHLIGHT = `${namespace}/SET_HIGHLIGHT`
export const SET_ADMIN_PROJECT_USER_ID = `${namespace}/SET_ADMIN_PROJECT_USER_ID`
export const SET_USER_TO_SEARCH = `${namespace}/SET_USER_TO_SEARCH`

export const KICKSTART = 'kickstart'
export const GRAPHIC = 'graphic'
export const PHOTO = 'photo'

export enum Sections {
  LOCKER = -3,
  PATHWAY = -2,
  PRODUCTS = -1,
  INSPIRATION = 0,
  COLORS = 1,
  FILES = 2,
  NOTES = 3,
  NOTIFICATIONS = 4,
  REVIEW = 5
}

export const InspirationTag = {
  [KICKSTART]: 'K',
  [GRAPHIC]: 'A',
  [PHOTO]: 'P'
}

export const CUSTOM_PALETTE_INDEX = -1
export const SELECTED_LCOKER_FILES = 'lockerSelectedFiles'
export const SELECTED_FILES = 'selectedFiles'
export const SELECTED_ITEMS = 'selectedItems'
export const INSPIRATION_SELECTEED_ITEMS = 'inspirationSelectedItems'

export const titleTexts = {
  [Sections.LOCKER]:
  {
    title: 'chooseDesigns',
    body: 'designsDescription',
    bodyWithTip: '',
    action: false,
    tipTitle: '',
    tipBody: '',
    tipAccept: ''
  },
  [Sections.PATHWAY]:
  {
    title: 'designPathway',
    body: 'designPathwayBody',
    subTopText: 'subTopPathWay',
    bodyWithTip: '',
    action: false,
    tipTitle: '',
    tipBody: '',
    tipAccept: ''
  },
  [Sections.PRODUCTS]:
  {
    title: 'chooseProducts',
    body: 'productsDescription',
    bodyWithTip: '',
    action: false,
    tipTitle: '',
    tipBody: '',
    tipAccept: ''
  },
  [Sections.INSPIRATION]:
  {
    title: 'inspiration',
    body: 'inspirationBody',
    bodyWithTip: 'inspirationTip',
    action: false,
    tipTitle: '',
    tipBody: '',
    tipAccept: ''
  },
  [Sections.COLORS]:
  {
    title: 'colors',
    body: '',
    bodyWithTip: 'colorsBody',
    action: true,
    tipTitle: 'colorsTipTitle',
    tipBody: 'colorsTipBody',
    tipAccept: 'gotIt'
  },
  [Sections.FILES]:
  {
    title: 'fileUploadTitle',
    body: 'fileUploadBody',
    secondaryBody: 'fileUploadSecondary',
    bodyWithTip: 'fileUploadTips',
    action: true,
    tipTitle: 'fileUploadTipTitle',
    tipBody: 'fileUploadTipBody',
    tipAccept: 'gotIt'
  },
  [Sections.NOTES]:
  {
    title: 'designNotes',
    body: 'designNotesBody',
    bodyWithTip: '',
    action: false,
    tipTitle: '',
    tipBody: '',
    tipAccept: ''
  },
  [Sections.NOTIFICATIONS]:
  {
    title: 'notifications',
    body: 'notificationsBody',
    bodyWithTip: 'designNotesBodyTip',
    action: true,
    tipTitle: 'artAndDelivery',
    tipBody: 'designNotesModal',
    tipAccept: 'gotIt'
  },
  [Sections.REVIEW]:
  {
    title: 'reviewTitle',
    body: 'reviewBody',
    bodyWithTip: '',
    action: false,
    tipTitle: '',
    tipBody: '',
    tipAccept: ''
  }
}
