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
  onApplyImage: (base64: string) => void
  formatMessage: (messageDescriptor: any) => string
}

interface State {
  file: any
  images: string[]
}

class UploadTab extends React.PureComponent<Props, State> {
  state = {
    file: null,
    images: [] as string[]
  }
  render() {
    const { images } = this.state
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

  handleOnAddImage = (base64: string) => {
    const { onApplyImage } = this.props
    onApplyImage(base64)
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
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      this.setState(({ images }: any) => ({
        images: [...images, reader.result]
      }))
    }

    if (file) {
      reader.readAsDataURL(file)
    }

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
