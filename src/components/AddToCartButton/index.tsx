/**
 * AddToCartButton Component - Created by cazarez on 02/05/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import get from 'lodash/get'
import Message from 'antd/lib/message'

import {
  Container,
  StyledButton,
  ButtonContainer,
  CustomizeButton
} from './styledComponents'
import messages from './messages'
import { getTotalItemsIncart } from '../MainLayout/actions'
import { Product, CartItemDetail } from '../../types/common'

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
  storeDesignId?: string
  designId?: string
  designName?: string
  designImage?: string
  teamStoreId?: string
}

interface Props {
  intl: InjectedIntl
  label: string
  renderForThumbnail?: boolean
  item: CartItems
  designId?: string
  designName?: string
  designImage?: string
  teamStoreId?: string
  withoutTop?: boolean
  onClick: () => boolean
  getTotalItemsIncart: () => void
  formatMessage: (messageDescriptor: any) => string
}

export class AddToCartButton extends React.PureComponent<Props, {}> {
  render() {
    const { label, renderForThumbnail, withoutTop } = this.props

    const renderView = renderForThumbnail ? (
      <ButtonContainer withoutTop={!!withoutTop}>
        <CustomizeButton onClick={this.addToCart}>{label}</CustomizeButton>
      </ButtonContainer>
    ) : (
      <Container>
        <StyledButton onClick={this.addToCart}>{label}</StyledButton>
      </Container>
    )

    return renderView
  }

  addToCart = () => {
    const {
      onClick,
      renderForThumbnail,
      intl,
      item,
      designId,
      teamStoreId,
      designName,
      designImage
    } = this.props
    if (renderForThumbnail) {
      const details = [] as CartItemDetail[]
      const detail = {
        quantity: 1
      }
      details.push(detail)
      const itemToAdd = Object.assign(
        {},
        { product: item.product },
        {
          itemDetails: details
        },
        { designId },
        { designName },
        { designImage },
        { teamStoreId }
      )
      this.saveInLocalStorage(itemToAdd)
    } else {
      const candAddToStore = onClick()
      if (!candAddToStore) {
        Message.warning(intl.formatMessage(messages.validationMessage))
        return
      } else {
        this.saveInLocalStorage(item)
      }
    }
  }

  saveInLocalStorage = (obj?: CartItems) => {
    const {
      intl,
      item,
      renderForThumbnail,
      getTotalItemsIncart: countCartItems
    } = this.props

    const productName = renderForThumbnail
      ? get(item, 'name')
      : item.product.name

    if (typeof window !== 'undefined') {
      const cartList = JSON.parse(localStorage.getItem('cart') as any)

      if (cartList) {
        cartList.push(obj || item)
        localStorage.setItem('cart', JSON.stringify(cartList))
      } else {
        const myItems = []
        myItems.push(obj || item)
        localStorage.setItem('cart', JSON.stringify(myItems))
      }
      countCartItems()
      Message.success(
        intl.formatMessage(messages.successfulAddMessage, { name: productName })
      )
    }
  }
}

const AddToCartEnhanced = compose(
  injectIntl,
  connect(null, { getTotalItemsIncart })
)(AddToCartButton)

export default AddToCartEnhanced
