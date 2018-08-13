/**
 * UploadTab Component - Created by david on 08/06/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import message from 'antd/lib/message'
import Message from 'antd/lib/message'
import remove from 'lodash/remove'
import isEmpty from 'lodash/isEmpty'
import indexOf from 'lodash/indexOf'
import last from 'lodash/last'
import Spin from 'antd/lib/spin'
import withError from '../../WithError'
import { compose, graphql } from 'react-apollo'
import { userfilesQuery, deleteFileMutation } from './data'
import Dragger from '../../DraggerWithLoading'
import ImageList from '../ImageList'
import messages from './messages'
import { ImageFile, QueryProps } from '../../../types/common'
import {
  Container,
  Header,
  Title,
  DraggerBottom,
  Recommendation,
  EmptyContainer,
  LoginMessage
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
  data: Data
  images: ImageFile[]
  uploadingFile: boolean
  isUserAuthenticated: boolean
  onApplyImage: (file: ImageFile) => void
  formatMessage: (messageDescriptor: any) => string
  onUploadFile: (file: any) => void
  deleteFile: (variables: {}) => Promise<any>
}

interface State {
  file: any
}

class UploadTab extends React.PureComponent<Props, State> {
  componentWillReceiveProps(nextProps: Props) {
    const { uploadingFile: oldUploadingFile, data } = this.props
    const { uploadingFile } = nextProps
    if (!!data && uploadingFile !== oldUploadingFile && !uploadingFile) {
      data.refetch()
    }
  }
  render() {
    const { data, uploadingFile, isUserAuthenticated } = this.props

    if (!isUserAuthenticated) {
      return (
        <Container>
          <Header>
            <Title>
              <FormattedMessage {...messages.title} />
            </Title>
          </Header>
          <LoginMessage>
            <FormattedMessage {...messages.loginMessage} />
          </LoginMessage>
        </Container>
      )
    }

    if (!!data && data.networkStatus === 1) {
      return (
        <EmptyContainer>
          <Spin />
        </EmptyContainer>
      )
    }

    const { images: imagesData } = data

    const dragger = (
      <Dragger loading={uploadingFile} onSelectImage={this.beforeUpload} />
    )
    return (
      <Container>
        <Header>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
        </Header>
        <ImageList
          onClickImage={this.handleOnAddImage}
          images={imagesData}
          onClickDelete={this.handleOnDelete}
        />
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

  handleOnAddImage = (file: ImageFile) => {
    const { onApplyImage } = this.props
    onApplyImage(file)
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

  handleOnDelete = async (fileId: number) => {
    try {
      const { deleteFile } = this.props
      await deleteFile({
        variables: { fileId },
        update: (store: any) => {
          const data = store.readQuery({ query: userfilesQuery })
          const updatedImages = remove(
            data.images,
            (image: ImageFile) => image.id !== fileId
          )
          data.images = updatedImages
          store.writeQuery({ query: userfilesQuery, data })
        }
      })
    } catch (e) {
      message.error(e.message)
    }
  }

  clearState = () => {
    this.setState({ file: null })
  }
}

const UploadTabEnhance = compose(
  graphql<Data, Props>(userfilesQuery, {
    options: ({ isUserAuthenticated }) => ({
      skip: !isUserAuthenticated,
      notifyOnNetworkStatusChange: true
    })
  }),
  deleteFileMutation,
  withError
)(UploadTab)

export default UploadTabEnhance
