import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import DraggerWithLoading from '../../../components/DraggerWithLoading'
import Button from 'antd/lib/button'
import indexOf from 'lodash/indexOf'
import { getFileNameFromUrl } from '../../../utils/utilsFiles'
import {
  Container,
  DraggerContainer,
  ButtonContainer,
  Icon,
  Description,
  Images,
  Image,
  ImageContainer,
  LoginMessage,
  CustomButton,
  LoginText,
  DeleteButton,
  ImageText
} from './styledComponents'
import LockerModal from '../../../components/AssetsModal'
import message from 'antd/lib/message'
import { getFileExtension, bytesToMb } from '../../../utils/utilsFiles'
import messages from './messages'
import { Message, ImageFile, UserType } from '../../../types/common'

const imageFileExtensions = ['.jpg', '.jpeg', '.png', '.gif']

interface Props extends RouteComponentProps<any> {
  uploadingFile: boolean
  selectedFiles: ImageFile[]
  userLockerModalOpen: boolean
  user?: UserType
  lockerSelectedFiles: ImageFile[]
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  onUploadFile: (file: File) => void
  openUserLocker: (open: boolean) => void
  onOpenLogin: (open: boolean, callback?: boolean) => void
  onSelectItem: (item: ImageFile) => void
  onAddItems: () => void
  deselectLockerItem: (elementId: number) => void
  deleteImage: (id: number) => void
}

export class Files extends React.Component<Props, {}> {
  beforeUpload = (file: File) => {
    const { formatMessage, onUploadFile } = this.props
    if (file) {
      const { size, name } = file
      if (bytesToMb(size) > 20) {
        message.error(formatMessage(messages.imageSizeError))
        return false
      }
      const fileExtension = getFileExtension(name)
      const validateExtension =
        indexOf(imageFileExtensions, (fileExtension as String).toLowerCase()) === -1

      if (validateExtension) {
        message.error(formatMessage(messages.imageExtensionError))
        return false
      }
      onUploadFile(file)
    }
    return false
  }
  handleLogin = () => {
    const { onOpenLogin } = this.props
    onOpenLogin(true)
  }
  render() {
    const {
      uploadingFile,
      selectedFiles,
      userLockerModalOpen,
      user,
      lockerSelectedFiles,
      formatMessage,
      openUserLocker,
      onSelectItem,
      onAddItems,
      deselectLockerItem,
      deleteImage
    } = this.props
    const handleOpenLocker = () => openUserLocker(true)
    const handleCloseLocker = () => openUserLocker(false)
    return (
      <Container>
        {user ? <><DraggerContainer>
          <DraggerWithLoading
            className="upload"
            loading={uploadingFile}
            onSelectImage={this.beforeUpload}
            formatMessage={formatMessage}
            galleryButton={true}
            handleOnClickGallery={handleOpenLocker}
            extensions={imageFileExtensions}
          >
            <Button>
              <ButtonContainer>
                <Icon type="upload" />
              </ButtonContainer>
            </Button>
          </DraggerWithLoading>
        </DraggerContainer>
        <Description>{formatMessage(messages.description)}</Description>
        <Images>
          {selectedFiles.map((file, index) => {
            const { fileUrl, id } = file
            const handleDeleteItem = () => deleteImage(id)
            return (<ImageContainer key={index}>
                <Image src={fileUrl} />
                <ImageText>{getFileNameFromUrl(fileUrl)}</ImageText>
                <DeleteButton onClick={handleDeleteItem}>{formatMessage(messages.delete)}</DeleteButton>
            </ImageContainer>)
          })}
        </Images></> :
        <LoginMessage>
            <LoginText>{formatMessage(messages.loginMessage)}</LoginText>
            <CustomButton onClick={this.handleLogin}>
              {formatMessage(messages.login)}
            </CustomButton>
          </LoginMessage>}
        {user && <LockerModal
          {...{
            selectedFiles,
            formatMessage,
            onAddItems,
            lockerSelectedFiles
          }}
          visible={userLockerModalOpen}
          onRequestClose={handleCloseLocker}
          onSelectItem={onSelectItem}
          onUnselectItem={deselectLockerItem}
        />}
      </Container>
    )
  }
}

const FilesEnhance = compose(
    withApollo
)(Files)

export default FilesEnhance
