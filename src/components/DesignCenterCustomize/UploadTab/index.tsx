/**
 * UploadTab Component - Created by david on 08/06/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Message from 'antd/lib/message'
import isEmpty from 'lodash/isEmpty'
import indexOf from 'lodash/indexOf'
import last from 'lodash/last'
import withLoading from '../../WithLoading'
import { compose, graphql } from 'react-apollo'
import { userfilesQuery } from './data'
import Dragger from '../../TeamDragger'
import ImageList from '../ImageList'
import messages from './messages'
import { ImageFile, QueryProps } from '../../../types/common'
import {
  Container,
  Header,
  Title,
  DraggerBottom,
  Recommendation
} from './styledComponents'

interface Data extends QueryProps {
  images: ImageFile[]
}

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
  data: Data
  onApplyImage: (base64: string) => void
  formatMessage: (messageDescriptor: any) => string
  onUploadFile: (file: any) => void
}

interface State {
  file: any
}

class UploadTab extends React.PureComponent<Props, State> {
  render() {
    const {
      images: imagesRedux,
      data: { images: imagesData }
    } = this.props
    const images = [...imagesRedux, ...imagesData]
    const dragger = <Dragger onSelectImage={this.beforeUpload} />
    return (
      <Container>
        <Header>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
        </Header>
        <ImageList onClickImage={this.handleOnAddImage} {...{ images }} />
        <DraggerBottom>{dragger}</DraggerBottom>
        <Recommendation color="#E61737">
          <FormattedMessage {...messages.recommendationTitle} />
        </Recommendation>
        <Recommendation>
          <FormattedMessage {...messages.recommendationMessage} />
        </Recommendation>
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
    return false
  }

  clearState = () => {
    this.setState({ file: null })
  }
}

const UploadTabEnhance = compose(
  graphql<Data>(userfilesQuery),
  withLoading
)(UploadTab)

export default UploadTabEnhance
