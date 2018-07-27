/**
 * ImageItem Component - Created by miguelcanobbio on 25/07/18.
 */
import * as React from 'react'
import messages from './messages'
import { Container, Image, Bottom, Name, Delete } from './styledComponents'
import { ImageFile } from '../../../types/common'

interface Props {
  image: ImageFile
  formatMessage: (messageDescriptor: any) => string
  onClickDelete: (id: number) => void
}

const ImageItem = ({
  image: { id, fileUrl },
  formatMessage,
  onClickDelete
}: Props) => {
  const onDelete = () => onClickDelete(id)
  const name = fileUrl.split('/').pop()
  return (
    <Container>
      <Image src={fileUrl} />
      <Bottom>
        <Name>{name}</Name>
        <Delete onClick={onDelete}>{formatMessage(messages.delete)}</Delete>
      </Bottom>
    </Container>
  )
}

export default ImageItem
