/**
 * DownloadItem Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import { Container, Name, Icon } from './styledComponents'

interface Props {
  url: string
  name?: string
}

const DownloadItem = ({ name, url = '' }: Props) => {
  const completeName = String(url.split('/').pop())
  const fileName = name || completeName
  return (
    <Container>
      <Name>{fileName}</Name>
      <a href={url} download={name} target="_blank">
        <Icon type="download" />
      </a>
    </Container>
  )
}

export default DownloadItem
