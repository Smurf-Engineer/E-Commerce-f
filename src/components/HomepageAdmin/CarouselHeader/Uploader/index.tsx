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
  StyledButton,
  UploadText,
  VideoPreview
} from './styledComponents'
import messages from './messages'
import message from 'antd/lib/message'
import Icon from 'antd/lib/icon'
import { getFileExtension, bytesToMb } from '../../../../utils/utilsFiles'
import { ImageTypes, VIDEO_TYPE } from '../../constants'
import { HeaderImagePlaceHolder } from '../../../../types/common'

const imageFileExtensions = ['.jpg', '.jpeg', '.png', '.gif']
const videoFileExtensions = ['.mp4']

interface Props {
  item: HeaderImagePlaceHolder
  loading: boolean
  index: number
  section: string
  formatMessage: (messageDescriptor: any, params?: any) => string
  onUploadFile: (
    file: File,
    section: string,
    imageType: string,
    index: number
  ) => void
  setUrl: (value: string, index: number, section: string) => void
  removeImage: (index: number, type: string, section: string) => void
}

class Uploader extends React.Component<Props, {}> {
  beforeUpload = (file: File, imageType: string) => {
    const { formatMessage, onUploadFile, index, item, section } = this.props
    const { assetType } = item
    if (file) {
      const { size, name } = file
      const sizeLimit = VIDEO_TYPE ? 50 : 20
      if (bytesToMb(size) > sizeLimit) {
        message.error(formatMessage(messages.imageSizeError))
        return false
      }
      const fileExtension = getFileExtension(name)
      const validateExtension =
        indexOf(
          assetType === VIDEO_TYPE ? videoFileExtensions : imageFileExtensions,
          (fileExtension as String).toLowerCase()
        ) === -1
      const messageToShow =
        assetType === VIDEO_TYPE
          ? messages.videoExtensionError
          : messages.imageExtensionError

      if (validateExtension) {
        message.error(formatMessage(messageToShow))
        return false
      }
      onUploadFile(file, section, imageType, index)
    }
    return false
  }
  uploadDesktopImage = (file: File) => {
    this.beforeUpload(file, ImageTypes.DESKTOP)
  }
  uploadMobileImage = (file: File) => {
    this.beforeUpload(file, ImageTypes.MOBILE)
  }
  handleOnSetUrl = (event: React.FormEvent<HTMLInputElement>) => {
    const { setUrl, index, section } = this.props
    const {
      currentTarget: { value }
    } = event
    setUrl(value, index, section)
  }
  handleRemoveImage = () => {
    const { index, removeImage, item, section } = this.props
    const { assetType } = item
    removeImage(index, assetType, section)
  }
  render() {
    const { item, formatMessage, loading, index } = this.props
    const { url, assetType } = item
    const isVideo = assetType === VIDEO_TYPE
    const uploadButton = (
      <UploadButton>
        <Icon type="upload" />
        <UploadText>
          {formatMessage(messages.clickToUpload, {
            type: assetType,
            index: index + 1
          })}
        </UploadText>
      </UploadButton>
    )
    const uploadButtonMobile = (
      <UploadButton>
        <Icon type="upload" />
        {formatMessage(messages.clickToUploadMobile, {
          index: index + 1
        })}
      </UploadButton>
    )

    const desktopView = loading[ImageTypes.DESKTOP] ? <Spin /> : uploadButton
    const mobileView = loading[ImageTypes.MOBILE] ? (
      <Spin />
    ) : (
      uploadButtonMobile
    )
    const preview = !isVideo ? (
      <ImagePreview src={item[ImageTypes.DESKTOP]} />
    ) : (
      <VideoPreview
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
        controls={true}
        disablePictureInPicture={true}
        controlsList="nofullscreen nodownload noremoteplayback"
      >
        <source src={item[ImageTypes.DESKTOP]} type="video/mp4" />
      </VideoPreview>
    )
    return (
      <Container>
        <ImagesContainer>
          <StyledUpload
            listType="picture-card"
            multiple={false}
            supportServerRender={true}
            showUploadList={false}
            beforeUpload={this.uploadDesktopImage}
            {...{ isVideo }}
          >
            {item[ImageTypes.DESKTOP] && !loading[ImageTypes.DESKTOP]
              ? preview
              : desktopView}
          </StyledUpload>
          {!isVideo && (
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
          )}
          {(item[ImageTypes.DESKTOP] || item[ImageTypes.MOBILE]) && (
            <StyledButton
              shape="circle"
              icon="delete"
              onClick={this.handleRemoveImage}
            />
          )}
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
