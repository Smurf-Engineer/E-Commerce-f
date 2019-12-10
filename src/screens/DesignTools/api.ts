import message from 'antd/lib/message'
import {
  setUploadingColorsAction,
  setColorList,
  setUploadingAction,
  setUploadingSuccess,
  addSymbolAction,
  setUploadingSymbolAction
} from './actions'
import config from '../../config/index'
import { UploadFile } from '../../types/common'
const modelFiles = ['obj', 'mtl', 'bumpMap', 'label', 'config', 'branding']
const FLATLOCK = 'flatlock'

export const onUploadColorsList = (file: UploadFile, type: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingColorsAction(type, true))
      const reader = new FileReader()
      reader.onloadend = () => {
        const colorsResult = JSON.parse(reader.result)
        message.success('File uploaded')
        dispatch(setColorList(type, colorsResult))
      }
      reader.readAsText(file)
      return true
    } catch (e) {
      dispatch(setUploadingColorsAction(type, false))
      message.error(e.message)
      return false
    }
  }
}

export const onUploadFile = (file: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingSymbolAction(true))
      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(`${config.graphqlUriBase}upload/symbol`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      })
      const data = await response.json()
      message.success('Your file has been successfully uploaded!')
      dispatch(addSymbolAction(data.fileUrl))
    } catch (e) {
      dispatch(setUploadingSymbolAction(false))
      message.error(e.message)
    }
  }
}

export const uploadFilesAction = (files: any, areas: any, extras: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingAction(true))

      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()

      modelFiles.forEach(file => formData.append(file, files[file]))
      areas.forEach((file: any, index: number) =>
        formData.append(`colorBlock${index + 1}`, file)
      )

      const extraFiles = Object.keys(extras)
      if (extraFiles.length) {
        extraFiles.forEach(name => {
          if (name === FLATLOCK) {
            formData.append(name, extras[name])
          } else {
            formData.append(`${name}White`, extras[name].white)
            formData.append(`${name}Black`, extras[name].black)
          }
        })
      }

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
    } catch (e) {
      dispatch(setUploadingAction(false))
      message.error(e.message)
    }
  }
}
