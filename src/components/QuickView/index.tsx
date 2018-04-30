/**
 * QuickView Component - Created by cazarez on 08/02/18.
 */
import * as React from 'react'

import { compose, graphql } from 'react-apollo'
import AnimateHeight from 'react-animate-height'
import QuickViewSlider from '../QuickViewSlider'
import PriceQuantity from '../../components/PriceQuantity'
import Ratings from '../Ratings'
import get from 'lodash/get'
import {
  AvailablePrices,
  Container,
  CloseIcon,
  Title,
  StyledRow,
  PriceQuantityRow,
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

import Spin from 'antd/lib/spin'

import closeIcon from '../../assets/cancel-button.svg'
import downArrowIcon from '../../assets/downarrow.svg'
import upArrowIcon from '../../assets/uparrow.svg'
import { QueryProps, Product, ImageType } from '../../types/common'
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
  yotpoId: string
  history: any
  hideSliderButtons?: boolean
}

export class QuickView extends React.Component<Props, State> {
  state = {
    showDescription: true,
    showDetail: false,
    showSpecs: false
  }

  render() {
    const { open, handleClose, data, hideSliderButtons } = this.props
    const { showDescription, showDetail, showSpecs } = this.state

    let product = {} as ProductPageTypes
    let loading = true

    if (data) {
      product = data.product
      loading = data.loading || false
    }

    if (!product) {
      return null
    }

    const renderPrices = loading ? (
      <div />
    ) : (
      product.priceRange.map((item: any, index: number) => (
        <AvailablePrices key={index}>
          <PriceQuantity
            price={item.price}
            quantity={item.quantity}
            {...{ index }}
          />
        </AvailablePrices>
      ))
    )
    const imageSlider = loading ? (
      <Loading>
        <Spin />
      </Loading>
    ) : (
      <QuickViewSlider
        // TODO: filter by gender
        productImages={product ? product.images : ([] as ImageType[])}
        available={5}
        gotoCustomize={this.gotoCustomize}
        isRetail={(product.retailMen && product.retailWomen) || false}
        {...{ hideSliderButtons }}
      />
    )

    const title = loading || !product ? '' : product.name
    const description = loading || !product ? '' : product.description
    const details = loading || !product ? '' : product.details
    const temperature = loading || !product ? '' : product.temperature
    const materials = loading || !product ? '' : product.materials
    const reviewsScore = loading || !product ? '' : product.yotpoAverageScore

    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={false}
          width={800}
          destroyOnClose={true}
          afterClose={this.resetState}
        >
          <CloseIcon src={closeIcon} onClick={handleClose} />
          <StyledRow>
            <Col span={12}>
              {imageSlider}
              {!hideSliderButtons && (
                <FullDetails>
                  <div onClick={this.gotoProductPage}>Full Details</div>
                  <ArrowRight />
                </FullDetails>
              )}
            </Col>
            <Col span={12}>
              <Title>{title}</Title>
              <PriceQuantityRow>{renderPrices}</PriceQuantityRow>
              <Ratings
                stars={5}
                starDimension={'15px'}
                rating={get(reviewsScore, 'averageScore', 0)}
                totalReviews={get(reviewsScore, 'total', 0)}
              />
              {/*TODO: Change to ProductInfo Component */}
              <ProductInfContainer>
                <ProductInfoTitle>
                  <div>Description</div>
                  <UpDownArrow
                    src={showDescription ? upArrowIcon : downArrowIcon}
                    onClick={this.toggleDescriptionDetails}
                    id="Description"
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
                    onClick={this.toggleDescriptionDetails}
                    id="Details"
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
                    onClick={this.toggleDescriptionDetails}
                    id="Specs"
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
  resetState = () => {
    this.setState({
      showDescription: true,
      showDetail: false,
      showSpecs: false
    })
  }

  toggleDescriptionDetails = (evt: React.MouseEvent<HTMLImageElement>) => {
    const { currentTarget: { id } } = evt
    this.setState({
      showDescription: id === 'Description' ? true : false,
      showDetail: id === 'Details' ? true : false,
      showSpecs: id === 'Specs' ? true : false
    })
  }

  gotoCustomize = () => {
    const { history, handleClose, productId } = this.props
    handleClose()
    history.push(`/design-center?id=${productId}`)
  }

  gotoProductPage = () => {
    const { history, productId, yotpoId, handleClose } = this.props
    handleClose()
    history.push(`/product?id=${productId}&yotpoId=${yotpoId}`)
  }
}

type OwnProps = {
  productId?: number
}

const QuickViewEnhance = compose(
  graphql<Data>(QuickViewQuery, {
    options: ({ productId }: OwnProps) => {
      return {
        fetchPolicy: 'network-only',
        variables: { id: productId },
        skip: productId === 0
      }
    }
  })
)(QuickView)

export default QuickViewEnhance
