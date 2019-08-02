/**
 * API REST Calls actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'
import { setMedia } from './actions'

export const uploadFile = async (
  file: File,
  id: string,
  type: string,
  key?: string
) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '')
    const formData = new FormData()
    formData.append(`${type}_${id}@${key || id}`, file)
    const response = await fetch(
      `${config.graphqlUriBase}upload/product/files`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      }
    )
    return await response.json()
  } catch (e) {
    message.error(e.message)
  }
}

export const uploadMediaAction = (event: any) => {
  return async (dispatch: any) => {
    try {
      const {
        file,
        data: { index, isMobile }
      } = event
      const response = await uploadFile(file, index, 'media')
      const { imageUri } = response
      const urlField = isMobile ? 'urlMobile' : 'url'
      dispatch(setMedia(index, urlField, imageUri))
    } catch (e) {
      message.error(e.message)
    }
  }
}
