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
  StyledDivider,
  Loading
} from './styledComponents'
import Modal from 'antd/lib/modal'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Button from 'antd/lib/button'
import Spin from 'antd/lib/spin'
import PriceQuantity from '../PriceQuantity'
import closeIcon from '../../assets/cancel-button.svg'
import downArrowIcon from '../../assets/downarrow.svg'
import upArrowIcon from '../../assets/uparrow.svg'
import {
  Prices,
  AnyAction,
  QueryProps,
  Product,
  ImageType
} from '../../types/common'
import { QuickViewQuery } from './data'

interface State {
  showDescription: boolean
  showDetail: boolean
  showSpecs: boolean
}

interface ProductPageTypes extends Product {
  temperature: string
  materials: string
}

interface Data extends QueryProps {
  product: ProductPageTypes
}

interface Props {
  open: boolean
  title?: string
  data: Data
  handleClose: () => void
  productId: number
  history: any
}

export class QuickView extends React.Component<Props, State> {
  state = {
    showDescription: true,
    showDetail: false,
    showSpecs: false
  }

  render() {
    const {
      open,
      handleClose,
      data,
      data: { product, loading, error }
    } = this.props
    const { showDescription, showDetail, showSpecs } = this.state

    // TODO: UNCOMMENT CODE WHEN GRAPHQL QUERY RETURNS THE QUENTITY PRICE RANGE
    /*const renderPrices = product.quantityPrice.map((item: any, index: number) => (
      <AvailablePrices key={index}>
        <PriceQuantity price={item.price} quantity={item.quantity} />
      </AvailablePrices>
    ))*/
    const imageSlider = data.loading ? (
      <Loading>
        <Spin />
      </Loading>
    ) : (
      <QuickViewSlider
        productImages={product.images}
        available={5}
        gotoCustomize={this.gotoCustomize}
      />
    )
    const title = !data.loading ? product.name : ''
    const description = !data.loading ? product.description : ''
    const details = !data.loading ? product.details : ''
    const temperature = !data.loading ? product.temperature : ''
    const materials = !data.loading ? product.materials : ''
    return (
      <Container>
        <Modal visible={open} footer={null} closable={false} width={800}>
          <CloseIcon src={closeIcon} onClick={handleClose} />
          <StyledRow>
            <Col span={12}>
              {imageSlider}
              <FullDetails>
                <div>Full Details</div>
                <ArrowRight />
              </FullDetails>
            </Col>
            <Col span={12}>
              <Title>{title}</Title>
              <PriceQuantityRow>{}</PriceQuantityRow>
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
                  <DescriptionContent>{description}</DescriptionContent>
                </AnimateHeight>
              </ProductInfContainer>
              <ProductInfContainer>
                <ProductInfoTitle>
                  <div>Details</div>
                  <UpDownArrow
                    src={showDetail ? upArrowIcon : downArrowIcon}
                    onClick={this.showDetail}
                  />
                </ProductInfoTitle>
                <StyledDivider />
                <AnimateHeight duration={500} height={showDetail ? 'auto' : 0}>
                  <DetailsContent
                    dangerouslySetInnerHTML={{ __html: details }}
                  />
                </AnimateHeight>
              </ProductInfContainer>
              <ProductInfContainer>
                <ProductInfoTitle>
                  <div>Specs</div>
                  <UpDownArrow
                    src={showSpecs ? upArrowIcon : downArrowIcon}
                    onClick={this.showSpecs}
                  />
                </ProductInfoTitle>
                <StyledDivider />
                <AnimateHeight duration={500} height={showSpecs ? 'auto' : 0}>
                  <DescriptionContent>
                    <p>{`TEMPERATURE RANGE: ${temperature}`}</p>
                    <p>{`MATERIALS: ${materials}`}</p>
                  </DescriptionContent>
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

  gotoCustomize = () => {
    const { history } = this.props
    console.log('customize')
    history.push('designer')
  }
}

type OwnProps = {
  productId?: number
}

const QuickViewEnhance = compose(
  graphql<Data>(QuickViewQuery, {
    options: ({ productId }: OwnProps) => ({
      fetchPolicy: 'network-only',
      variables: { id: productId }
    })
  })
)(QuickView)

export default QuickViewEnhance
