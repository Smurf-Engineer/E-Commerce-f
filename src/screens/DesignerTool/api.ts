/**
 * API REST Calls actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'
import reverse from 'lodash/reverse'
import drop from 'lodash/drop'
import {
  setUploadingAction,
  setUploadingSuccess,
  setUploadingDesignSuccess
} from './actions'

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
        formData.append('config', files[3])

        const areas = reverse(files.slice(4, files.length))

        areas.forEach((file: any, index: number) =>
          formData.append(`colorBlock${index + 1}`, file as any)
        )

        const response = await fetch(`${config.graphqlUriBase}upload/model`, {
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
      console.log('---------------------------')
      console.log(e)
      console.log('---------------------------')
      dispatch(setUploadingAction(false))
      message.error(e.message)
    }
  }
}

export const uploadDesignAction = (files: any) => {
  return async (dispatch: any) => {
    try {
      if (files.length > 3) {
        dispatch(setUploadingAction(true))

        const user = JSON.parse(localStorage.getItem('user') || '')
        const formData = new FormData()

        formData.append('config', files[0])

        const modelFiles = drop(files)

        const areas = reverse(modelFiles)

        areas.forEach((file: any, index: number) =>
          formData.append(`colorBlock${index + 1}`, file as any)
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
