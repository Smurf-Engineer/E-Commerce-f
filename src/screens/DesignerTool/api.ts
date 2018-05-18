/**
 * API REST Calls actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'
import { setUploadingAction, setUploadingSuccess } from './actions'

export const uploadFilesAction = (files: any) => {
  return async (dispatch: any) => {
    try {
      if (files.length > 3) {
        dispatch(setUploadingAction(true))

        const user = JSON.parse(localStorage.getItem('user') || '')
        const formData = new FormData()

        formData.append('obj', files[0])
        formData.append('mtl', files[1])
        formData.append('bumpMap', files[2])

        const areas = files.slice(3, files.length)

        areas.forEach((file: any, index: number) =>
          formData.append(`colorBlock${index + 1}`, file as any)
        )

        const response = await fetch(`${config.graphqlUriBase}upload3dModel`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: formData
        })

        const modelConfig = await response.json()

        dispatch(setUploadingSuccess(modelConfig))
      }
    } catch (e) {
      dispatch(setUploadingAction(false))
      message.error(e.message)
    }
  }
}
