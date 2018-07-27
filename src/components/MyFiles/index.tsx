/**
 * MyFiles Component - Created by miguelcanobbio on 25/07/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import Modal from 'antd/lib/modal/Modal'
import { List } from 'immutable'
import * as MyFilesActions from './actions'
import messages from './messages'
import {
  Container,
  Message,
  Subtitle,
  VerticalDivider,
  ModalMessage
} from './styledComponents'
import { Palette } from '../../types/common'
import PalettesList from './PalettesList'
import ModalTitle from '../ModalTitle'
import ModalFooter from '../ModalFooter'
import ImagesList from './ImagesList'

interface Props {
  history: any
  palettes: Palette[]
  indexImageToDelete: number
  indexPaletteToDelete: number
  showDeletePaletteConfirm: boolean
  showDeleteImageConfirm: boolean
  deleteLoading: boolean
  formatMessage: (messageDescriptor: any) => string
  // Redux Actions
  showDeletePaletteConfirmAction: (index: number) => void
  hideDeletePaletteConfirmAction: () => void
  showDeleteImageConfirmAction: (index: number) => void
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

  hideDeletePaletteModal = () => {
    const { hideDeletePaletteConfirmAction } = this.props
    hideDeletePaletteConfirmAction()
  }

  handleOnShowDeleteImageModal = (id: number) => {
    const { showDeleteImageConfirmAction } = this.props
    showDeleteImageConfirmAction(id)
  }

  hideDeleteImageModal = () => {
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
      this.hideDeletePaletteModal()
    }
  }

  render() {
    const { formatMessage, palettes, showDeletePaletteConfirm } = this.props
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
          onClickDelete={this.handleOnShowDeleteImageModal}
        />
        <Modal
          visible={showDeletePaletteConfirm}
          title={<ModalTitle title={formatMessage(messages.modalTitle)} />}
          footer={
            <ModalFooter
              onOk={this.onDeletePalette}
              onCancel={this.hideDeletePaletteModal}
              {...{ formatMessage }}
            />
          }
          closable={false}
          maskClosable={false}
          destroyOnClose={true}
        >
          <ModalMessage>{formatMessage(messages.paletteMessage)}</ModalMessage>
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('myFiles').toJS()

const MyFilesEnhance = compose(
  connect(
    mapStateToProps,
    { ...MyFilesActions }
  )
)(MyFiles)

export default MyFilesEnhance
