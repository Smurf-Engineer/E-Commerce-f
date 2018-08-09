/**
 * Thunk Actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'
import { uploadFileSuccessAction, setUploadingAction } from './actions'

export const uploadFileAction = (file: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingAction(true))

      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()

      formData.append('file', file)

      const response = await fetch(`${config.graphqlUriBase}upload/file`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      })

      const data = await response.json()
      dispatch(uploadFileSuccessAction(data))
    } catch (e) {
      dispatch(setUploadingAction(false))
      message.error(e.message)
    }
  }
}
