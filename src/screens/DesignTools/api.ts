import message from 'antd/lib/message'
import {
  setUploadingColorsAction,
  setColorList,
  addSymbolAction,
  setUploadingSymbolAction
} from './actions'
import config from '../../config/index'
import { UploadFile } from '../../types/common'

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

export const onUploadFile = (file: UploadFile) => {
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
