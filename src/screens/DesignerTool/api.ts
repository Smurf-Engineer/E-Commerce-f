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

const modelFiles = [
  'obj',
  'mtl',
  'bumpMap',
  'flatlock',
  'label',
  'config',
  'branding'
]

export const uploadFilesAction = (files: any, areas: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingAction(true))

      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()

      modelFiles.forEach(file => formData.append(file, files[file]))
      areas.forEach((file: any, index: number) =>
        formData.append(`colorBlock${index + 1}`, file)
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

      console.log('-----MODEL--------------')
      console.log(modelConfig)
      console.log('---------------------------')

      // dispatch(setUploadingSuccess(modelConfig))
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

        modelFiles.forEach((file: any, index: number) =>
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

        console.log('--------MODEL-----------')
        console.log(modelConfig)
        console.log('---------------------------')

        dispatch(setUploadingDesignSuccess(modelConfig))
      }
    } catch (e) {
      dispatch(setUploadingAction(false))
      message.error(e.message)
    }
  }
}
