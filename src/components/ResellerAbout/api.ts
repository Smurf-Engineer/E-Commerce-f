/**
 * Thunk Actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'
import { setFileAction, setUploadingAction } from './actions'
import { UploadFile } from '../../types/common'

export const uploadFileAction = (file: UploadFile) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingAction(true))

      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()

      formData.append('file', file)

      const response = await fetch(`${config.graphqlUriBase}upload/docs`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      })

      const { file: responseFile } = await response.json()
      dispatch(setFileAction(responseFile))
    } catch (e) {
      dispatch(setUploadingAction(false))
      message.error(e.message)
    }
  }
}
