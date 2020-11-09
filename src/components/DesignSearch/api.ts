import { UserType } from '../../types/common'
import config from '../../config'
import message from 'antd/lib/message'
import { uploadFileSuccessAction, setUploadingAction } from './actions'
import { getFileExtension } from '../../utils/utilsFiles'

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
    throw await fileResponse.text()
  } catch (e) {
    return Promise.reject(e)
  }
}

export const uploadProDesign = (file: any, code: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingAction(true))
      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()
      const { name } = file
      const extension = getFileExtension(name)
      formData.append('file', file, `${code}-output${extension || '.svg'}`)
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
      message.success('Your file has been successfully uploaded!')
      dispatch(setUploadingAction(false))
    } catch (e) {
      dispatch(setUploadingAction(false))
      message.error(e.message)
    }
  }
}
