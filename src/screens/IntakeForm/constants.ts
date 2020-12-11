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
