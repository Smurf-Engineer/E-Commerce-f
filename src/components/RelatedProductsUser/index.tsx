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
  ProductsContainer,
  DivList
} from './styledComponents'
import ProductThumbnail from '../ProductThumbnail'
import { openQuickViewAction } from '../MainLayout/actions'
import { DesignType } from '../../types/common'

interface Props {
  history: any
  dispatch: any
  title?: string
  currentCurrency: string
  products: DesignType[]
  phone: boolean
  formatMessage: (messageDescriptor: any) => string
}

export class RelatedProducts extends React.Component<Props, {}> {
  render() {
    const {
      products = [],
      phone,
      currentCurrency,
      formatMessage
    } = this.props

    const renderProductList = products.map(({ product, image, name, code, shortId }: DesignType, key) => {
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
            description,
            priceRange,
            isTopProduct,
            yotpoId,
            gender,
            name,
            code,
            type,
            image,
            customizable,
            currentCurrency,
            colors
          }}
          description={code}
          images={productImages}
          product={product}
          fromYotpo={true}
          onPressQuickView={this.handleOnQuickView}
          onPressCustomize={this.handleOnCustomize}
          onPressThumbnail={this.handlePressThumbnail(shortId)}
          customizableLabel={formatMessage(messages.customizableLabel)}
          disableSlider={phone}
          hideCustomButton={true}
          labelButton={formatMessage(messages.viewFullDetailsLabel)
          }
        />
      )
    })

    return (
      <Container>
        <Title>{formatMessage(messages.title)}</Title>
        <Divider />
        <DivList>
          <ProductsContainer>
            {renderProductList}
          </ProductsContainer>
        </DivList>
      </Container>
    )
  }
  handlePressThumbnail = (id: string) => () => {
    const { history } = this.props
    history.push(`/custom-product?id=${id}`)
    zenscroll.toY(0, 0)
  }

  handleOnCustomize = (id: string) => {
    const { history } = this.props
    history.push(`/custom-product?id=${id}`)
  }

  handleOnQuickView = (id: number, yotpoId: string) => {
    const { dispatch } = this.props
    dispatch(openQuickViewAction(id, yotpoId))
  }
}

const mapStateToProps = (state: any) => state.get('responsive').toJS()

const RelatedProductsEnhance = compose(
  connect(mapStateToProps)
)(RelatedProducts)

export default RelatedProductsEnhance
