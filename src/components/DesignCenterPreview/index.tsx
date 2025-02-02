/**
 * DesignCenterPreview Component - Created by david on 09/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import {
  Container,
  ButtonsContainer,
  ButtonWrapper,
  Row,
  Model,
  QuickView,
  BottomButtons,
  ButtonWrapperRight,
  ButtonRight,
  Render
} from './styledComponents'
import Render3D from '../../components/Render3D'
import messages from './messages'
import {
  Product,
  SaveDesignData,
  StitchingColor,
  AccesoryColor
} from '../../types/common'
import ShareDesignModal from '../ShareDesignModal'
import quickView from '../../assets/quickview.svg'
import AddToTeamStore from '../AddToTeamStore'
import AddToCartButton from '../AddToCartButton'
import { DesignTabs } from '../../screens/DesignCenter/constants'

interface Props {
  history: any
  swipingView: boolean
  colors: string[]
  currentTab: number
  loadingModel: boolean
  openShareModal: boolean
  savedDesignId: string
  productName: string
  product: Product
  openAddToStoreModal: boolean
  teamStoreId: string
  svgOutputUrl: string
  savedDesign: SaveDesignData
  stitchingColor?: StitchingColor
  bindingColor?: AccesoryColor
  zipperColor?: AccesoryColor
  bibColor?: AccesoryColor
  canvas: string
  formatMessage: (messageDescriptor: any) => string
  onPressQuickView: () => void
  onLoadModel: (loading: boolean) => void
  editDesignAction: () => void
  openShareModalAction: (open: boolean) => void
  openAddToTeamStoreModalAction: (open: boolean) => void
  setItemToAddAction: (teamStoreItem: {}, teamStoreId: string) => void
  addItemToStore: () => void
  onAddToCart: () => void
}

class DesignCenterPreview extends React.PureComponent<Props, {}> {
  state = {
    added: false
  }
  handleOnPressEdit = () => {
    const { editDesignAction } = this.props
    editDesignAction()
  }

  handleOnPressShare = () => {
    const { openShareModalAction } = this.props
    openShareModalAction(true)
  }

  handleRequestCloseShare = () => {
    const { openShareModalAction } = this.props
    openShareModalAction(false)
  }

  handleAddToCart = () => {
    const { added } = this.state
    if (added) {
      const { history } = this.props
      history.push('/shopping-cart')
      return
    } else {
      this.setState({ added: true })
    }
    return true
  }

  render() {
    const {
      history,
      currentTab,
      swipingView,
      onPressQuickView,
      openShareModal,
      formatMessage,
      savedDesignId,
      productName,
      openAddToStoreModal,
      openAddToTeamStoreModalAction,
      setItemToAddAction,
      teamStoreId,
      addItemToStore,
      savedDesign
    } = this.props

    const itemToAdd = Object.assign({}, savedDesign, {
      itemDetails: [{ quantity: 1 }]
    })
    const { added } = this.state
    const { shortId, designName, designImage, proCertified, proDesign } = savedDesign
    return (
      <Container>
        <ButtonsContainer>
          <Row>
            <Model>{productName}</Model>
            <QuickView onClick={onPressQuickView} src={quickView} />
          </Row>
          <ButtonWrapper>
            <Button type="primary" onClick={this.handleOnPressShare}>
              <FormattedMessage {...messages.shareButton} />
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button type="primary" onClick={this.handleOnPressEdit}>
              <FormattedMessage {...messages.editButton} />
            </Button>
          </ButtonWrapper>
        </ButtonsContainer>
        {currentTab === DesignTabs.PreviewTab && !swipingView && (
          <Render>
            <Render3D designId={shortId} />
            <BottomButtons>
              <ButtonWrapper>
                <Button onClick={this.openAddToStoreModal}>
                  <FormattedMessage {...messages.addToTeam} />
                </Button>
              </ButtonWrapper>
              <ButtonWrapper secondary={added}>
                <AddToCartButton
                  orderDetails={true}
                  secondary={added}
                  label={formatMessage(messages[added ? 'viewCart' : 'addToCart'])}
                  onClick={this.handleAddToCart}
                  item={itemToAdd}
                  designId={shortId}
                  {...{ designName, designImage, proCertified, proDesign, formatMessage }}
                />
              </ButtonWrapper>
            </BottomButtons>
            <ButtonWrapperRight>
              <ButtonRight onClick={this.handleOnKeepShoping} type="primary">
                <FormattedMessage {...messages.keepShoping} />
              </ButtonRight>
            </ButtonWrapperRight>
          </Render>
        )}
        <ShareDesignModal
          open={openShareModal}
          requestClose={this.handleRequestCloseShare}
          {...{ formatMessage, savedDesignId }}
        />
        <Modal
          visible={openAddToStoreModal}
          footer={null}
          onCancel={this.closeAddToStoreModal}
          destroyOnClose={true}
          maskClosable={true}
        >
          <AddToTeamStore
            {...{
              history,
              savedDesignId,
              openAddToTeamStoreModalAction,
              setItemToAddAction,
              teamStoreId,
              addItemToStore
            }}
          />
        </Modal>
      </Container>
    )
  }

  handleOnKeepShoping = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  closeAddToStoreModal = () => {
    const { openAddToTeamStoreModalAction } = this.props
    openAddToTeamStoreModalAction(false)
  }

  openAddToStoreModal = () => {
    const { openAddToTeamStoreModalAction } = this.props
    openAddToTeamStoreModalAction(true)
  }
}

export default DesignCenterPreview
