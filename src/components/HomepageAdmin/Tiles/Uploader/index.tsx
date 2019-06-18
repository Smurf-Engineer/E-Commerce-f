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
  ImagesContainer,
  StyledButton
} from './styledComponents'
import messages from './messages'
import message from 'antd/lib/message'
import Icon from 'antd/lib/icon'
import { ProductTiles } from '../../../../types/common'
import { getFileExtension } from '../../../../utils/utilsFiles'

const validFileExtensions = ['.jpg', '.jpeg', '.png']
interface Props {
  item: ProductTiles
  loading: boolean
  index: number
  formatMessage: (messageDescriptor: any, params?: any) => string
  onUploadFile: (file: any, index: number) => void
  onChangeText: (index: number, section: string, value: string) => void
  removeImage: (index: number) => void
}

class Uploader extends React.Component<Props, {}> {
  handleOnChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target
    const { index, onChangeText } = this.props
    onChangeText(index, id, value)
  }

  handleRemoveImage = () => {
    const { index, removeImage } = this.props
    removeImage(index)
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
          {image && (
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
            beforeUpload={this.beforeUpload}
          >
            {image && !loading ? <ImagePreview src={image} /> : uploadView}
          </StyledUpload>
        </ImagesContainer>
        <StyledInput
          id={'title'}
          className={'margin'}
          placeholder={formatMessage(messages.title)}
          value={title}
          onChange={this.handleOnChangeText}
        />
        <StyledInput
          id={'contentTile'}
          placeholder={formatMessage(messages.contentTile)}
          value={contentTile}
          onChange={this.handleOnChangeText}
        />
      </Container>
    )
  }
}

export default Uploader
