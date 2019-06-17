import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'

export const getFileExtension = (fileName: string) => {
  const extensionPattern = /\.[a-zA-Z]+/g
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
