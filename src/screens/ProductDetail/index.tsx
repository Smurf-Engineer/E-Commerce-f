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
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import { ReducersObject } from '../../store/rootReducer'
import * as productDetailActions from './actions'
import messages from './messages'
import { GetProductsByIdQuery } from './data'
import {
  Container,
  Title,
  Subtitle,
  StyledBreadCrumb,
  ImagePreview,
  ProductData,
  AvailablePrices,
  RenderRow
} from './styledComponents'
import Ratings from '../../components/Ratings'
import Layout from '../../components/MainLayout'
import PriceQuantity from '../../components/PriceQuantity'
import { Product, QueryProps } from '../../types/common'

const { Item } = Breadcrumb

interface Data extends QueryProps {
  product: Product
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
}

export class ProductDetail extends React.Component<Props, {}> {
  render() {
    const { intl, history, data: { product } } = this.props
    // const { name, type } = product
    console.log('PRODUCT ', product)
    if (!product) {
      return null
    }

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
          <ImagePreview>IMAPREV</ImagePreview>
          <ProductData>
            <Title>{product.name}</Title>
            <Subtitle>{product.type.toLocaleUpperCase()}</Subtitle>
            <RenderRow>{renderPrices}</RenderRow>
            <Ratings
              stars={5}
              starDimension={'15px'}
              rating={4.5}
              totalReviews={123}
            />
          </ProductData>
        </Container>
      </Layout>
    )
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
