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
  CustomizeButton,
  ButtonWrapper,
  ReorderButton
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
  designCode?: string
  teamStoreId?: string
}

interface Props {
  intl: InjectedIntl
  label: string
  renderForThumbnail?: boolean
  item?: CartItems
  items?: CartItems[]
  designId?: string
  designName?: string
  designImage?: string
  designCode?: string
  teamStoreId?: string
  withoutTop?: boolean
  itemProdPage?: boolean
  onClick: () => boolean
  myLockerList?: boolean
  orderDetails?: boolean
  getTotalItemsIncart: () => void
  formatMessage: (messageDescriptor: any) => string
}

export class AddToCartButton extends React.PureComponent<Props, {}> {
  render() {
    const {
      item,
      label,
      renderForThumbnail,
      withoutTop,
      myLockerList,
      orderDetails
    } = this.props

    const renderView = renderForThumbnail ? (
      <ButtonContainer {...{ myLockerList }} withoutTop={!!withoutTop}>
        <CustomizeButton onClick={this.addToCart}>{label}</CustomizeButton>
      </ButtonContainer>
    ) : (
      <Container>
        {orderDetails ? (
          <ButtonWrapper individual={!!item}>
            <ReorderButton type="primary" onClick={this.addToCart}>
              {label}
            </ReorderButton>
          </ButtonWrapper>
        ) : (
          <StyledButton onClick={this.addToCart}>{label}</StyledButton>
        )}
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
      designImage,
      designCode,
      items,
      itemProdPage = false
    } = this.props
    if (renderForThumbnail && item) {
      const itemToAdd = this.getItemWithDetails(
        item,
        designId,
        teamStoreId,
        designName,
        designImage,
        designCode,
        itemProdPage
      )
      this.saveInLocalStorage(itemToAdd)
    } else {
      const canAddToStore = onClick()
      if (!canAddToStore) {
        Message.warning(
          intl.formatMessage(
            itemProdPage
              ? messages.validationMessageProdPage
              : messages.validationMessage
          )
        )
        return
      } else {
        if (itemProdPage) {
          if (!item && items && !!items.length) {
            items.map(i =>
              this.saveInLocalStorage(
                this.getItemWithDetails(
                  i,
                  i.designId,
                  i.teamStoreId,
                  i.designName,
                  i.designImage,
                  i.designCode,
                  itemProdPage
                )
              )
            )
          } else if (item) {
            const itemToAdd = this.getItemWithDetails(
              item,
              designId,
              teamStoreId,
              designName,
              designImage,
              designCode,
              itemProdPage
            )
            this.saveInLocalStorage(itemToAdd)
          }
          return
        }
        if (item) {
          this.saveInLocalStorage(
            this.getItemWithDetails(
              item,
              item.designId,
              item.teamStoreId,
              item.designName,
              item.designImage,
              item.designCode,
              false
            )
          )
        }
      }
    }
  }

  getItemWithDetails = (
    item: CartItems,
    designId = '',
    teamStoreId = '',
    designName = '',
    designImage = '',
    designCode = '',
    itemProdPage: boolean
  ) => {
    const details = [] as CartItemDetail[]
    const detail = {
      quantity: 1
    }
    details.push(detail)
    const itemToAdd = Object.assign(
      {},
      { product: item.product },
      {
        itemDetails: itemProdPage ? item.itemDetails : details
      },
      { designId },
      { designName },
      { designImage },
      { designCode },
      { teamStoreId }
    )
    return itemToAdd
  }

  saveInLocalStorage = (item: CartItems) => {
    const {
      intl,
      renderForThumbnail,
      getTotalItemsIncart: countCartItems
    } = this.props
    const productName = renderForThumbnail
      ? get(item, 'product.name')
      : item.product.name

    if (typeof window !== 'undefined') {
      const cartList = JSON.parse(localStorage.getItem('cart') as any)

      if (cartList) {
        cartList.push(item)
        localStorage.setItem('cart', JSON.stringify(cartList))
      } else {
        const myItems = []
        myItems.push(item)
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
  connect(
    null,
    { getTotalItemsIncart }
  )
)(AddToCartButton)

export default AddToCartEnhanced
