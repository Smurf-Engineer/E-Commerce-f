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
          Authorization: `Bearers ${user.token}`
        }
      })
      if (response.ok) {
        const blobFile = await response.blob()
        dispatch(setDownloadingFileAction(false))
        return Promise.resolve(blobFile)
      }
      dispatch(setDownloadingFileAction(false))
      return
    } catch (e) {
      dispatch(setDownloadingFileAction(false))
      return e
    }
  }
}
