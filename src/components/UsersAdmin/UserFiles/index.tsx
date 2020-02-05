/**
 * UserFiles Component - Created by eduardoquintero on 21/01/20.
 */
import * as React from 'react'
import messages from './messages'
import { connect } from 'react-redux'
import Spin from 'antd/lib/spin'
import Modal from 'antd/lib/modal'
import remove from 'lodash/remove'
import indexOf from 'lodash/indexOf'
import message from 'antd/lib/message'
import * as apiActions from './api'
import { userfilesQuery, deleteFileMutation } from './data'
import { compose, graphql } from 'react-apollo'
import ImageContainer from '../ImageContainer'
import Dragger from '../../DraggerWithLoading'
import {
  MessageText,
  Container,
  SpinContainer,
  ImageList
} from './styledComponents'
import { getFileExtension, bytesToMb } from '../../../utils/utilsFiles'
import { ImageFile, QueryProps, Message } from '../../../types/common'
import { UploadFile } from 'antd/lib/upload/interface'

interface Data extends QueryProps {
  userFiles: {
    images: ImageFile[]
    userName: string
  }
}

interface Props {
  userId: string
  data: Data
  images: ImageFile[]
  uploading: boolean
  formatMessage: (messageDescriptor: Message, params?: object) => string
  deleteFile: (variables: {}) => Promise<any>
  uploadFileAction: (file: UploadFile, userId: string) => void
}

const { confirm } = Modal

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

class UserFiles extends React.Component<Props> {
  handleOnDelete = async (fileId: number) => {
    const { formatMessage } = this.props
    confirm({
      title: formatMessage(messages.confirmTitle),
      content: formatMessage(messages.confirmMessage),
      onOk: async () => {
        try {
          const { deleteFile, userId } = this.props
          await deleteFile({
            variables: { fileId },
            update: (store: any) => {
              const data = store.readQuery({
                query: userfilesQuery,
                variables: { userId }
              })
              const updatedImages = remove(
                data.userFiles.images,
                (image: ImageFile) => image.id !== fileId
              )
              data.userFiles.images = updatedImages
              store.writeQuery({
                query: userfilesQuery,
                variables: { userId },
                data
              })
            }
          })
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }
  beforeUpload = async (file: UploadFile) => {
    if (file) {
      const { formatMessage, data, userId } = this.props
      const { size, name } = file

      const sizeLimit = 20
      if (bytesToMb(size) > sizeLimit) {
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

      const { uploadFileAction } = this.props
      await uploadFileAction(file, userId)
      data.refetch()
    }
    return false
  }
  render() {
    const {
      data: { userFiles },
      data,
      formatMessage,
      uploading
    } = this.props
    if (data.loading) {
      return (
        <SpinContainer>
          <Spin />
        </SpinContainer>
      )
    }
    const dragger = (
      <Dragger
        extensions={validFileExtensions}
        formatMessage={formatMessage}
        loading={uploading}
        onSelectImage={this.beforeUpload}
      />
    )
    const images = userFiles.images.map((image, index) => (
      <ImageContainer
        key={index}
        fileUrl={image.fileUrl}
        onDeleteImage={this.handleOnDelete}
        id={image.id}
        {...{ formatMessage }}
      />
    ))
    return (
      <Container>
        <MessageText>
          {!!userFiles &&
            formatMessage(messages.userFiles, {
              userName: userFiles.userName
            })}
        </MessageText>
        {dragger}
        <ImageList>{images}</ImageList>
      </Container>
    )
  }
}
const mapStateToProps = (state: any) => state.get('userFiles').toJS()

const UserFilesEnhance = compose(
  graphql<Data, Props>(userfilesQuery, {
    options: ({ userId }) => ({
      skip: !userId,
      variables: { userId }
    })
  }),
  deleteFileMutation,
  connect(mapStateToProps, { ...apiActions })
)(UserFiles)
export default UserFilesEnhance
