import config from '../../config'
import {
  setDownloadingFileAction,
  setLoadingAction,
  resetDataAction
} from './actions'
import message from 'antd/lib/message'

export const downloadCsv = () => {
  return async (dispatch: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '')
      dispatch(setDownloadingFileAction(true))
      const response = await fetch(`${config.graphqlUriBase}download/csv`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      })
      const data = await response.json()
      if (data.file) {
        const responseFile = await fetch(data.file, {
          method: 'GET'
        })
        if (responseFile.ok) {
          const blobFile = await responseFile.blob()
          dispatch(setDownloadingFileAction(false))
          const url = window.URL.createObjectURL(blobFile)
          const a = document.createElement('a')
          a.href = url
          a.download = data.filename
          a.click()
        }
      }
      dispatch(setDownloadingFileAction(false))
    } catch (e) {
      dispatch(setDownloadingFileAction(false))
      message.error('Oops! Something went wrong')
    }
  }
}

export const uploadCsv = (file: File) => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoadingAction(true))
      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(`${config.graphqlUriBase}upload/internals`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      })
      const res = await response.text()
      if (response.ok) {
        message.success(res)
      } else {
        message.warning(res)
      }
      dispatch(resetDataAction())
    } catch (e) {
      message.error(e.message)
      dispatch(setLoadingAction(false))
    }
  }
}
