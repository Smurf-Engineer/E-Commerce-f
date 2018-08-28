/**
 * RelatedProducts Component - Created by jorge on 10/08/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
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
  currentCurrency: string
  products: Product[]
  formatMessage: (messageDescriptor: any) => string
}

export class RelatedProducts extends React.Component<Props, {}> {
  render() {
    const { products, currentCurrency, formatMessage } = this.props

    const renderProductList = products.map((product, key) => {
      const {
        id,
        type,
        description,
        images,
        priceRange,
        isTopProduct,
        collections,
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
            collections,
            yotpoId,
            gender,
            customizable,
            currentCurrency,
            colors
          }}
          images={productImages}
          onPressQuickView={this.handleOnQuickView}
          onPressCustomize={this.handleOnCustomize}
          customizableLabel={formatMessage(messages.customizableLabel)}
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
        <Title>{formatMessage(messages.title)}</Title>
        <Divider />
        <ProductsContainer>{renderProductList}</ProductsContainer>
      </Container>
    )
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

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const RelatedProductsEnhance = compose(
  connect(
    null,
    mapDispatchToProps
  )
)(RelatedProducts)

export default RelatedProductsEnhance
