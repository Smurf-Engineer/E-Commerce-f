/**
 * QuickView Component - Created by cazarez on 08/02/18.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { ReducersObject } from '../../store/rootReducer'
import { compose, graphql } from 'react-apollo'
import AnimateHeight from 'react-animate-height'
import QuickViewSlider from '../QuickViewSlider'

import Ratings from '../Ratings'
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
  StyledDivider
} from './styledComponents'
import Modal from 'antd/lib/modal'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
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
  showSpecs: boolean
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
    showDetail: false,
    showSpecs: false
  }

  render() {
    const { open, title, data, handleClose } = this.props
    const { showDescription, showDetail, showSpecs } = this.state
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
              <QuickViewSlider
                productImages={data.images}
                available={data.availableCollections}
              />
              <FullDetails>
                <div>Full Details</div>
                <ArrowRight />
              </FullDetails>
            </Col>
            <Col span={12}>
              <Title>{title}</Title>
              <PriceQuantityRow>{renderPrices}</PriceQuantityRow>
              <Ratings
                stars={5}
                starDimension={'15px'}
                rating={4.5}
                totalReviews={123}
              />
              {/*TODO: Change to ProductInfo Component */}
              <ProductInfContainer>
                <ProductInfoTitle>
                  <div>Description</div>
                  <UpDownArrow
                    src={showDescription ? upArrowIcon : downArrowIcon}
                    onClick={this.showDescription}
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
                    src={showDetail ? downArrowIcon : upArrowIcon}
                    onClick={this.showDetail}
                  />
                </ProductInfoTitle>
                <StyledDivider />
                <AnimateHeight duration={500} height={showDetail ? 'auto' : 0}>
                  <DetailsContent
                    dangerouslySetInnerHTML={{ __html: data.details }}
                  />
                </AnimateHeight>
              </ProductInfContainer>
              <ProductInfContainer>
                <ProductInfoTitle>
                  <div>Specs</div>
                  <UpDownArrow
                    src={showSpecs ? downArrowIcon : upArrowIcon}
                    onClick={this.showSpecs}
                  />
                </ProductInfoTitle>
                <StyledDivider />
                <AnimateHeight duration={500} height={showSpecs ? 'auto' : 0}>
                  <DescriptionContent
                    dangerouslySetInnerHTML={{ __html: data.productSpecs }}
                  />
                </AnimateHeight>
              </ProductInfContainer>
            </Col>
          </StyledRow>
        </Modal>
      </Container>
    )
  }

  showDescription = () => {
    const { showDescription, showDetail, showSpecs } = this.state
    this.setState({
      showDescription: true,
      showDetail: false,
      showSpecs: false
    })
  }
  showDetail = () => {
    const { showDescription, showDetail, showSpecs } = this.state
    this.setState({
      showDescription: false,
      showDetail: true,
      showSpecs: false
    })
  }
  showSpecs = () => {
    const { showDescription, showDetail, showSpecs } = this.state
    this.setState({
      showDescription: false,
      showDetail: false,
      showSpecs: true
    })
  }
}

const QuickViewEnhance = compose()(QuickView)
// graphql<Data>(QuickViewQuery),

export default QuickViewEnhance
