/**
 * ShoppingCartPage Screen - Created by gustavomedina on 02/05/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
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
  AddOneMoreMessage,
  DeleteConfirmMessage
} from './styledComponents'
import ListItem from '../../components/CartListItem'

import Ordersummary from '../../components/OrderSummary'
import { Product, CartItemDetail, ItemDetailType } from '../../types/common'
import Modal from 'antd/lib/modal/Modal'
import { getShoppingCartData } from '../../utils/utilsShoppingCart'

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
  showDeleteLastItemModal: boolean
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
  showDeleteLastItemModalAction: (show: boolean) => void
  resetReducerData: () => void
  saveToStorage: (cart: CartItems[]) => void
}

export class ShoppingCartPage extends React.Component<Props, {}> {
  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  handleCheckout = () => {
    const { history, cart } = this.props
    // history.push('/checkout', { cart })
    const userLogged = !!localStorage.getItem('user')
    if (!userLogged) {
      window.location.replace('/shopping-cart?login=open')
    } else {
      history.push('/checkout', { cart })
    }
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
    const { showDeleteLastItemModalAction, removeItemAction, cart } = this.props
    if (cart.length === 1) {
      showDeleteLastItemModalAction(true)
      return
    }
    removeItemAction(index)
  }

  handleOnRemoveLastItem = () => {
    const { removeItemAction, showDeleteLastItemModalAction } = this.props
    removeItemAction(0)
    showDeleteLastItemModalAction(false)
  }

  toggleDeleteLastItemModal = () => {
    const {
      showDeleteLastItemModalAction,
      showDeleteLastItemModal
    } = this.props
    showDeleteLastItemModalAction(!showDeleteLastItemModal)
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

  render() {
    const { intl, history, cart, showDeleteLastItemModal } = this.props
    const formatMessage = intl.formatMessage

    const shoppingCartData = getShoppingCartData(cart)
    const {
      total,
      totalWithoutDiscount,
      priceRangeToApply,
      show25PercentMessage,
      nameOfFirstProduct,
      numberOfProducts
    } = shoppingCartData

    const cartItems = cart || []
    const renderList = cartItems.map((cartItem, index) => {
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
              ? `${cartItem.product.name} ${cartItem.product.shortDescription}`
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
                  subtotal={total}
                  {...{ formatMessage, totalWithoutDiscount, total }}
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
          <Modal
            visible={showDeleteLastItemModal}
            title={formatMessage(messages.titleDeleteModal)}
            okText={formatMessage(messages.delete)}
            onOk={this.handleOnRemoveLastItem}
            onCancel={this.toggleDeleteLastItemModal}
          >
            <DeleteConfirmMessage>
              <FormattedMessage
                {...messages.messageDeleteItem}
                values={{ nameOfFirstProduct }}
              />
            </DeleteConfirmMessage>
          </Modal>
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
