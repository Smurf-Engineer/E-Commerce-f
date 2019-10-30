import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'
import { Area } from 'react-easy-crop'

export const getFileExtension = (fileName: string) => {
  const extensionPattern = /\.[a-zA-Z0-9]+/g
  let extension = fileName.match(extensionPattern)
  if (!isEmpty(extension)) {
    return last(extension as RegExpMatchArray)
  }
  return ''
}
export const getFileName = (url: string) => {
  return url.substring(url.lastIndexOf('/') + 1).split('.')[0]
}
export const isNumber = (fileName: string) => {
  const numbersRegex = /^\d+$/
  return numbersRegex.test(fileName)
}
export const isPhoneNumber = (value: string) => {
  const regex = /^[0-9 ()+-]+$/
  return regex.test(value)
}
export const containsNumberAndLetters = (value: string) =>
  /^[0-9a-zA-Z]+$/.test(value)

export const containSpaces = (value: string) => /\s/.test(value)

const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 */
export default async function getCroppedImg(imageSrc: any, pixelCrop: Area) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      resolve(file)
      // tslint:disable-next-line: align
    }, 'image/jpeg')
  })
}
