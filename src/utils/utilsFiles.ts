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
