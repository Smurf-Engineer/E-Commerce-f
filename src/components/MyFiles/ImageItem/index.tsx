/**
 * ImageItem Component - Created by miguelcanobbio on 25/07/18.
 */
import * as React from 'react'
import messages from './messages'
import { Container, Image, Bottom, Name, Delete, LowQualityIcon } from './styledComponents'
import { ImageFile } from '../../../types/common'
import LowQualityFlag from '../../../assets/warning_flag.png'

interface Props {
  image: ImageFile
  formatMessage: (messageDescriptor: any) => string
  onClickDelete: (id: number) => void
}

const ImageItem = ({
  image: { id, fileUrl, lowQuality },
  formatMessage,
  onClickDelete
}: Props) => {
  const onDelete = () => onClickDelete(id)
  const completeName = fileUrl.split('/').pop()
  const name = completeName && completeName.split('-').pop()
  return (
    <Container>
      {lowQuality && <LowQualityIcon src={LowQualityFlag} />}
      <Image src={fileUrl} />
      <Bottom>
        <Name>{name || completeName}</Name>
        <Delete onClick={onDelete}>{formatMessage(messages.delete)}</Delete>
      </Bottom>
    </Container>
  )
}

export default ImageItem
