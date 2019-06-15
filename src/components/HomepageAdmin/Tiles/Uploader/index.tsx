/**
 * Uploader Component - Created by eduardoquintero on 13/06/19.
 */
import * as React from 'react'
import Spin from 'antd/lib/spin'
import indexOf from 'lodash/indexOf'
import {
  Container,
  UploadButton,
  StyledUpload,
  ImagePreview,
  StyledInput,
  ImagesContainer
} from './styledComponents'
import messages from './messages'
import message from 'antd/lib/message'
import Icon from 'antd/lib/icon'
import { getFileExtension } from '../../../../utils/utilsFiles'

const validFileExtensions = ['.jpg', '.jpeg', '.png']
interface Props {
  item: any
  loading: any
  index: number
  formatMessage: (messageDescriptor: any, params?: any) => string
  onUploadFile: (file: any, index: number) => void
  onChangeText: (index: number, section: string, value: string) => void
}

class Uploader extends React.Component<Props, {}> {
  handleOnChangeText = (section: string, value: string) => {
    const { onChangeText, index } = this.props
    onChangeText(index, section, value)
  }
  handleOnChangeTitle = (event: any) => {
    const { value } = event.target
    this.handleOnChangeText('title', value)
  }
  handleOnChangeContentTile = (event: any) => {
    const { value } = event.target
    this.handleOnChangeText('contentTile', value)
  }
  beforeUpload = (file: any) => {
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
      onUploadFile(file, index)
    }
    return false
  }

  render() {
    const { item, formatMessage, index } = this.props
    const { loading, image, contentTile, title } = item
    const uploadButton = (
      <UploadButton>
        <Icon type="upload" />
        {formatMessage(messages.productTile, { index: index + 1 })}
      </UploadButton>
    )

    const uploadView = loading ? <Spin /> : uploadButton

    return (
      <Container>
        <ImagesContainer>
          <StyledUpload
            listType="picture-card"
            multiple={false}
            supportServerRender={true}
            showUploadList={false}
            beforeUpload={this.beforeUpload}
          >
            {image && !loading ? <ImagePreview src={image} /> : uploadView}
          </StyledUpload>
        </ImagesContainer>
        <StyledInput
          className={'margin'}
          placeholder={formatMessage(messages.title)}
          value={title}
          onChange={this.handleOnChangeTitle}
        />
        <StyledInput
          placeholder={formatMessage(messages.contentTile)}
          value={contentTile}
          onChange={this.handleOnChangeContentTile}
        />
      </Container>
    )
  }
}

export default Uploader
