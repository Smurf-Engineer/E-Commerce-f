/**
 * DesignCenterPreview Component - Created by david on 09/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Render3D from './Render3D'
import Button from 'antd/lib/button'
import {
  Container,
  ButtonsContainer,
  ButtonWrapper,
  Row,
  Model,
  QuickView
} from './styledComponents'
import quickView from '../../assets/quickview.svg'

interface Props {
  swipingView: boolean
  colors: string[]
  currentTab: number
  loadingModel: boolean
  onPressQuickView: () => void
  onLoadModel: (loading: boolean) => void
}

class DesignCenterPreview extends React.PureComponent<Props, {}> {
  render() {
    const {
      colors,
      currentTab,
      swipingView,
      loadingModel,
      onPressQuickView,
      onLoadModel
    } = this.props
    return (
      <Container>
        <ButtonsContainer>
          <Row>
            <Model>{'TOUR'}</Model>
            <QuickView onClick={onPressQuickView} src={quickView} />
          </Row>
          <ButtonWrapper>
            <Button type="primary">Share</Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button type="primary">Edit</Button>
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
