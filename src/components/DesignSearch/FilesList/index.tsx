/**
 * FilesList Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { FilesDownload } from '../../../types/common'
import DownloadItem from '../DownloadItem'
import messages from './messages'

interface Props {
  assets: FilesDownload
}

const FilesList = ({ assets: { files, svgs } }: Props) => {
  const assetsArray = []
  for (let file of files) {
    if (file) {
      const { original, fileUrl } = file
      const url = original || fileUrl
      assetsArray.push(url)
    }
  }
  for (let svg of svgs) {
    if (svg) {
      assetsArray.push(svg.fileUrl)
    }
  }
  if (!assetsArray.length) {
    return <FormattedMessage {...messages.empty} />
  }
  const list = assetsArray.map((fileUrl, index) => (
    <DownloadItem key={index} url={fileUrl} />
  ))
  return <div>{list}</div>
}

export default FilesList
