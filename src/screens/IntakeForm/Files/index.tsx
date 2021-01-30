import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import RenameModal from './RenameModal'
import DraggerWithLoading from '../../../components/DraggerWithLoading'
import Button from 'antd/lib/button'
import indexOf from 'lodash/indexOf'
import find from 'lodash/find'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { getFileNameFromUrl } from '../../../utils/utilsFiles'
import {
  Container,
  DraggerContainer,
  ButtonContainer,
  Icon,
  Images,
  LoginMessage,
  CustomButton,
  LoginText,
  StyledCheckbox,
  CheckboxLabel,
  AskButtons,
  AskButton
} from './styledComponents'
import LockerModal from '../../../components/AssetsModal'
import message from 'antd/lib/message'
import { getFileExtension, bytesToMb } from '../../../utils/utilsFiles'
import messages from './messages'
import { Message, ImageFile, UserType } from '../../../types/common'
import ImageList from './ImageList'

const imageFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.ai', '.eps', 'svg']

interface Props extends RouteComponentProps<any> {
  uploadingFile: boolean
  selectedFiles: ImageFile[]
  userLockerModalOpen: boolean
  user?: UserType
  lockerSelectedFiles: ImageFile[]
  isMobile?: boolean
  renameFileOpen: boolean
  fileIdToRename?: number
  newFileName: string
  renamingFile: boolean
  fileTermsAccepted: boolean
  skipFileAction: () => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  onUploadFile: (file: File) => void
  openUserLocker: (open: boolean) => void
  onOpenLogin: (open: boolean, callback?: boolean) => void
  onSelectItem: (item: ImageFile) => void
  onAddItems: () => void
  deselectLockerItem: (elementId: number) => void
  deleteImage: (id: number) => void
  onOpenRenameModal: (open: boolean, id?: number) => void
  handleOnRenameChange: (value: string) => void
  onSaveName: () => void
  setFileTerms: (checked: boolean) => void
}

export class Files extends React.Component<Props, {}> {
  state = {
    askUpload: true
  }
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
  checkFileTerms = (event: CheckboxChangeEvent) => {
    const { setFileTerms } = this.props
    const { target: { checked } } = event
    setFileTerms(checked)
  }
  openUpload = () => {
    this.setState({ askUpload: false })
  }
  skipFile = () => {
    const { skipFileAction } = this.props
    skipFileAction()
  }
  render() {
    const {
      uploadingFile,
      selectedFiles,
      userLockerModalOpen,
      user,
      lockerSelectedFiles,
      isMobile,
      renameFileOpen,
      fileIdToRename,
      newFileName,
      renamingFile,
      fileTermsAccepted,
      formatMessage,
      openUserLocker,
      onSelectItem,
      onAddItems,
      deselectLockerItem,
      deleteImage,
      onOpenRenameModal,
      handleOnRenameChange,
      onSaveName
    } = this.props
    const { askUpload } = this.state
    const handleOpenLocker = () => openUserLocker(true)
    const handleCloseLocker = () => openUserLocker(false)
    const currentFile = fileIdToRename ? find(selectedFiles, ['id', fileIdToRename]) : ''
    const fileNameToEdit = currentFile ? currentFile.name || currentFile.fileUrl : ''
    return (
      <Container>
        {user ? 
          <>
          {askUpload ? 
            <AskButtons>
              <AskButton
                dangerouslySetInnerHTML={{
                  __html: formatMessage(messages.yesUpload)
                }}
                onClick={this.openUpload}
              />
              <AskButton
                dangerouslySetInnerHTML={{
                  __html: formatMessage(messages.noUpload)
                }}
                onClick={this.skipFile}
              />
            </AskButtons> :
            <>
              <DraggerContainer>
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
              <StyledCheckbox
                  checked={fileTermsAccepted}
                  onChange={this.checkFileTerms}
                >
                <CheckboxLabel>
                  {formatMessage(messages.description)}
                </CheckboxLabel>
              </StyledCheckbox>
              <Images>
                <ImageList 
                  {...{
                    formatMessage,
                    deleteImage,
                    onOpenRenameModal,
                    selectedFiles,
                  }}
                />
              </Images>
            </>
          }
          </> :
          <LoginMessage>
            <LoginText>{formatMessage(messages.loginMessage)}</LoginText>
            <CustomButton onClick={this.handleLogin}>
              {formatMessage(messages.login)}
            </CustomButton>
          </LoginMessage>
        }
        {user && <LockerModal
          {...{
            selectedFiles,
            formatMessage,
            onAddItems,
            lockerSelectedFiles,
            isMobile
          }}
          visible={userLockerModalOpen}
          onRequestClose={handleCloseLocker}
          onSelectItem={onSelectItem}
          onUnselectItem={deselectLockerItem}
        />}
        <RenameModal
          open={renameFileOpen}
          name={fileNameToEdit ? getFileNameFromUrl(fileNameToEdit) : ''}
          onRenameChange={handleOnRenameChange}
          handleOnSaveName={onSaveName}
          loading={renamingFile}
          {...{ formatMessage, newFileName }}
          openRenameModal={onOpenRenameModal} />
      </Container>
    )
  }
}

const FilesEnhance = compose(
    withApollo
)(Files)

export default FilesEnhance
