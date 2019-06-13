/**
 * MainHeader Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import Divider from 'antd/lib/divider'
import Spin from 'antd/lib/spin'
import Button from 'antd/lib/button'
import indexOf from 'lodash/indexOf'
import { getFileExtension } from '../../../utils/utilsFiles'
import {
  Container,
  UploadButton,
  StyledUpload,
  StyledUploadMobile,
  ImagePreview,
  StyledInput,
  ImagesContainer,
  ButtonContainer,
  InputContainer,
  Title
} from './styledComponents'
import messages from './messages'
import message from 'antd/lib/message'
import Icon from 'antd/lib/icon'
import { ImageTypes, Sections } from '../constants'

const validFileExtensions = ['.jpg', '.jpeg', '.png', '.gif']
const { MAIN_HEADER } = Sections
interface Props {
  desktopImage: string
  mainHeader: any
  loading: any
  saving: boolean
  formatMessage: (messageDescriptor: any) => string
  onUploadFile: (file: any, section: string, imageType: string) => void
  setUrl: (value: string) => void
  onSaveHeader: () => void
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
  handleOnSetUrl = (event: any) => {
    const { setUrl } = this.props
    setUrl(event.target.value)
  }
  render() {
    const {
      mainHeader,
      loading,
      formatMessage,
      mainHeader: { url },
      onSaveHeader,
      saving
    } = this.props
    const uploadButton = (
      <UploadButton>
        <Icon type="upload" /> {formatMessage(messages.clickToUpload)}
      </UploadButton>
    )
    const desktopView = loading[ImageTypes.DESKTOP] ? <Spin /> : uploadButton
    const mobileView = loading[ImageTypes.MOBILE] ? <Spin /> : uploadButton
    return (
      <Container>
        <Title>{formatMessage(messages.mainHeaderTitle)}</Title>
        <ImagesContainer>
          <StyledUpload
            listType="picture-card"
            multiple={false}
            supportServerRender={true}
            showUploadList={false}
            beforeUpload={this.uploadDesktopImage}
          >
            {mainHeader[ImageTypes.DESKTOP] && !loading[ImageTypes.DESKTOP] ? (
              <ImagePreview src={mainHeader[ImageTypes.DESKTOP]} />
            ) : (
              desktopView
            )}
          </StyledUpload>
          <StyledUploadMobile
            listType="picture-card"
            multiple={false}
            supportServerRender={true}
            showUploadList={false}
            beforeUpload={this.uploadMobileImage}
          >
            {mainHeader[ImageTypes.MOBILE] && !loading[ImageTypes.MOBILE] ? (
              <ImagePreview src={mainHeader[ImageTypes.MOBILE]} />
            ) : (
              mobileView
            )}
          </StyledUploadMobile>
        </ImagesContainer>
        <InputContainer>
          {formatMessage(messages.jakrooUrl)}
          <StyledInput
            placeholder={formatMessage(messages.destinationUrl)}
            value={url}
            onChange={this.handleOnSetUrl}
          />
        </InputContainer>
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
