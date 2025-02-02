/**
 * ProDesignProjects Types - Created by eduardoquintero on 17/12/20.
 */

const namespace = 'src/ProDesignProjects'

export const SET_CURRENT_PAGE = `${namespace}/SET_CURRENT_PAGE`
export const RESET_DATA = `${namespace}/RESET_DATA`
export const SET_CURRENT_SECTION = `${namespace}/SET_CURRENT_SECTION`

export const PROJECTS_LIMIT = 12

export enum Pages {
  LIST = 0,
  DETAILS = 1
}
  
// Member Colors
export const memberColors = [
  '#689ac5',
  '#c57168',
  '#68c56f',
  '#a668c5',
  '#e9c74b'
]