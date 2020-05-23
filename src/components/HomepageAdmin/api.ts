/**
 * API REST Calls actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'
import {
  setUrlImageList,
  setLoadingListAction,
  setProductTileImage,
  setProductTileLoading,
  setMedia
} from './actions'

import { Sections, LoadingSections } from './constants'
import { UploadFile } from 'antd/lib/upload/interface'

const { MAIN_HEADER } = Sections
const { MAIN_HEADER_LOADING, SECONDARY_HEADER_LOADING } = LoadingSections

export const uploadFileAction = (
  file: File,
  section: string,
  imageType: string,
  index: number
) => {
  return async (dispatch: any) => {
    try {
      const loadingSection =
        section === MAIN_HEADER ? MAIN_HEADER_LOADING : SECONDARY_HEADER_LOADING
      dispatch(setLoadingListAction(imageType, true, index, loadingSection))
      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(
        `${config.graphqlUriBase}upload/adminImage`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: formData
        }
      )
      const imageObject = await response.json()
      dispatch(setLoadingListAction(imageType, false, index, loadingSection))
      return dispatch(
        setUrlImageList(imageObject.image, section, imageType, index)
      )
    } catch (e) {
      message.error(e.message)
      return false
    }
  }
}

export const uploadProductFileAction = (file: File, index: number) => {
  return async (dispatch: any) => {
    try {
      dispatch(setProductTileLoading(true, index))
      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(
        `${config.graphqlUriBase}upload/adminImage`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: formData
        }
      )
      const imageObject = await response.json()

      dispatch(setProductTileLoading(false, index))
      return dispatch(setProductTileImage(imageObject.image, index))
    } catch (e) {
      message.error(e.message)
      return false
    }
  }
}

export const uploadMediaAction = (event: UploadFile) => {
  return async (dispatch: any) => {
    try {
      const {
        file,
        data: { index, isMobile }
      } = event
      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(
        `${config.graphqlUriBase}upload/adminImage`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: formData
        }
      )
      const { image } = await response.json()
      const urlField = isMobile ? 'urlMobile' : 'url'
      dispatch(setMedia(index, urlField, image))
    } catch (e) {
      message.error(e.message)
    }
  }
}
