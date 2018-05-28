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
  QuickView
} from './styledComponents'
import Render3D from './Render3D'
import messages from './messages'
import ShareDesignModal from '../ShareDesignModal'
import quickView from '../../assets/quickview.svg'
import AddToTeamStore from '../AddToTeamStore'

interface Props {
  history: any
  swipingView: boolean
  colors: string[]
  currentTab: number
  loadingModel: boolean
  openShareModal: boolean
  savedDesignId: string
  productName: string
  openAddToStoreModal: boolean
  teamStoreId: string
  formatMessage: (messageDescriptor: any) => string
  onPressQuickView: () => void
  onLoadModel: (loading: boolean) => void
  onSelectTab: (tab: number) => void
  openShareModalAction: (open: boolean) => void
  openAddToTeamStoreModalAction: (open: boolean) => void
  setItemToAddAction: (teamStoreItem: {}, teamStoreId: string) => void
  addItemToStore: () => void
}

class DesignCenterPreview extends React.PureComponent<Props, {}> {
  handleOnPressEdit = () => {
    const { onSelectTab } = this.props
    onSelectTab(2)
  }

  handleOnPressShare = () => {
    const { openShareModalAction } = this.props
    openShareModalAction(true)
  }

  handleRequestCloseShare = () => {
    const { openShareModalAction } = this.props
    openShareModalAction(false)
  }

  render() {
    const {
      history,
      colors,
      currentTab,
      swipingView,
      loadingModel,
      onPressQuickView,
      onLoadModel,
      openShareModal,
      formatMessage,
      savedDesignId,
      productName,
      openAddToStoreModal,
      openAddToTeamStoreModalAction,
      setItemToAddAction,
      teamStoreId,
      addItemToStore
    } = this.props
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
        {currentTab === 3 && !swipingView ? (
          <Render3D
            {...{
              colors,
              onLoadModel,
              loadingModel,
              openAddToTeamStoreModalAction
            }}
          />
        ) : null}
        <ShareDesignModal
          open={openShareModal}
          requestClose={this.handleRequestCloseShare}
          {...{ formatMessage, savedDesignId }}
        />
        <Modal
          visible={openAddToStoreModal}
          closable={false}
          footer={null}
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
}

export default DesignCenterPreview
