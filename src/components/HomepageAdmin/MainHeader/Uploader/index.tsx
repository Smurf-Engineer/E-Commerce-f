/**
 * Uploader Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import Spin from 'antd/lib/spin'
import indexOf from 'lodash/indexOf'
import {
  Container,
  UploadButton,
  StyledUpload,
  StyledUploadMobile,
  ImagePreview,
  StyledInput,
  ImagesContainer,
  InputContainer,
  StyledButton
} from './styledComponents'
import messages from './messages'
import message from 'antd/lib/message'
import Icon from 'antd/lib/icon'
import { getFileExtension } from '../../../../utils/utilsFiles'
import { ImageTypes, Sections } from '../../constants'

const validFileExtensions = ['.jpg', '.jpeg', '.png', '.gif']
const { MAIN_HEADER } = Sections
interface Props {
  item: any
  loading: any
  index: number
  formatMessage: (messageDescriptor: any, params?: any) => string
  onUploadFile: (
    file: any,
    section: string,
    imageType: string,
    index: number
  ) => void
  setUrl: (value: string, index: number) => void
  removeImage: (index: number) => void
}

class Uploader extends React.Component<Props, {}> {
  beforeUpload = (file: any, imageType: string) => {
    const { formatMessage, onUploadFile, index } = this.props
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
      onUploadFile(file, MAIN_HEADER, imageType, index)
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
    const { setUrl, index } = this.props
    setUrl(event.target.value, index)
  }
  handleRemoveImage = () => {
    const { index, removeImage } = this.props
    removeImage(index)
  }
  render() {
    const { item, formatMessage, loading, index } = this.props
    const { url } = item
    const uploadButton = (
      <UploadButton>
        <Icon type="upload" />
        {formatMessage(messages.clickToUpload, { index: index + 1 })}
      </UploadButton>
    )
    const uploadButtonMobile = (
      <UploadButton>
        <Icon type="upload" />
        {formatMessage(messages.clickToUploadMobile, { index: index + 1 })}
      </UploadButton>
    )

    const desktopView = loading[ImageTypes.DESKTOP] ? <Spin /> : uploadButton
    const mobileView = loading[ImageTypes.MOBILE] ? (
      <Spin />
    ) : (
      uploadButtonMobile
    )
    return (
      <Container>
        <ImagesContainer>
          {(item[ImageTypes.DESKTOP] || item[ImageTypes.MOBILE]) && (
            <StyledButton
              shape="circle"
              icon="delete"
              onClick={this.handleRemoveImage}
            />
          )}
          <StyledUpload
            listType="picture-card"
            multiple={false}
            supportServerRender={true}
            showUploadList={false}
            beforeUpload={this.uploadDesktopImage}
          >
            {item[ImageTypes.DESKTOP] && !loading[ImageTypes.DESKTOP] ? (
              <ImagePreview src={item[ImageTypes.DESKTOP]} />
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
            {item[ImageTypes.MOBILE] && !loading[ImageTypes.MOBILE] ? (
              <ImagePreview src={item[ImageTypes.MOBILE]} />
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
      </Container>
    )
  }
}

export default Uploader
