/**
 * AddToCartButton Component - Created by cazarez on 02/05/18.
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import get from 'lodash/get'
import { injectIntl } from 'react-intl'
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
import { Product, CartItemDetail, PriceRange } from '../../types/common'
import find from 'lodash/find'

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
  storeDesignId?: string
  designId?: string
  designName?: string
  designImage?: string
  designCode?: string
  isFixed?: boolean
  teamStoreId?: string
  teamStoreItem?: string
  shortId?: string
  teamStoreName?: string
}

interface Props {
  label: string
  renderForThumbnail?: boolean
  item?: CartItems
  items?: CartItems[]
  designId?: string
  designName?: string
  designImage?: string
  designCode?: string
  isFixed?: boolean
  teamStoreId?: string
  teamStoreItem?: string
  withoutTop?: boolean
  itemProdPage?: boolean
  onClick: () => boolean
  myLockerList?: boolean
  orderDetails?: boolean
  fixedPrices?: PriceRange[]
  teamStoreName?: string
  hide?: boolean
  fixedCart?: boolean
  replaceOrder?: string
  addToCart: () => void
  getTotalItemsIncart: () => void
  formatMessage: (messageDescriptor: any) => string
}

export class AddToCartButton extends PureComponent<Props, {}> {
  render() {
    const {
      item,
      label,
      renderForThumbnail,
      withoutTop,
      myLockerList,
      orderDetails,
      hide
    } = this.props
    const renderView = renderForThumbnail ? (
      <ButtonContainer {...{ myLockerList }} withoutTop={!!withoutTop}>
        <CustomizeButton onClick={this.addToCart}>{label}</CustomizeButton>
      </ButtonContainer>
    ) : (
        <Container>
          {orderDetails ? (
            <ButtonWrapper individual={!!item} {...{ hide }}>
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
      item,
      designId,
      isFixed,
      teamStoreId,
      teamStoreItem,
      designName,
      designImage,
      designCode,
      items,
      itemProdPage = false,
      fixedPrices = [],
      teamStoreName,
      formatMessage,
      fixedCart = false,
      replaceOrder = ''
    } = this.props
    if (renderForThumbnail && item) {
      const itemToAdd = this.getItemWithDetails(
        item,
        designId,
        isFixed,
        teamStoreId,
        teamStoreItem,
        designName,
        designImage,
        designCode,
        itemProdPage,
        fixedPrices,
        teamStoreName,
        fixedCart,
        replaceOrder
      )
      this.saveInLocalStorage(itemToAdd)
    } else {
      const canAddToStore = onClick()
      if (!canAddToStore) {
        Message.warning(
          formatMessage(
            designId
              ? messages.validationMessageProdPage
              : messages.validationMessage
          )
        )
        return
      } else {
        if (itemProdPage) {
          if (!item && items && !!items.length) {
            items.map((i) =>
              this.saveInLocalStorage(
                this.getItemWithDetails(
                  i,
                  i.designId,
                  i.isFixed,
                  i.teamStoreId,
                  i.teamStoreItem,
                  i.designName,
                  i.designImage,
                  i.designCode,
                  itemProdPage,
                  fixedPrices,
                  i.teamStoreName,
                  fixedCart,
                  replaceOrder
                )
              )
            )
          } else if (item) {
            const itemToAdd = this.getItemWithDetails(
              item,
              designId,
              isFixed,
              teamStoreId,
              teamStoreItem,
              designName,
              designImage,
              designCode,
              itemProdPage,
              fixedPrices,
              teamStoreName,
              fixedCart,
              replaceOrder
            )
            this.saveInLocalStorage(itemToAdd)
          }
          return
        }
        if (item) {
          this.saveInLocalStorage(
            this.getItemWithDetails(
              item,
              item.shortId,
              item.isFixed,
              item.teamStoreId,
              item.teamStoreItem,
              item.designName,
              item.designImage,
              item.designCode,
              false,
              fixedPrices,
              item.teamStoreName,
              fixedCart,
              replaceOrder
            )
          )
        }
      }
    }
  }

  getItemWithDetails = (
    item: CartItems,
    designId = '',
    isFixed = false,
    teamStoreId = '',
    teamStoreItem = '',
    designName = '',
    designImage = '',
    designCode = '',
    itemProdPage: boolean,
    fixedPrices: PriceRange[],
    teamStoreName = '',
    fixedCart: boolean = false,
    replaceOrder: string = ''
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
      { isFixed },
      { teamStoreId },
      { teamStoreItem },
      { fixedPrices },
      { teamStoreName },
      { fixedCart },
      { replaceOrder }
    )
    return itemToAdd
  }

  saveInLocalStorage = (item: CartItems) => {
    const {
      renderForThumbnail,
      getTotalItemsIncart: countCartItems,
      formatMessage
    } = this.props
    const productName = renderForThumbnail
      ? get(item, 'product.name')
      : item.product.name

    if (typeof window !== 'undefined') {
      const cartList = JSON.parse(localStorage.getItem('cart') as any)

      if (cartList) {
        const { teamStoreId, designId } = item
        const sameDesign = find(cartList, ['designId', designId])
        if (sameDesign && sameDesign.teamStoreId !== teamStoreId) {
          Message.warning(intl.formatMessage(messages.cantMix))
          return
        } else {
          cartList.push(item)
          localStorage.setItem('cart', JSON.stringify(cartList))
        }
      } else {
        const myItems = []
        myItems.push(item)
        localStorage.setItem('cart', JSON.stringify(myItems))
      }
      countCartItems()
      Message.success(
        formatMessage(messages.successfulAddMessage, { name: productName })
      )
    }
  }
}

const AddToCartEnhanced = compose(
  injectIntl,
  connect(
    null,
    { getTotalItemsIncart },
    null,
    { withRef: true }
  )
)(AddToCartButton)

export default AddToCartEnhanced
