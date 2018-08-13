/**
 * QuickView Component - Created by cazarez on 08/02/18.
 */
import * as React from 'react'

import { compose, graphql } from 'react-apollo'
import QuickViewSlider from '../QuickViewSlider'
import PriceQuantity from '../../components/PriceQuantity'
import Ratings from '../Ratings'
import get from 'lodash/get'
import messages from './messages'
import {
  AvailablePrices,
  Container,
  CloseIcon,
  Title,
  StyledRow,
  PriceQuantityRow,
  FullDetails,
  DetailsList,
  DetailsListItem,
  ArrowRight,
  Loading
} from './styledComponents'
import Modal from 'antd/lib/modal'
import Col from 'antd/lib/col'
import Spin from 'antd/lib/spin'

import closeIcon from '../../assets/cancel-button.svg'
import ProductInfo from '../../components/ProductInfo'
import { QueryProps, Product } from '../../types/common'
import { QuickViewQuery } from './data'

interface State {
  showDescription: boolean
  showDetails: boolean
  showSpecs: boolean
}

interface ProductPageTypes extends Product {
  intendedUse: string
  temperatures: string
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
  formatMessage: (messageDescriptor: any) => string
}

export class QuickView extends React.Component<Props, State> {
  state = {
    showDescription: true,
    showDetails: false,
    showSpecs: false
  }

  render() {
    const {
      open,
      handleClose,
      data,
      hideSliderButtons,
      formatMessage
    } = this.props

    const { showDescription, showDetails, showSpecs } = this.state

    const product = get(data, 'product')
    const loading = get(data, 'loading')

    if (!product) {
      return null
    }

    const {
      name,
      priceRange,
      images,
      retailMen,
      retailWomen,
      description,
      details,
      intendedUse,
      temperatures,
      materials,
      yotpoAverageScore
    } = product

    const renderPrices =
      !loading &&
      priceRange.map(
        ({ price, quantity }, index: number) =>
          index < 4 && (
            <AvailablePrices key={index}>
              <PriceQuantity {...{ index, price, quantity }} />
            </AvailablePrices>
          )
      )

    const imageSlider = loading ? (
      <Loading>
        <Spin />
      </Loading>
    ) : (
      <QuickViewSlider
        // TODO: filter by gender
        productImages={images}
        available={5}
        gotoCustomize={this.gotoCustomize}
        isRetail={(retailMen && retailWomen) || false}
        {...{ hideSliderButtons, product, formatMessage }}
      />
    )

    const productDetails = details ? details.split(',') : ['']

    const detailsList = productDetails.map((detail, key) => (
      <DetailsListItem {...{ key }}>{detail}</DetailsListItem>
    ))

    const productInfo = (
      <div>
        <ProductInfo
          id="Description"
          title={formatMessage(messages.descriptionLabel)}
          showContent={showDescription}
          toggleView={this.toggleProductInfo}
        >
          <div>{description}</div>
        </ProductInfo>
        <ProductInfo
          id="Details"
          title={formatMessage(messages.detailsLabel)}
          showContent={showDetails}
          toggleView={this.toggleProductInfo}
        >
          <DetailsList>{detailsList}</DetailsList>
        </ProductInfo>
        <ProductInfo
          id="Specs"
          title={formatMessage(messages.specsLabel)}
          showContent={showSpecs}
          toggleView={this.toggleProductInfo}
        >
          <p>
            {intendedUse &&
              `${formatMessage(messages.intendedUseLabel)}: ${intendedUse}`}
          </p>
          <p>
            {temperatures &&
              `${formatMessage(messages.temperaturesLabel)}: ${temperatures}`}
          </p>
          <p>
            {materials &&
              `${formatMessage(messages.materialsLabel)}: ${materials}`}
          </p>
        </ProductInfo>
      </div>
    )

    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={false}
          width={'auto'}
          destroyOnClose={true}
          afterClose={this.resetState}
          style={{ maxWidth: 800 }}
        >
          <CloseIcon src={closeIcon} onClick={handleClose} />
          <StyledRow>
            <Col span={12}>
              {imageSlider}
              {!hideSliderButtons && (
                <FullDetails>
                  <div onClick={this.gotoProductPage}>
                    {formatMessage(messages.fullDetails)}
                  </div>
                  <ArrowRight />
                </FullDetails>
              )}
            </Col>
            <Col span={12}>
              <Title>{name}</Title>
              <PriceQuantityRow>{renderPrices}</PriceQuantityRow>
              <Ratings
                stars={5}
                starDimension={'15px'}
                rating={get(yotpoAverageScore, 'averageScore', 0)}
                totalReviews={get(yotpoAverageScore, 'total', 0)}
              />
              {productInfo}
            </Col>
          </StyledRow>
        </Modal>
      </Container>
    )
  }

  toggleProductInfo = (id: string) => {
    this.resetState(true)
    const stateValue = this.state[`show${id}`]
    this.setState({ [`show${id}`]: !stateValue } as any)
  }

  resetState = (all = false) => {
    this.setState({
      showDescription: !all,
      showDetails: false,
      showSpecs: false
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
