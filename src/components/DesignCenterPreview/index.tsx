/**
 * DesignCenterPreview Component - Created by david on 09/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'antd/lib/button'
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
import quickView from '../../assets/quickview.svg'

interface Props {
  swipingView: boolean
  colors: string[]
  currentTab: number
  loadingModel: boolean
  onPressQuickView: () => void
  onLoadModel: (loading: boolean) => void
  onSelectTab: (tab: number) => void
}

class DesignCenterPreview extends React.PureComponent<Props, {}> {
  handleOnPressEdit = () => {
    const { onSelectTab } = this.props
    onSelectTab(2)
  }

  render() {
    const {
      colors,
      currentTab,
      swipingView,
      loadingModel,
      onPressQuickView,
      onLoadModel,
      onSelectTab
    } = this.props
    return (
      <Container>
        <ButtonsContainer>
          <Row>
            <Model>{'TOUR'}</Model>
            <QuickView onClick={onPressQuickView} src={quickView} />
          </Row>
          <ButtonWrapper>
            <Button type="primary">
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
              loadingModel
            }}
          />
        ) : null}
      </Container>
    )
  }
}

export default DesignCenterPreview
