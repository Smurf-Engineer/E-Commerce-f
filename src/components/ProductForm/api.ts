/**
 * API REST Calls actions
 */
import message from 'antd/lib/message'
import config from '../../config/index'
import { setValue, setUploadingAction } from './actions'

export const uploadFilesAction = (
  productImages: any[],
  productMaterials: any[],
  bannerMaterials: any[],
  mediaFiles: any[]
) => {
  return async (dispatch: any) => {
    try {
      dispatch(setUploadingAction(true))

      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()

      bannerMaterials.forEach(file => {
        if (file.toUpload) {
          formData.append(file.id, file.toUpload)
        }
      })
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
