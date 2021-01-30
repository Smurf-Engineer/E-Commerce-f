/**
 * ImageList
 */
import * as React from 'react'
import messages from './messages'
import {
  ActionButtons,
  Container,
  Image,
  ImageText,
  ImageContainer,
  EditButton,
  DeleteButton,
} from './styledComponents'
import { ImageFile, Message } from '../../../../types/common'
import { getFileNameFromUrl } from '../../../../utils/utilsFiles'

interface Props {
  selectedFiles: ImageFile[]
  onOpenRenameModal: (open: boolean, id?: number) => void
  deleteImage: (id: number) => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

const ImageList = ({
  formatMessage,
  deleteImage,
  selectedFiles = [],
  onOpenRenameModal,
}: Props) => {
  return (
    <Container>
      {selectedFiles.map((file, index) => {
        const { fileUrl, id, name } = file
        const handleDeleteItem = () => deleteImage(id)
        const handleOpenRename = () => onOpenRenameModal(true, id)
        return (
          <ImageContainer key={index}>
            <Image src={fileUrl} />
            <ImageText>{name || getFileNameFromUrl(fileUrl)}</ImageText>
            <ActionButtons>
              <EditButton onClick={handleOpenRename}>{formatMessage(messages.edit)}</EditButton>
              <DeleteButton onClick={handleDeleteItem}>{formatMessage(messages.delete)}</DeleteButton>
            </ActionButtons>
        </ImageContainer>)
      })}
    </Container>
  )
}

export default ImageList
