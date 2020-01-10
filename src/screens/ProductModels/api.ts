import message from 'antd/lib/message'
import config from '../../config/index'
import {
  setUploadingImage,
  setIconAction,
  setUploadingFile,
  setFileAction
} from './actions'

export const uploadImageModel = (file: File) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingImage())
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
      dispatch(setIconAction(image))
    } catch (e) {
      message.error(e.message)
    }
  }
}

export const uploadFile = (file: File, key: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingFile(key))
      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(
        `${config.graphqlUriBase}upload/adminModels`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: formData
        }
      )
      const { url } = await response.json()
      dispatch(setFileAction(key, url))
    } catch (e) {
      message.error(e.message)
    }
  }
}
