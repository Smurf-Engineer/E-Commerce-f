/**
 * IntakeForm Types - Created by eduardoquintero on 17/11/20.
 */
const namespace = 'src/IntakeForm'

export const SELECT_PRODUCT = `${namespace}/SELECT_PRODUCT`
export const DESELECT_PRODUCT = `${namespace}/DESELECT_PRODUCT`

export enum Sections {
  PRODUCTS = 1,
  PATHWAY = 2,
  INSPIRATION = 3,
  COLORS = 4,
  FILES = 5,
  NOTES = 6,
  REVIEW = 7
}