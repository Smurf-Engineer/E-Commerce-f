/**
 * API REST Calls actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'
import {
  setUploadingAction,
  setUploadingSuccess,
  setUploadingDesignSuccess,
  setUploadingColorsAction,
  setUploadSymbolSuccessAction,
  setUploadingSymbolAction
} from './actions'

const modelFiles = ['obj', 'mtl', 'bumpMap', 'label', 'config', 'branding']

const FLATLOCK = 'flatlock'

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

export const uploadThemeImage = async (file: any) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '')
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(`${config.graphqlUriBase}upload/adminImage`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: formData
    })
    const image = await response.json()
    return image
  } catch (e) {
    message.error(e.message)
    return false
  }
}

export const onUploadColorsListAction = (file: any, type: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingColorsAction(type, true))

      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()

      formData.append(type, file)

      const response = await fetch(`${config.graphqlUriBase}upload/colorList`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      })
      const responseObject = await response.json()
      if (response.status !== 200) {
        throw responseObject
      }
      message.success('File uploaded')
      dispatch(setUploadingColorsAction(type, false))
      return responseObject
    } catch (e) {
      dispatch(setUploadingColorsAction(type, false))
      message.error(e.message)
      return false
    }
  }
}

export const uploadSymbolAction = (file: any) => {
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
      dispatch(setUploadSymbolSuccessAction(data))
      message.success('Your file has been successfully uploaded!')
      dispatch(setUploadingSymbolAction(false))
    } catch (e) {
      dispatch(setUploadingSymbolAction(false))
      message.error(e.message)
    }
  }
}
