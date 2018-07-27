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
          <ReorderButton
            individual={item ? true : false}
            onClick={this.addToCart}
          >
            {label}
          </ReorderButton>
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
        itemProdPage
      )
      this.saveInLocalStorage(itemToAdd)
    } else {
      const candAddToStore = onClick()
      if (!candAddToStore) {
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
          console.log(`Por aquí si`)
          if (!item && items && items.length > 0) {
            console.log(`Y acá también :o`)
            items.map(i =>
              this.saveInLocalStorage(
                this.getItemWithDetails(
                  i,
                  i.designId,
                  i.teamStoreId,
                  i.designName,
                  i.designImage,
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
              itemProdPage
            )
            this.saveInLocalStorage(itemToAdd)
          }
          return
        }
        if (item) {
          this.saveInLocalStorage(item)
        }
      }
    }
  }

  getItemWithDetails = (
    item: CartItems,
    designId: string = '',
    teamStoreId: string = '',
    designName: string = '',
    designImage: string = '',
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
      ? get(item, 'name')
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
