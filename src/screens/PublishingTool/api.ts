import message from 'antd/lib/message'
import config from '../../config/index'
import { setUploadingAction, setUploadingDesignSuccess } from './actions'

export const uploadDesignAction = (files: any, json: any) => {
  return async (dispatch: any) => {
    try {
      if (files.length) {
        dispatch(setUploadingAction(true))
        const user = JSON.parse(localStorage.getItem('user') || '')
        const formData = new FormData()

        formData.append('config', json)
        files.forEach((file: any, index: number) =>
          formData.append(`colorBlock${index + 1}`, file)
        )

        const response = await fetch(`${config.graphqlUriBase}upload/design`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: formData
        })

        const modelConfig = await response.json()
        dispatch(setUploadingDesignSuccess(modelConfig))
      }
    } catch (e) {
      dispatch(setUploadingAction(false))
      message.error(e.message)
    }
  }
}
