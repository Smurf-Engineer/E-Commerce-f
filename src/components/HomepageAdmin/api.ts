/**
 * API REST Calls actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'
import { setUrlImage, setLoadingAction } from './actions'

export const uploadFileAction = (
  file: any,
  section: string,
  imageType: string
) => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoadingAction(imageType, true))
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
      dispatch(setLoadingAction(imageType, false))
      return dispatch(setUrlImage(imageObject.image, section, imageType))
    } catch (e) {
      console.log('hubo un error')
      message.error(e.message)
      return false
    }
  }
}
