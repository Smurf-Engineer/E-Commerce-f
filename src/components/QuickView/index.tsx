/**
 * QuickView Component - Created by cazarez on 08/02/18.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { ReducersObject } from '../../store/rootReducer'
import { compose, graphql } from 'react-apollo'
import AnimateHeight from 'react-animate-height'
import {
  Container,
  CloseIcon,
  Title,
  StyledRow,
  PriceQuantityRow,
  AvailablePrices,
  FullDetails,
  ProductInfContainer,
  ProductInfoTitle,
  DescriptionContent,
  DetailsContent,
  UpDownArrow,
  ArrowRight,
  StyledDivider,
  StyledButton,
  ButtonRow
} from './styledComponents'
import Modal from 'antd/lib/Modal'
import Col from 'antd/lib/Col'
import Row from 'antd/lib/Row'
import Button from 'antd/lib/button'
import PriceQuantity from '../PriceQuantity'
import closeIcon from '../../assets/cancel-button.svg'
import downArrowIcon from '../../assets/downarrow.svg'
import upArrowIcon from '../../assets/uparrow.svg'
import { Prices } from '../../types/common'
import { AnyAction } from '../../types/common'

interface State {
  showDescription: boolean
  showDetail: boolean
}

interface Props {
  open: boolean
  title: string
  data: any
  handleClose: () => void
}

class QuickView extends React.Component<Props, State> {
  public static defaultProps = {
    data: {}
  }

  state = {
    showDescription: true,
    showDetail: false
  }

  render() {
    const { open, title, data, handleClose } = this.props
    const { showDescription, showDetail } = this.state
    const renderPrices = data.quantityPrice.map((item: any, index: number) => (
      <AvailablePrices key={index}>
        <PriceQuantity price={item.price} quantity={item.quantity} />
      </AvailablePrices>
    ))
    return (
      <Container>
        <Modal visible={open} footer={null} closable={false} width={800}>
          <CloseIcon src={closeIcon} onClick={handleClose} />
          <StyledRow>
            <Col span={12}>
              <div
                style={{
                  height: 400,
                  backgroundColor: '#fff',
                  margin: '0px 20px 0px 0px',
                  border: '1px solid grey'
                }}
              />
              <ButtonRow>
                <StyledButton type="danger">CUSTOMIZE</StyledButton>
              </ButtonRow>
            </Col>
            <Col span={12}>
              <Title>{title}</Title>
              <PriceQuantityRow>{renderPrices}</PriceQuantityRow>
              <ProductInfContainer>
                <ProductInfoTitle>
                  <div>Description</div>
                  <UpDownArrow
                    src={showDescription ? upArrowIcon : downArrowIcon}
                    onClick={this.toggle}
                  />
                </ProductInfoTitle>
                <StyledDivider />
                <AnimateHeight
                  duration={500}
                  height={showDescription ? 'auto' : 0}
                >
                  <DescriptionContent>{data.description}</DescriptionContent>
                </AnimateHeight>
              </ProductInfContainer>
              <ProductInfContainer>
                <ProductInfoTitle>
                  <div>Details</div>
                  <UpDownArrow
                    src={showDetail ? upArrowIcon : downArrowIcon}
                    onClick={this.toggle}
                  />
                </ProductInfoTitle>
                <StyledDivider />
                <AnimateHeight duration={500} height={!showDetail ? 0 : 'auto'}>
                  <DetailsContent
                    dangerouslySetInnerHTML={{ __html: data.details }}
                  />
                </AnimateHeight>
              </ProductInfContainer>
            </Col>
          </StyledRow>
          <FullDetails>
            <div>Full Details</div>
            <ArrowRight />
          </FullDetails>
        </Modal>
      </Container>
    )
  }

  toggle = () => {
    const { showDescription, showDetail } = this.state
    this.setState({
      showDescription: !showDescription,
      showDetail: !showDetail
    })
    console.log('toggle')
  }

  // toggleDetail = () => {}
}

const QuickViewEnhance = compose()(QuickView)
// graphql<Data>(QuickViewQuery),

export default QuickViewEnhance
