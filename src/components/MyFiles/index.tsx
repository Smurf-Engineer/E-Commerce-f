/**
 * MyFiles Component - Created by miguelcanobbio on 25/07/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import Modal from 'antd/lib/modal/Modal'
import AntdMessage from 'antd/lib/message'
import { List } from 'immutable'
import { deleteImageMutation, imagesQuery } from './data'
import * as MyFilesActions from './actions'
import messages from './messages'
import {
  Container,
  Message,
  Subtitle,
  VerticalDivider,
  ModalMessage
} from './styledComponents'
import { Palette, ImageFile, QueryProps } from '../../types/common'
import PalettesList from './PalettesList'
import ModalTitle from '../ModalTitle'
import ModalFooter from '../ModalFooter'
import ImagesList from './ImagesList'

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
      indexPaletteToDelete,
      data: { loading, images }
    } = this.props
    console.log('---------------------------')
    console.log(palettes)
    console.log('---------------------------')
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
    { ...MyFilesActions }
  ),
  deleteImageMutation
)(MyFiles)

export default MyFilesEnhance
