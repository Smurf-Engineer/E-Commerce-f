/**
 * AddToCartButton Component - Created by cazarez on 02/05/18.
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import get from 'lodash/get'
import Modal from 'antd/lib/modal'
import Message from 'antd/lib/message'
import {
  Container,
  StyledButton,
  ButtonContainer,
  CustomizeButton,
  ButtonWrapper,
  ReorderButton,
  ModalTitle,
  InfoBody,
  buttonStyle,
  cancelButtonStyle
} from './styledComponents'
import messages from './messages'
import { getTotalItemsIncart } from '../MainLayout/actions'
import { Product, CartItemDetail, PriceRange, User } from '../../types/common'
import find from 'lodash/find'

const { confirm } = Modal

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
  storeDesignId?: string
  designId?: string
  designName?: string
  designImage?: string
  designCode?: string
  isFixed?: boolean
  isReseller?: boolean
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
  isReseller?: boolean
  teamStoreId?: string
  teamStoreItem?: string
  withoutTop?: boolean
  itemProdPage?: boolean
  promptReseller?: boolean
  user?: User
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
        <CustomizeButton onClick={this.checkReseller}>{label}</CustomizeButton>
      </ButtonContainer>
    ) : (
        <Container>
          {orderDetails ? (
            <ButtonWrapper individual={!!item} {...{ hide }}>
              <ReorderButton type="primary" onClick={this.checkReseller}>
                {label}
              </ReorderButton>
            </ButtonWrapper>
          ) : (
              <StyledButton onClick={this.checkReseller}>{label}</StyledButton>
            )}
        </Container>
      )

    return renderView
  }

  checkReseller = () => {
    const { promptReseller, formatMessage, user } = this.props
    if (promptReseller) {
      const name = user ? user.name : ''
      confirm({
        title: <ModalTitle>{formatMessage(messages.name, { name })}</ModalTitle>,
        icon: ' ',
        centered: true,
        cancelText: formatMessage(messages.goToLocker),
        okText: formatMessage(messages.proceed),
        cancelButtonProps: {
          style: buttonStyle
        },
        okButtonProps: {
          style: cancelButtonStyle
        },
        onCancel: () => {
          window.location.replace('/account?option=myLocker')
        },
        onOk: this.addToCart,
        content: <InfoBody>{formatMessage(messages.resellerPrompt)}</InfoBody>
      })
    } else {
      this.addToCart()
    }
  }

  addToCart = () => {
    const {
      onClick,
      renderForThumbnail,
      item,
      designId,
      isFixed,
      isReseller,
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
        isReseller,
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
                  i.isReseller,
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
              isReseller,
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
              item.isReseller,
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
    isReseller = false,
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
      { isReseller },
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
    const active = get(item, 'product.active', false)
    const onlyProDesign = get(item, 'product.onlyProDesign', false)
    const productName = renderForThumbnail
      ? get(item, 'product.name')
      : item.product.name

    if (typeof window !== 'undefined' && (active || onlyProDesign)) {
      const cartList = JSON.parse(localStorage.getItem('cart') as any)

      if (cartList) {
        const { teamStoreId, designId } = item
        const sameDesign = find(cartList, ['designId', designId])
        if (sameDesign && sameDesign.teamStoreId !== teamStoreId) {
          Message.warning(formatMessage(messages.cantMix))
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

const mapStateToProps = (state: any) => {
  const app = state.get('app').toJS()
  return {
    ...app,
  }
}

const AddToCartEnhanced = compose(
  connect(
    mapStateToProps,
    { getTotalItemsIncart },
    null,
    { withRef: true }
  )
)(AddToCartButton)

export default AddToCartEnhanced
