/**
 * ProductDetail Screen - Created by cazarez on 12/03/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import Breadcrumb from 'antd/lib/breadcrumb'
import Button from 'antd/lib/button'
import { ReducersObject } from '../../store/rootReducer'
import * as productDetailActions from './actions'
import messages from './messages'
import { GetProductsByIdQuery } from './data'
import {
  Container,
  Content,
  Title,
  Subtitle,
  StyledBreadCrumb,
  ImagePreview,
  ProductData,
  AvailablePrices,
  RenderRow,
  Description,
  ButtonsRow,
  StyledButton
} from './styledComponents'
import Ratings from '../../components/Ratings'
import Layout from '../../components/MainLayout'
import PriceQuantity from '../../components/PriceQuantity'
import ProductInfo from '../../components/ProductInfo'
import ImagesGrid from '../../components/ImagesGrid'
import { Product, QueryProps } from '../../types/common'

const { Item } = Breadcrumb

interface ProductTypes extends Product {
  intendedUse: string
  temperatures: string
  materials: string
  match: any
}

interface Data extends QueryProps {
  product: ProductTypes
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
}

interface StateProps {
  showDetails: boolean
  showSpecs: boolean
}

export class ProductDetail extends React.Component<Props, StateProps> {
  state = {
    showDetails: true,
    showSpecs: true
  }

  render() {
    const {
      intl,
      history,
      data: { product },
      match: { params: { id: productId } }
    } = this.props
    const { formatMessage } = intl
    const { showDetails, showSpecs } = this.state

    if (!product) {
      return null
    }

    const {
      name,
      type,
      description,
      intendedUse,
      temperatures,
      materials
    } = product

    const renderPrices = product.priceRange.map((item: any, index: number) => (
      <AvailablePrices key={index}>
        <PriceQuantity price={item.price} quantity={item.quantity} />
      </AvailablePrices>
    ))

    const breadCrumb = (
      <StyledBreadCrumb>
        <Item>Men</Item>
        <Item>Cycling</Item>
        <Item>Tour</Item>
      </StyledBreadCrumb>
    )
    return (
      <Layout {...{ history, intl }}>
        {breadCrumb}
        <Container>
          <Content>
            <ImagePreview>IMAPREV</ImagePreview>
            <ProductData>
              <Title>{name}</Title>
              <Subtitle>{type.toLocaleUpperCase()}</Subtitle>
              <RenderRow>{renderPrices}</RenderRow>
              <Ratings
                stars={5}
                starDimension={'15px'}
                rating={4.5}
                totalReviews={123}
              />
              <Description>{description}</Description>
              <ButtonsRow>
                <StyledButton>
                  {formatMessage(messages.customizeLabel)}
                </StyledButton>
                <StyledButton>
                  {formatMessage(messages.buyNowLabel)}
                </StyledButton>
              </ButtonsRow>
              <ProductInfo
                id="Details"
                title={formatMessage(messages.detailsLabel)}
                showContent={showDetails}
                toggleView={this.toggleProductInfo}
              >
                {product.details}
              </ProductInfo>
              <ProductInfo
                id="Specs"
                title={formatMessage(messages.specsLabel)}
                showContent={showSpecs}
                toggleView={this.toggleProductInfo}
              >
                <p>
                  {intendedUse
                    ? `${formatMessage(
                        messages.intendedUseLabel
                      )}: ${intendedUse}`
                    : null}
                </p>
                <p>
                  {temperatures
                    ? `${formatMessage(
                        messages.temperaturesLabel
                      )}: ${temperatures}`
                    : null}
                </p>
                <p>
                  {materials
                    ? `${formatMessage(messages.materialsLabel)}: ${materials}`
                    : null}
                </p>
              </ProductInfo>
            </ProductData>
          </Content>
        </Container>
        <ImagesGrid />
      </Layout>
    )
  }

  toggleProductInfo = (id: string) => {
    const stateValue = this.state[`show${id}`]
    this.setState({ [`show${id}`]: !stateValue } as any)
  }
}

const mapStateToProps = ({ productDetail }: ReducersObject) =>
  productDetail.toJS()

type OwnProps = {
  productId?: number
  match?: any
}

const ProductDetailEnhance = compose(
  injectIntl,
  graphql<Data>(GetProductsByIdQuery, {
    options: (ownprops: OwnProps) => {
      const { match: { params: { id } } } = ownprops
      return {
        variables: {
          id: id ? id : null
        }
      }
    }
  }),
  connect(mapStateToProps, { ...productDetailActions })
)(ProductDetail)

export default ProductDetailEnhance
