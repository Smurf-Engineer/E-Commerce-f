/**
 * MyFiles Component - Created by miguelcanobbio on 25/07/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import * as MyFilesActions from './actions'
import messages from './messages'
import {
  Container,
  Message,
  Subtitle,
  EmptyContainer,
  EmptyMessage,
  VerticalDivider
} from './styledComponents'
import { Palette } from '../../types/common'
import PalettesList from './PalettesList'

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

  onCancelDeletePalette = () => {
    const { hideDeleteImageConfirmAction } = this.props
    hideDeleteImageConfirmAction()
  }

  handleOnShowDeleteImageModal = (index: number) => {
    const { showDeletePaletteConfirmAction } = this.props
    showDeletePaletteConfirmAction(index)
  }

  onCancelDeleteImage = () => {
    const { hideDeleteImageConfirmAction } = this.props
    hideDeleteImageConfirmAction()
  }

  render() {
    const { formatMessage, palettes } = this.props
    console.log(palettes, 'palettes')
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
        <EmptyContainer>
          <EmptyMessage>{formatMessage(messages.emptyImages)}</EmptyMessage>
        </EmptyContainer>
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
