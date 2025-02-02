import isEmpty from 'lodash/isEmpty'
import message from 'antd/lib/message'
import config from '../config/index'
import { UploadFile } from '../types/common'
import last from 'lodash/last'
import { Area } from 'react-easy-crop'
import { CM_PER_INCH, DPI } from '../constants'

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
export const getFileWithExtension = (url: string) => {
  return `...${url.substring(url.length - 15)}`
}
export const isNumber = (fileName: string) => {
  const numbersRegex = /^\d+$/
  return numbersRegex.test(fileName)
}
export const isPhoneNumber = (value: string) => {
  const regex = /^[0-9 ()+-]+$/
  return regex.test(value)
}

export const getSizeInCentimeters = (pixels: number): number => {
  return Math.round((pixels * CM_PER_INCH) / DPI)
}

export const containsNumberAndLetters = (value: string) =>
  /^[0-9a-zA-Z]+$/.test(value)

export const bytesToMb = (size: number) => size / 1000000

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

export const getFileNameFromUrl = (url: string): string => {
  const completeName = url.split('/').pop() || ''
  const fileName = completeName.split('-').pop() || ''
  const name = fileName
    .split('.')
    .slice(0, -1)
    .join('.')

  return name || url
}

export const converToBytes = (file: File) => {
  if (file && file.size) {
    return (file.size / 1024 / 1024)
  }
  return 0
}

export const uploadFileAction = async (file: UploadFile) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(`${config.graphqlUriBase}upload/docs`, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    })

    const { file: responseFile } = await response.json()
    return responseFile
  } catch (e) {
    message.error(e.message)
  }
}

export const getVideoCardInfo = () => {
  const gl = document.createElement('canvas').getContext('webgl')
  if (!gl) {
    return {
      error: 'no webgl',
    }
  }
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
  return debugInfo ? {
    vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
    renderer:  gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
  } : {
    error: 'no WEBGL_debug_renderer_info',
  }
}