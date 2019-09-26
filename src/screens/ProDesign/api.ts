import config from '../../config'
import message from 'antd/lib/message'
import { uploadFileSuccessAction, setUploadingAction } from './actions'

export const uploadProDesign = (file: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingAction(true))
      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()
      formData.append('file', file, `${'ad'}-output.png`)
      const response = await fetch(
        `${config.graphqlUriBase}upload/pro-design/file/${'ad'}`,
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
      console.log(data)
      dispatch(uploadFileSuccessAction(data))
      message.success('Your file has been successfully uploaded!')
      dispatch(setUploadingAction(false))
    } catch (e) {
      dispatch(setUploadingAction(false))
      message.error(e.message)
    }
  }
}
