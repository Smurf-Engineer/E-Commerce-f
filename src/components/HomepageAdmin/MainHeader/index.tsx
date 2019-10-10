/**
 * MainHeader Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import Divider from 'antd/lib/divider'
import Uploader from './Uploader'
import Button from 'antd/lib/button'
import indexOf from 'lodash/indexOf'
import AddMoreButton from '../../Button'
import { getFileExtension } from '../../../utils/utilsFiles'
import {
  Container,
  UploadersContainer,
  Title,
  ButtonContainer
} from './styledComponents'
import messages from './messages'
import message from 'antd/lib/message'
import { ImageTypes, Sections } from '../constants'
import { VIDEO_TYPE, IMAGE_TYPE } from '../constants'

const validFileExtensions = ['.jpg', '.jpeg', '.png', '.gif']
const { MAIN_HEADER } = Sections
interface Props {
  desktopImage: string
  mainHeader: any
  loading: any
  saving: boolean
  formatMessage: (messageDescriptor: any) => string
  onUploadFile: (file: any, section: string, imageType: string) => void
  setUrl: (value: string, index: number, section: string) => void
  onSaveHeader: () => void
  handleAddMoreImages: (itemType: string) => void
  removeImage: (index: number) => void
}

class MainHeader extends React.Component<Props, {}> {
  beforeUpload = (file: any, imageType: string) => {
    const { formatMessage, onUploadFile } = this.props
    if (file) {
      const { size, name } = file
      // size is in byte(s) divided size / 1'000,000 to convert bytes to MB
      if (size / 1000000 > 20) {
        message.error(formatMessage(messages.imageSizeError))
        return false
      }
      const fileExtension = getFileExtension(name)
      if (
        indexOf(
          validFileExtensions,
          (fileExtension as String).toLowerCase()
        ) === -1
      ) {
        message.error(formatMessage(messages.imageExtensionError))
        return false
      }
      onUploadFile(file, MAIN_HEADER, imageType)
    }
    return false
  }
  uploadDesktopImage = (file: any) => {
    this.beforeUpload(file, ImageTypes.DESKTOP)
  }
  uploadMobileImage = (file: any) => {
    this.beforeUpload(file, ImageTypes.MOBILE)
  }
  handleAddImage = () => {
    const { handleAddMoreImages } = this.props
    handleAddMoreImages(IMAGE_TYPE)
  }
  handleAddVideo = () => {
    const { handleAddMoreImages } = this.props
    handleAddMoreImages(VIDEO_TYPE)
  }
  render() {
    const {
      mainHeader,
      loading,
      formatMessage,
      saving,
      onSaveHeader,
      removeImage,
      setUrl,
      onUploadFile
    } = this.props

    const uploadItems = mainHeader.map((item: any, index: number) => (
      <Uploader
        key={index}
        {...{
          item,
          formatMessage,
          index,
          loading: loading[index],
          onUploadFile,
          setUrl,
          removeImage
        }}
      />
    ))

    return (
      <Container>
        <Title>{formatMessage(messages.mainHeaderTitle)}</Title>
        <AddMoreButton
          label={formatMessage(messages.addImage)}
          onClick={this.handleAddImage}
        />
        <AddMoreButton
          label={formatMessage(messages.addVideo)}
          onClick={this.handleAddVideo}
        />
        <UploadersContainer>{uploadItems}</UploadersContainer>
        <ButtonContainer>
          <Button loading={saving} onClick={onSaveHeader}>
            {formatMessage(messages.saveChanges)}
          </Button>
        </ButtonContainer>
        <Divider />
      </Container>
    )
  }
}

export default MainHeader
