/**
 * Api Actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'
import { UploadFile } from '../../types/common'

export const uploadFileAction = async (file: UploadFile) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(`${config.graphqlUriBase}upload/docs`, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    })

    const { file: responseFile } = await response.json()
    return responseFile
  } catch (e) {
    message.error(e.message)
  }
}
