/**
 * AddToCartButton Component - Created by cazarez on 02/05/18.
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose, withApollo } from 'react-apollo'
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
import { getDesignVariables, getProductQuery } from '../../screens/ShoppingCartPage/data'
import set from 'lodash/set'

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
  fixedPrice?: boolean
  isReseller?: boolean
  teamStoreId?: string
  proCertified?: boolean
  proDesign?: boolean
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
  proCertified?: boolean
  proDesign?: boolean
  designCode?: string
  isFixed?: boolean
  fixedPrice?: boolean
  isReseller?: boolean
  teamStoreId?: string
  teamStoreItem?: string
  withoutTop?: boolean
  itemProdPage?: boolean
  promptReseller?: boolean
  client: any
  user?: User
  onClick: () => boolean
  myLockerList?: boolean
  orderDetails?: boolean
  fixedPrices?: PriceRange[]
  teamStoreName?: string
  hide?: boolean
  secondary?: boolean
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
      secondary,
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
            <ButtonWrapper individual={!!item} {...{ hide, secondary }}>
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

  checkReseller = async() => {
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
        onOk: async() => await this.addToCart(),
        content: <InfoBody>{formatMessage(messages.resellerPrompt)}</InfoBody>
      })
    } else {
      await this.addToCart()
    }
  }

  addToCart = async () => {
    const {
      onClick,
      renderForThumbnail,
      item,
      designId,
      isFixed,
      fixedPrice,
      isReseller,
      teamStoreId,
      teamStoreItem,
      designName,
      designImage,
      proCertified,
      proDesign,
      designCode,
      items,
      itemProdPage = false,
      fixedPrices = [],
      teamStoreName,
      formatMessage,
      fixedCart = false,
      replaceOrder = '',
      client: { query }
    } = this.props
    const productId = get(item, 'product.id' , 0)
    if (productId) {
      const response = await query({
        query: getProductQuery,
        variables: { id: productId },
        fetchPolicy: 'no-cache'
      })
      const upgradeOne = get(response, 'data.product.upgradeOne', {})
      if (upgradeOne && upgradeOne.enabled) {
        set(item, 'product.upgradeOne', upgradeOne)
      }
      const upgradeTwo = get(response, 'data.product.upgradeTwo', {})
      if (upgradeTwo && upgradeTwo.enabled) {
        set(item, 'product.upgradeTwo', upgradeTwo)
      }
      const upgradeThree = get(response, 'data.product.upgradeThree', {})
      if (upgradeThree && upgradeThree.enabled) {
        set(item, 'product.upgradeThree', upgradeThree)
      }
    }
    if (designId) {
      const response = await query({
        query: getDesignVariables,
        variables: { id: designId },
        fetchPolicy: 'no-cache'
      })
      if (response) {
        const {
          variableOne,
          variableTwo,
          oneLength,
          twoLength,
          variableOneCaps,
          variableTwoCaps
        } = get(response, 'data.designVariables', {})
        if (variableOne) {
          set(item, 'product.variableOne', variableOne)
          set(item, 'product.oneLength', oneLength)
          set(item, 'product.variableOneCaps', variableOneCaps)
        }
        if (variableTwo) {
          set(item, 'product.variableTwo', variableTwo)
          set(item, 'product.twoLength', twoLength)
          set(item, 'product.variableTwoCaps', variableTwoCaps)
        }
      }
    }
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
        replaceOrder,
        proCertified,
        proDesign,
        fixedPrice
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
                  i.fixedPrices && i.fixedPrices.length > 0 ? i.fixedPrices : fixedPrices,
                  i.teamStoreName,
                  fixedCart,
                  replaceOrder,
                  i.proCertified,
                  i.proDesign,
                  i.fixedPrice,
                  i.variableOneValue,
                  i.variableTwoValue
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
              replaceOrder,
              proCertified,
              proDesign,
              fixedPrice
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
              replaceOrder,
              item.proCertified,
              item.proDesign,
              item.fixedPrice
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
    replaceOrder: string = '',
    proCertified?: boolean,
    proDesign?: boolean,
    fixedPrice?: boolean,
    variableOneValue?: string,
    variableTwoValue?: string
  ) => {
    const details = [] as CartItemDetail[]
    const upgradeOne = get(item, 'product.upgradeOne', {})
    const upgradeTwo = get(item, 'product.upgradeTwo', {})
    const upgradeThree = get(item, 'product.upgradeThree', {})
    const youthCombined = get(item, 'product.youthCombined', false)
    const detail: CartItemDetail = {
      quantity: 1
    }
    
    if (upgradeOne.enabled) {
      const { options = [] } = upgradeOne || {}
      const defaultUpgradeOne = upgradeOne.defaultOption !== -1 ? options[upgradeOne.defaultOption] : {}
      if (itemProdPage) {
        item.itemDetails.forEach((detailItem) => {
          const isYouth = youthCombined && detailItem.gender && detailItem.gender.name === 'Youth'
          if (!isYouth) {
            const upgradeItem = options.find(({ name }) => detailItem.upgradeOne === name)
            detailItem.firstUpgrade = upgradeItem || defaultUpgradeOne
          } 
        }) 
      } else {
        detail.firstUpgrade = defaultUpgradeOne
      }
    }
    if (upgradeTwo.enabled) {
      const { options = [] } = upgradeTwo || {}
      const defaultUpgradeTwo = upgradeTwo.defaultOption !== -1 ? options[upgradeTwo.defaultOption] : {}
      if (itemProdPage) {
        item.itemDetails.forEach((detailItem) => {
          const isYouth = youthCombined && detailItem.gender && detailItem.gender.name === 'Youth'
          if (!isYouth) {
            const upgradeItem = options.find(({ name }) => detailItem.upgradeTwo === name)
            detailItem.secondUpgrade = upgradeItem || defaultUpgradeTwo
          }
        }) 
      } else {
        detail.secondUpgrade = defaultUpgradeTwo
      }
    }

    if (upgradeThree.enabled) {
      const { options = [] } = upgradeThree || {}
      const defaultUpgradeThree = upgradeThree.defaultOption !== -1 ? options[upgradeThree.defaultOption] : {}
      if (itemProdPage) {
        item.itemDetails.forEach((detailItem) => {
          const isYouth = youthCombined && detailItem.gender && detailItem.gender.name === 'Youth'
          if (!isYouth) {
            const upgradeItem = options.find(({ name }) => detailItem.upgradeThree === name)
            detailItem.thirdUpgrade = upgradeItem || defaultUpgradeThree
          }
        }) 
      } else {
        detail.thirdUpgrade = defaultUpgradeThree
      }
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
      { replaceOrder },
      { proCertified },
      { proDesign },
      { fixedPrice },
      { variableOneValue },
      { variableTwoValue }
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
  (comp) => withApollo(comp, { withRef: true }),
  connect(
    mapStateToProps,
    { getTotalItemsIncart },
    null,
    { withRef: true }
  ),
)(AddToCartButton)

export default AddToCartEnhanced
