/**
 * API REST Calls actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'
import { setUploadingAction, setUploadingSuccess } from './actions'

export const uploadFilesAction = (files: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingAction(true))

      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()
      files.forEach((file: any, index: number) =>
        formData.append(`file-${index}`, file as any)
      )

      const response = await fetch(`${config.graphqlUriBase}upload3dModel`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      })

      const responseJson = await response.json()
      const modelConfig: any = {}

      // TODO: Do this code more dynamic
      modelConfig.obj = responseJson[0]
      modelConfig.mtl = responseJson[1]
      modelConfig.bumpMap = responseJson[2]
      modelConfig.areas = responseJson.splice(3, 8)

      dispatch(setUploadingSuccess(modelConfig))
    } catch (e) {
      dispatch(setUploadingAction(false))
      message.error(e.message)
    }
  }
}
