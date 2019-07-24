import config from '../../config'
import { setDownloadingFileAction } from './actions'

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
      return
    } catch (e) {
      dispatch(setDownloadingFileAction(false))
      return e
    }
  }
}
