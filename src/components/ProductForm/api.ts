/**
 * API REST Calls actions
 */
import message from 'antd/lib/message'
import messages from './messages'
import config from '../../config/index'
import { setUploadingAction, savedProduct } from './actions'

export const uploadFilesAction = (
  formatMessage: (messageDescriptor: any) => string,
  productImages: any,
  bannerMaterials: any[],
  mediaFiles: any[]
) => {
  return async (dispatch: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '')
      const formData = new FormData()
      bannerMaterials.forEach(file => {
        if (file.toUpload) {
          formData.append(`bannerMaterial_${file.id}`, file.toUpload)
        }
      })
      mediaFiles.forEach(file => {
        if (file.toUpload) {
          formData.append(`mediaFile_${file.id}`, file.toUpload)
        }
      })
      productImages.forEach((gender: any) => {
        if (gender.toUpload) {
          Object.keys(gender.toUpload).forEach(key => {
            const file = gender.toUpload[key]
            formData.append(`picture_${gender.gender_id}@${key}`, file)
          })
        }
      })
      dispatch(setUploadingAction(true, formatMessage(messages.uploadingFiles)))
      const response = await fetch(
        `${config.graphqlUriBase}upload/product/files`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: formData
        }
      )
      const {
        bannersUploaded,
        mediaFilesUploaded,
        picturesUploaded
      } = await response.json()
      bannersUploaded.forEach((file: any) => {
        const index = bannerMaterials.findIndex(
          banner => banner.id === parseInt(file.id, 10)
        )
        if (index !== -1) {
          bannerMaterials[index].url = file.imageUri
          bannerMaterials[index].toUpload = true
        }
      })
      mediaFilesUploaded.forEach((file: any) => {
        const index = mediaFiles.findIndex(
          mediaFile => mediaFile.id === parseInt(file.id, 10)
        )
        if (index !== -1) {
          mediaFiles[index].url = file.imageUri
          mediaFiles[index].toUpload = false
        }
      })
      picturesUploaded.forEach((file: any) => {
        const parameters = file.id.split('@')
        const genderId = parseInt(parameters[0], 10)
        const name = parameters[1]
        const index = productImages.findIndex(
          (gender: any) => gender.gender_id === genderId
        )
        if (index !== -1) {
          productImages[index][name] = file.imageUri
          productImages[index].toUpload = false
        }
      })
      dispatch(
        savedProduct(
          productImages,
          mediaFiles,
          bannerMaterials,
          formatMessage(messages.savingProduct)
        )
      )
      return true
    } catch (e) {
      dispatch(setUploadingAction(false, ''))
      message.error(e.message)
    }
  }
}
