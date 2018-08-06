/**
 * UploadTab Component - Created by david on 08/06/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Message from 'antd/lib/message'
import isEmpty from 'lodash/isEmpty'
import indexOf from 'lodash/indexOf'
import last from 'lodash/last'
import Dragger from '../../TeamDragger'
import ImageList from '../ImageList'
import messages from './messages'
import { ImageFile } from '../../../types/common'
import {
  Container,
  Header,
  Title,
  DraggerContainer,
  DraggerBottom
} from './styledComponents'

const validFileExtensions = [
  '.eps',
  '.pdf',
  '.ai',
  '.svg',
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.tif',
  '.tiff',
  '.bmp',
  '.psd'
]

interface Props {
  images: ImageFile[]
  onApplyImage: (base64: string) => void
  formatMessage: (messageDescriptor: any) => string
  onUploadFile: (file: any) => void
}

interface State {
  file: any
}

class UploadTab extends React.PureComponent<Props, State> {
  render() {
    const { images } = this.props
    const dragger = <Dragger onSelectImage={this.beforeUpload} />
    return (
      <Container>
        <Header>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
        </Header>
        <ImageList onClickImage={this.handleOnAddImage} {...{ images }} />
        {!!images.length ? (
          <DraggerBottom>{dragger}</DraggerBottom>
        ) : (
          <DraggerContainer>{dragger}</DraggerContainer>
        )}
      </Container>
    )
  }

  handleOnAddImage = (url: string) => {
    const { onApplyImage } = this.props
    onApplyImage(url)
  }

  getFileExtension = (fileName: string) => {
    const extensionPattern = /\.[a-zA-Z]+/g
    let extension = fileName.match(extensionPattern)
    if (!isEmpty(extension)) {
      return last(extension as RegExpMatchArray)
    }
    return ''
  }

  beforeUpload = (file: any) => {
    if (file) {
      const { formatMessage } = this.props
      const { size, name } = file
      // size is in byte(s) divided size / 1'000,000 to convert bytes to MB
      if (size / 1000000 > 20) {
        Message.error(formatMessage(messages.imageSizeError))
        return false
      }
      const fileExtension = this.getFileExtension(name)
      if (
        indexOf(
          validFileExtensions,
          (fileExtension as String).toLowerCase()
        ) === -1
      ) {
        Message.error(formatMessage(messages.imageExtensionError))
        return false
      }

      const { onUploadFile } = this.props
      onUploadFile(file)
    }

    // const reader = new FileReader()
    // reader.onloadend = () => {
    //   this.setState(({ images }: any) => ({
    //     images: [...images, reader.result]
    //   }))
    // }

    return false
  }

  clearState = () => {
    this.setState({
      file: null,
      images: []
    })
  }
}

export default UploadTab
