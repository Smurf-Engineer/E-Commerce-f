/**
 * Thunk Actions
 */
import message from 'antd/lib/message'
import { setUploadingAction } from './actions'
import { UploadFile } from 'antd/lib/upload/interface'
import config from '../../../config'

export const uploadFileAction = (file: UploadFile, userId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingAction(true))
      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()

      formData.append('file', file)

      await fetch(`${config.graphqlUriBase}upload/file/${userId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      })

      dispatch(setUploadingAction(false))
    } catch (e) {
      dispatch(setUploadingAction(false))
      message.error(e.message)
    }
  }
}
