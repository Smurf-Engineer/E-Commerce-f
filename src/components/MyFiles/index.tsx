/**
 * MyFiles Component - Created by miguelcanobbio on 25/07/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import Modal from 'antd/lib/modal/Modal'
import AntdMessage from 'antd/lib/message'
import message from 'antd/lib/message'
import { List } from 'immutable'
import { deleteImageMutation, imagesQuery } from './data'
import * as MyFilesActions from './actions'
import * as filesApiActions from './api'
import messages from './messages'
import {
  Container,
  Message,
  Subtitle,
  VerticalDivider,
  ModalMessage,
  DraggerBottom,
  Recommendation,
  RecommendationSection,
  ModalTitleStyled,
  WarningIcon,
  InfoBody,
  buttonStyle
} from './styledComponents'
import { Palette, ImageFile, QueryProps } from '../../types/common'
import PalettesList from './PalettesList'
import ModalTitle from '../ModalTitle'
import Dragger from '../DraggerWithLoading'
import ModalFooter from '../ModalFooter'
import ImagesList from './ImagesList'
import { RED } from '../../theme/colors'
import indexOf from 'lodash/indexOf'
import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'
import { bytesToMb } from '../../utils/utilsFiles'

const { warning } = Modal

const warningExtensions = [
  '.svg',
  '.eps',
  '.pdf',
  '.ai'
]

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

interface Data extends QueryProps {
  images: ImageFile[]
}

interface Props {
  data: Data
  history: any
  palettes: Palette[]
  idImageToDelete: number
  indexPaletteToDelete: number
  showDeleteModal: boolean
  deleteLoading: boolean
  uploading: boolean
  onUploadFile: (file: File) => void
  uploadFileAction: (file: File) => void
  formatMessage: (messageDescriptor: any) => string
  // Apollo mutations
  deleteImage: (variables: {}) => void
  // Redux Actions
  showDeletePaletteConfirmAction: (index: number) => void
  hideDeletePaletteConfirmAction: () => void
  showDeleteImageConfirmAction: (id: number) => void
  hideDeleteImageConfirmAction: () => void
  setDeleteLoadingAction: (loading: boolean) => void
  resetReducerDataAction: () => void
  setPalettesAction: (palettes: Palette[]) => void
}

class MyFiles extends React.Component<Props, {}> {
  componentWillMount() {
    const { setPalettesAction } = this.props
    let palettes: Palette[] = []
    if (typeof window !== 'undefined') {
      const palettesJson = localStorage.getItem('palettes')
      if (palettesJson) {
        palettes = JSON.parse(palettesJson)
      }
    }
    setPalettesAction(palettes)
  }

  componentWillUnmount() {
    const { resetReducerDataAction } = this.props
    resetReducerDataAction()
  }

  handleOnShowDeletePaletteModal = (index: number) => {
    const { showDeletePaletteConfirmAction } = this.props
    showDeletePaletteConfirmAction(index)
  }

  hidePaletteModal = () => {
    const { hideDeletePaletteConfirmAction } = this.props
    hideDeletePaletteConfirmAction()
  }

  handleOnShowDeleteImageModal = (id: number) => {
    const { showDeleteImageConfirmAction } = this.props
    showDeleteImageConfirmAction(id)
  }

  hideImageModal = () => {
    const { hideDeleteImageConfirmAction } = this.props
    hideDeleteImageConfirmAction()
  }

  onDeletePalette = () => {
    const { setPalettesAction, indexPaletteToDelete } = this.props
    if (typeof window !== 'undefined') {
      const palettesJson = localStorage.getItem('palettes')
      if (palettesJson) {
        const myPalettes = JSON.parse(palettesJson)
        const listOfPalettes = List.of(...myPalettes)
        const updatedList = listOfPalettes.remove(indexPaletteToDelete)
        const updatedPalettes = updatedList.toJS()
        localStorage.setItem('palettes', JSON.stringify(updatedPalettes))
        setPalettesAction(updatedPalettes)
      }
      this.hidePaletteModal()
    }
  }

  getFileExtension = (fileName: string) => {
    const extensionPattern = /\.[a-zA-Z]+/g
    let extension = fileName.match(extensionPattern)
    if (!isEmpty(extension)) {
      return last(extension as RegExpMatchArray)
    }
    return ''
  }

  uploadAction = async (file: File) => {
    const { uploadFileAction, data } = this.props
    await uploadFileAction(file)
    await data.refetch()
  }

  beforeUpload = async (file: File) => {
    if (file) {
      const { formatMessage } = this.props
      const { size, name } = file
      // size is in byte(s) divided size / 1'000,000 to convert bytes to MB
      const mbSize = bytesToMb(size)
      if (mbSize > 20) {
        message.error(formatMessage(messages.imageSizeError))
        return false
      }
      const fileExtension = this.getFileExtension(name)
      if (
        indexOf(
          validFileExtensions,
          (fileExtension as String).toLowerCase()
        ) === -1
      ) {
        message.error(formatMessage(messages.imageExtensionError))
        return false
      }
      if (warningExtensions.includes(fileExtension.toLowerCase())) {
        warning({
          title: <ModalTitleStyled>{formatMessage(messages.vectorCheck)}</ModalTitleStyled>,
          width: 494,
          okText: formatMessage(messages.gotIt),
          icon: <WarningIcon theme="filled" type="exclamation-circle" />,
          okButtonProps: {
            style: buttonStyle
          },
          content: <InfoBody>{formatMessage(messages.vectorInfo)}</InfoBody>,
          onOk: async () => await this.uploadAction(file)
        })
      } else {
        await this.uploadAction(file)
      }
    }
    return false
  }

  onDeleteImage = async () => {
    const {
      setDeleteLoadingAction,
      idImageToDelete,
      deleteImage,
      data: { refetch }
    } = this.props
    try {
      setDeleteLoadingAction(true)
      await deleteImage({
        variables: { fileId: idImageToDelete }
      })
      this.hideImageModal()
      refetch()
    } catch (e) {
      setDeleteLoadingAction(false)
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      AntdMessage.error(errorMessage, 5)
    }
  }

  render() {
    const {
      formatMessage,
      palettes,
      showDeleteModal,
      deleteLoading,
      uploading,
      indexPaletteToDelete,
      data: { loading, images }
    } = this.props
    return (
      <Container>
        <Message>{formatMessage(messages.message)}</Message>
        <Subtitle>{formatMessage(messages.myPalettes)}</Subtitle>
        <PalettesList
          onClickDelete={this.handleOnShowDeletePaletteModal}
          {...{ formatMessage, palettes }}
        />
        <VerticalDivider />
        <Subtitle>{formatMessage(messages.uploadedImages)}</Subtitle>
        <ImagesList
          {...{ formatMessage }}
          images={images || []}
          loading={!!loading}
          onClickDelete={this.handleOnShowDeleteImageModal}
          dragger={
            <DraggerBottom>
              <Dragger
                extensions={['.eps', '.ai', '.svg', '.tiff', '.pdf', '.jpg']}
                formatMessage={formatMessage}
                loading={uploading}
                onSelectImage={this.beforeUpload}
              />
              <RecommendationSection>
                <Recommendation color={RED}>
                  {formatMessage(messages.recommendationTitle)}
                </Recommendation>
                <Recommendation>
                  {formatMessage(messages.recommendationMessage)}
                </Recommendation>
              </RecommendationSection>
            </DraggerBottom>
          }
        />
        <Modal
          visible={showDeleteModal}
          title={<ModalTitle title={formatMessage(messages.modalTitle)} />}
          footer={
            <ModalFooter
              onOk={
                indexPaletteToDelete !== -1
                  ? this.onDeletePalette
                  : this.onDeleteImage
              }
              onCancel={
                indexPaletteToDelete !== -1
                  ? this.hidePaletteModal
                  : this.hideImageModal
              }
              confirmLoading={deleteLoading}
              {...{ formatMessage }}
            />
          }
          closable={false}
          maskClosable={false}
          destroyOnClose={true}
        >
          <ModalMessage>
            {formatMessage(
              indexPaletteToDelete !== -1
                ? messages.paletteMessage
                : messages.imageMessage
            )}
          </ModalMessage>
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('myFiles').toJS()

const MyFilesEnhance = compose(
  graphql(imagesQuery),
  connect(
    mapStateToProps,
    { ...MyFilesActions, ...filesApiActions }
  ),
  deleteImageMutation
)(MyFiles)

export default MyFilesEnhance
