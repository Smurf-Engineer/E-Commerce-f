/**
 * IntakeForm Types - Created by eduardoquintero on 17/11/20.
 */
const namespace = 'src/IntakeForm'

export const SELECT_PRODUCT = `${namespace}/SELECT_PRODUCT`
export const DESELECT_PRODUCT = `${namespace}/DESELECT_PRODUCT`
export const GO_TO_NEXT_PAGE = `${namespace}/GO_TO_NEXT_PAGE`

export enum Sections {
  PRODUCTS = 0,
  PATHWAY = 1,
  INSPIRATION = 2,
  COLORS = 3,
  FILES = 5,
  NOTES = 6,
  REVIEW = 7
}