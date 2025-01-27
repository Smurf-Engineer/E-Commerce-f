/**
 * RelatedProducts Component - Created by jorge on 10/08/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import zenscroll from 'zenscroll'
import messages from './messages'
import {
  Container,
  Title,
  Divider,
  ProductsContainer
} from './styledComponents'
import ProductThumbnail from '../ProductThumbnail'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import { Product } from '../../types/common'

interface Props {
  history: any
  dispatch: any
  title?: string
  currentCurrency: string
  products: Product[]
  phone: boolean
  formatMessage: (messageDescriptor: any) => string
}

export class RelatedProducts extends React.Component<Props, {}> {
  render() {
    const {
      products = [],
      phone,
      currentCurrency,
      formatMessage,
      title
    } = this.props

    const renderProductList = products.map((product, key) => {
      const {
        id,
        type,
        description,
        images,
        priceRange,
        isTopProduct,
        customizable,
        yotpoId,
        genderId: gender = 0,
        colors
      } = product

      const productImages = images ? images[0] : {}

      return (
        <ProductThumbnail
          {...{
            key,
            id,
            type,
            description,
            priceRange,
            isTopProduct,
            yotpoId,
            gender,
            customizable,
            currentCurrency,
            colors
          }}
          images={productImages}
          product={product}
          onPressQuickView={this.handleOnQuickView}
          onPressCustomize={this.handleOnCustomize}
          onPressThumbnail={this.handlePressThumbnail(id, yotpoId)}
          customizableLabel={formatMessage(messages.customizableLabel)}
          disableSlider={phone}
          labelButton={
            customizable
              ? formatMessage(messages.customize)
              : formatMessage(messages.viewFullDetailsLabel)
          }
        />
      )
    })

    return (
      <Container>
        <Title>{title || formatMessage(messages.title)}</Title>
        <Divider />
        <ProductsContainer>{renderProductList}</ProductsContainer>
      </Container>
    )
  }
  handlePressThumbnail = (id: number, yotpoId: string) => () => {
    const { history } = this.props
    history.push(`/product?id=${id}&modelId=${yotpoId}`)
    zenscroll.toY(0, 0)
  }

  handleOnCustomize = (id: string) => {
    const { history } = this.props
    history.push(`/design-center?id=${id}`)
  }

  handleOnQuickView = (id: number, yotpoId: string) => {
    const { dispatch } = this.props
    dispatch(openQuickViewAction(id, yotpoId))
  }
}

const mapStateToProps = (state: any) => state.get('responsive').toJS()

const RelatedProductsEnhance = compose(connect(mapStateToProps))(
  RelatedProducts
)

export default RelatedProductsEnhance
