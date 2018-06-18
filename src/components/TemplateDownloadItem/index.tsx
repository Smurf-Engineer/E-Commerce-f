/**
 * TemplateDownloadItem Component - Created by miguelcanobbio on 15/06/18.
 */
import * as React from 'react'
import messages from './messages'
import Icon from 'antd/lib/icon'
import {
  Container,
  StyledImage,
  Title,
  Subtitle,
  DownloadContainer,
  DownloadIcon,
  DownloadText
} from './styledComponents'

interface Props {
  imageSource: string
  name: string
  description: string
  fileUrl: string
  formatMessage: (messageDescriptor: any) => string
}

const TemplateDownloadItem = ({
  imageSource,
  name,
  description,
  fileUrl,
  formatMessage
}: Props) => {
  console.log(imageSource)
  return (
    <Container>
      <StyledImage src={imageSource} />
      <Title>{name}</Title>
      <Subtitle>{description}</Subtitle>
      <a href={fileUrl} target="_blank">
        <DownloadContainer>
          <Icon type="download" style={DownloadIcon} />
          <DownloadText>
            {formatMessage(messages.downloadTemplate)}
          </DownloadText>
        </DownloadContainer>
      </a>
    </Container>
  )
}

export default TemplateDownloadItem
