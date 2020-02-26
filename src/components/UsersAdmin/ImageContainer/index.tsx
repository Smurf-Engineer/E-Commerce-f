/**
 * ImageContainer Component - Created by eduardoquintero on 21/01/20.
 */
import * as React from 'react'
import Icon from 'antd/lib/icon'
import messages from './messages'
import {
  Image,
  Container,
  FileName,
  Actions,
  Delete,
  Download,
  Link
} from './styledComponents'
import { getFileNameFromUrl } from '../../../utils/utilsFiles'
import { Message } from '../../../types/common'

interface Props {
  fileUrl: string
  id: number
  formatMessage: (messageDescriptor: Message) => string
  onDeleteImage: (id: number) => void
}

const ImageContainer = ({
  fileUrl,
  formatMessage,
  id,
  onDeleteImage
}: Props) => {
  const name = getFileNameFromUrl(fileUrl)
  const handleDelete = () => onDeleteImage(id)
  return (
    <Container>
      <Image src={fileUrl} />
      <FileName>{name}</FileName>
      <Actions>
        <Delete onClick={handleDelete}>{formatMessage(messages.delete)}</Delete>
        <Download>
          <Link href={fileUrl} download={true} target="_blank">
            <Icon type="download" />
          </Link>
        </Download>
      </Actions>
    </Container>
  )
}

export default ImageContainer
