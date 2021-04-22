import message from 'antd/lib/message'
import config from '../../config/index'
import { setUploadingFileAction, setFileAction } from './actions'
import { SELECTED_FILES } from './constants'

export const uploadFileAction = (file: File) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingFileAction(true))
      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(`${config.graphqlUriBase}upload/proDesignFile`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      })
      const imageObject = await response.json()
      dispatch(setUploadingFileAction(false))
      return dispatch(setFileAction(imageObject, SELECTED_FILES))
    } catch (e) {
      message.error(e.message)
      dispatch(setUploadingFileAction(false))
      return false
    }
  }
}
