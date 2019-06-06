/**
 * HomepageAdminActions Types - Created by eduardoquintero on 30/05/19.
 */

const namespace = 'src/OrderHistoryAdmin'

export enum Sections {
  MAIN_CONTAINER = 'mainContainer',
  MAIN_HEADER = 'mainHeader',
  SECONDARY_HEADER = 'secondaryHeader'
}
export enum ImageTypes {
  DESKTOP = 'dekstopImage',
  MOBILE = 'mobileImage'
}

export const CLEAR_REDUCER = `${namespace}/CLEAR_REDUCER`
export const SET_URL_IMAGE = `${namespace}/SET_URL_IMAGE`
export const SET_LOADING = `${namespace}/SET_LOADING`
export const SET_HOMEPAGE_INFO = `${namespace}/SET_HOMEPAGE_INFO`
export const SET_URL = `${namespace}/SET_URL`
export const SET_LOADERS = `${namespace}/SET_LOADERS`
