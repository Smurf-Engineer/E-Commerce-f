/**
 * DownloadItem Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import { Container, Name } from './styledComponents'
import Icon from 'antd/lib/icon'

interface Props {
  url: string
  name: string
}

const DownloadItem = ({ name, url }: Props) => {
  return (
    <Container>
      <Name>{name}</Name>
      <a href={url}>
        <Icon type="download" />
      </a>
    </Container>
  )
}

export default DownloadItem
