import message from 'antd/lib/message'
import config from '../../config/index'
import { setUploadingAction, setUploadingDesignSuccess } from './actions'
import { UploadFile } from '../../types/common'

export const uploadDesignAction = (
  files: UploadFile[],
  json: UploadFile,
  productId: number
) => {
  return async (dispatch: any) => {
    try {
      if (files.length) {
        dispatch(setUploadingAction(true))
        const user = JSON.parse(localStorage.getItem('user') as any)
        const token = user ? user.token : ''
        const formData = new FormData()

        formData.append('config', json)
        files.forEach((file: UploadFile, index: number) =>
          formData.append(`colorBlock${index + 1}`, file)
        )
        const response = await fetch(
          `${config.graphqlUriBase}upload/design/${productId}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: formData
          }
        )

        const modelConfig = await response.json()
        dispatch(setUploadingDesignSuccess(modelConfig))
      }
    } catch (e) {
      dispatch(setUploadingAction(false))
      message.error(e.message)
    }
  }
}
