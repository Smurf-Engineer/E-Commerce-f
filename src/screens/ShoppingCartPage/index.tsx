/**
 * ShoppingCartPage Screen - Created by gustavomedina on 02/05/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import get from 'lodash/get'
import Layout from '../../components/MainLayout'
import * as shoppingCartPageActions from './actions'
import * as thunkActions from './thunkActions'
import messages from './messages'
import {
  Container,
  SideBar,
  Content,
  Title,
  ButtonWrapper,
  CheckoutButton,
  CartList,
  EmptyContainer,
  EmptyItems,
  EmptyTitle,
  EmptyDescription,
  StyledEmptyButton,
  AddOneMoreMessage
} from './styledComponents'
import ListItem from '../../components/CartListItem'

import Ordersummary from '../../components/OrderSummary'
import {
  Product,
  CartItemDetail,
  ItemDetailType,
  PriceRange
} from '../../types/common'

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
  storeDesignId?: string
  designId?: string
  designName?: string
  designImage?: string
  teamStoreId?: string
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  cart: CartItems[]
  setItemsAction: (items: Product[]) => void
  addItemDetailAction: (index: number) => void
  deleteItemDetailAction: (index: number, detailIndex: number) => void
  removeItemAction: (index: number) => void
  setTotalAction: (total: number) => void
  setSubtotalAction: (subtotal: number) => void
  setShippingAction: (shipping: number) => void
  setLabelItemDetailAction: (
    index: number,
    detailIndex: number,
    label: string
  ) => void
  setGenderItemDetailAction: (
    index: number,
    detailIndex: number,
    gender: ItemDetailType
  ) => void
  setSizeItemDetailAction: (
    index: number,
    detailIndex: number,
    size: ItemDetailType
  ) => void
  setFitItemDetailAction: (
    index: number,
    detailIndex: number,
    fit: ItemDetailType
  ) => void
  setQuantityItemDetailAction: (
    index: number,
    detailIndex: number,
    quantity: number
  ) => void
  setInitialData: () => void
  resetReducerData: () => void
  saveToStorage: (cart: CartItems[]) => void
}

export class ShoppingCartPage extends React.Component<Props, {}> {
  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  handleCheckout = () => {
    const { history } = this.props
    history.push('/checkout')
  }

  componentDidMount() {
    const { setInitialData } = this.props
    setInitialData()
  }

  componentWillUnmount() {
    const { cart, saveToStorage } = this.props
    saveToStorage(cart)
  }

  handleAddItemDetail = (
    event: React.MouseEvent<EventTarget>,
    index: number
  ) => {
    const { addItemDetailAction } = this.props
    addItemDetailAction(index)
  }

  handleRemoveItem = (event: React.MouseEvent<EventTarget>, index: number) => {
    const { removeItemAction } = this.props
    removeItemAction(index)
  }

  handledeleteItemDetail = (
    event: React.MouseEvent<EventTarget>,
    index: number,
    detailIndex: number
  ) => {
    const { deleteItemDetailAction } = this.props
    deleteItemDetailAction(index, detailIndex)
  }

  handleSetDetailLabel = (
    index: number,
    detailIndex: number,
    label: string
  ) => {
    const { setLabelItemDetailAction } = this.props
    setLabelItemDetailAction(index, detailIndex, label)
  }

  handleSetDetailGender = (
    index: number,
    detailIndex: number,
    gender: ItemDetailType
  ) => {
    const { setGenderItemDetailAction } = this.props
    setGenderItemDetailAction(index, detailIndex, gender)
  }

  handleSetDetailSize = (
    index: number,
    detailIndex: number,
    size: ItemDetailType
  ) => {
    const { setSizeItemDetailAction } = this.props
    setSizeItemDetailAction(index, detailIndex, size)
  }

  handleSetDetailFit = (
    index: number,
    detailIndex: number,
    fit: ItemDetailType
  ) => {
    const { setFitItemDetailAction } = this.props
    setFitItemDetailAction(index, detailIndex, fit)
  }

  handleSetDetailQuantity = (
    index: number,
    detailIndex: number,
    quantity: number
  ) => {
    const { setQuantityItemDetailAction } = this.props
    setQuantityItemDetailAction(index, detailIndex, quantity)
  }

  getPriceRange = (priceRanges: PriceRange[], totalItems: number) => {
    let markslider = { quantity: '0', price: 0 }
    for (const priceRangeItem of priceRanges) {
      if (!totalItems || !priceRangeItem.quantity) {
        break
      }

      const val =
        priceRangeItem.quantity && priceRangeItem.quantity === 'Personal'
          ? 1
          : priceRangeItem.quantity
            ? parseInt(priceRangeItem.quantity.split('-')[1], 10)
            : 0

      if (val >= totalItems) {
        markslider = priceRangeItem
        break
      }
    }
    return markslider
  }

  getPriceRangeToApply = (items: number) => {
    if (items >= 2 && items <= 5) {
      return 1
    } else if (items >= 6 && items <= 24) {
      return 2
    } else if (items >= 25 && items <= 49) {
      return 3
    } else if (items >= 50) {
      return 4
    } else {
      return 0
    }
  }

  render() {
    const { intl, history, cart } = this.props
    const formatMessage = intl.formatMessage

    let totalSum = 0
    let totalWithoutDiscount = 0
    let priceRangeToApply = 0
    let show25PercentMessage = false
    let justOneOfEveryItem = true
    let maxquantity = 0
    let numberOfProducts = 0
    if (cart) {
      cart.map(cartItem => {
        const quantities = cartItem.itemDetails.map((itemDetail, ind) => {
          return itemDetail.quantity
        })

        const quantitySum = quantities.reduce((a, b) => a + b, 0)

        numberOfProducts = numberOfProducts + quantitySum

        if (quantitySum === 1 && cart.length === 1) {
          show25PercentMessage = true
        }

        if (quantitySum !== 1) {
          justOneOfEveryItem = false
        }

        if (quantitySum > maxquantity) {
          maxquantity = quantitySum
        }

        totalWithoutDiscount =
          totalWithoutDiscount +
          quantitySum * cartItem.product.priceRange[0].price
      })
      if (justOneOfEveryItem && cart.length) {
        priceRangeToApply = this.getPriceRangeToApply(cart.length)
      } else {
        if (cart.length) {
          priceRangeToApply = this.getPriceRangeToApply(maxquantity)
        }
      }

      const total = cart.map((cartItem, index) => {
        const quantities = cartItem.itemDetails.map((itemDetail, ind) => {
          return itemDetail.quantity
        })

        const quantitySum = quantities.reduce((a, b) => a + b, 0)

        const productPriceRanges = get(cartItem, 'product.priceRange', [])

        let priceRange =
          priceRangeToApply !== 0
            ? cartItem.product.priceRange[priceRangeToApply]
            : this.getPriceRange(productPriceRanges, quantitySum)

        priceRange =
          priceRange.price === 0
            ? productPriceRanges[productPriceRanges.length - 1]
            : priceRange

        return priceRange.price * quantitySum
      })

      totalSum = total.reduce((a, b) => a + b, 0)
    }

    const renderList = cart
      ? cart.map((cartItem, index) => {
          return (
            <ListItem
              formatMessage={formatMessage}
              key={index}
              title={
                cartItem.designId
                  ? cartItem.designName || 'Design'
                  : cartItem.product.name
              }
              description={
                cartItem.designId
                  ? `${cartItem.product.name} ${
                      cartItem.product.shortDescription
                    }`
                  : cartItem.product.shortDescription
              }
              price={cartItem.product.priceRange[priceRangeToApply]}
              image={
                cartItem.designId
                  ? cartItem.designImage || ''
                  : cartItem.product.images[0].front
              }
              cartItem={cartItem}
              handleAddItemDetail={this.handleAddItemDetail}
              handledeleteItemDetail={this.handledeleteItemDetail}
              itemIndex={index}
              setLabelItemDetail={this.handleSetDetailLabel}
              setDetailQuantity={this.handleSetDetailQuantity}
              setDetailFit={this.handleSetDetailFit}
              setDetailGender={this.handleSetDetailGender}
              setDetailSize={this.handleSetDetailSize}
              removeItem={this.handleRemoveItem}
            />
          )
        })
      : null

    const sideHeaderMessage = show25PercentMessage ? (
      <AddOneMoreMessage>
        {formatMessage(messages.addOneMoreMessage)}
      </AddOneMoreMessage>
    ) : null

    return (
      <Layout {...{ history, intl }}>
        <div>
          <Title>
            {`${formatMessage(messages.title)} (${numberOfProducts})`}
          </Title>
          {!cart || cart.length < 1 ? (
            <EmptyContainer>
              <EmptyItems>
                <EmptyTitle>
                  <FormattedMessage {...messages.emptyTitle} />
                </EmptyTitle>
                <EmptyDescription>
                  <FormattedMessage {...messages.emptyMessage} />
                </EmptyDescription>
                <StyledEmptyButton type="danger" onClick={this.handleClick}>
                  {formatMessage(messages.browse)}
                </StyledEmptyButton>
              </EmptyItems>
            </EmptyContainer>
          ) : (
            <Container>
              <SideBar>
                {sideHeaderMessage}
                <Ordersummary
                  total={totalSum}
                  subtotal={totalSum}
                  {...{ formatMessage, totalWithoutDiscount }}
                />
                <ButtonWrapper>
                  <CheckoutButton type="primary" onClick={this.handleCheckout}>
                    <FormattedMessage {...messages.checkout} />
                  </CheckoutButton>
                </ButtonWrapper>
              </SideBar>
              <Content>
                <CartList>{renderList}</CartList>
              </Content>
            </Container>
          )}
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('shoppingCartPage').toJS()

const ShoppingCartPageEnhance = compose(
  injectIntl,
  connect(
    mapStateToProps,
    { ...shoppingCartPageActions, ...thunkActions }
  )
)(ShoppingCartPage)

export default ShoppingCartPageEnhance
