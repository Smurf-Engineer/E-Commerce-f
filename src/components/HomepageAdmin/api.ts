/**
 * API REST Calls actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'
import {
  setUrlImage,
  setLoadingAction,
  setUrlImageList,
  setLoadingListAction,
  setProductTileImage,
  setProductTileLoading
} from './actions'

export const uploadFileAction = (
  file: File,
  section: string,
  imageType: string,
  index: number
) => {
  return async (dispatch: any) => {
    try {
      if (index >= 0) {
        dispatch(setLoadingListAction(imageType, true, index))
      } else {
        dispatch(setLoadingAction(imageType, true))
      }
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
      if (index >= 0) {
        dispatch(setLoadingListAction(imageType, false, index))
        return dispatch(
          setUrlImageList(imageObject.image, section, imageType, index)
        )
      }
      dispatch(setLoadingAction(imageType, false))
      return dispatch(setUrlImage(imageObject.image, section, imageType))
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
