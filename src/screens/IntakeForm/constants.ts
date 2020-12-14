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

export enum Sections {
  PRODUCTS = -2,
  PATHWAY = -1,
  INSPIRATION = 0,
  COLORS = 1,
  FILES = 2,
  NOTES = 3,
  REVIEW = 4
}

export const CUSTOM_PALETTE_INDEX = -1
export const SELECTED_LCOKER_FILES = 'lockerSelectedFiles'
export const SELECTED_FILES = 'selectedFiles'