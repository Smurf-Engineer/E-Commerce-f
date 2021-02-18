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
  DocIcon,
} from './styledComponents'
import { ImageFile, Message } from '../../../../types/common'
import { getFileNameFromUrl } from '../../../../utils/utilsFiles'
import { DOCX_TYPE, DOC_TYPE, PDF_TYPE, ZIP_TYPE } from '../../../../constants'

const docTypes = [DOC_TYPE, ZIP_TYPE, DOCX_TYPE, PDF_TYPE]

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
        const { fileUrl, id, name, type } = file
        const handleDeleteItem = () => deleteImage(id)
        const handleOpenRename = () => onOpenRenameModal(true, id)
        return (
          <ImageContainer key={index}>
            {docTypes.includes(type) ?
              <DocIcon type={type === ZIP_TYPE ? 'file-zip' : 'file'} /> : <Image src={fileUrl} />
            }
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
