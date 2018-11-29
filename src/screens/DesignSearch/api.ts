import { UserType } from '../../types/common'
import config from '../../config'
import message from 'antd/lib/message'
import { uploadFileSuccessAction, setUploadingAction } from './actions'

export const downloadFile = async (user: UserType, code: string) => {
  try {
    const fileResponse = await fetch(
      `${config.graphqlUriBase}design-files?designCode=${code}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
    )
    if (fileResponse.ok) {
      const blobFile = await fileResponse.blob()
      return Promise.resolve(blobFile)
    }
    throw 'Unknown Error'
  } catch (e) {
    return Promise.reject(e)
  }
}

export const uploadProDesign = (file: any, code: string) => {
  console.log(code)
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingAction(true))
      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()

      formData.append('file', file)
      const response = await fetch(
        `${config.graphqlUriBase}upload/pro-design/file/${code}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: formData
        }
      )
      const data = await response.json()
      dispatch(uploadFileSuccessAction(data))
    } catch (e) {
      dispatch(setUploadingAction(false))
      message.error(e.message)
    }
  }
}
