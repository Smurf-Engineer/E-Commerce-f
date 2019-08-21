/**
 * ShoppingCartPage Screen - Created by gustavomedina on 02/05/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import has from 'lodash/has'
import find from 'lodash/find'
import filter from 'lodash/filter'
import Layout from '../../components/MainLayout'
import FitInfo from '../../components/FitInfo'
import DesignCheckModal from '../../components/DesignCheckModal'
import * as shoppingCartPageActions from './actions'
import * as thunkActions from './thunkActions'
import messages from './messages'
import {
  PageContent,
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
  DeleteConfirmMessage,
  Bold
} from './styledComponents'
import CartItem from '../../components/CartListItem'
import config from '../../config/index'

import Ordersummary from '../../components/OrderSummary'
import {
  Product,
  CartItemDetail,
  ItemDetailType,
  ProductColors
} from '../../types/common'
import Modal from 'antd/lib/modal/Modal'
import { getShoppingCartData } from '../../utils/utilsShoppingCart'
import ModalTitle from '../../components/ModalTitle'
import ModalFooter from '../../components/ModalFooter'

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
  showReviewDesignModal: boolean
  currentCurrency: string
  openFitInfo: boolean
  selectedIndex: number
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
  setColorItemDetailAction: (
    index: number,
    detailIndex: number,
    color: ProductColors
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
  showReviewDesignModalAction: () => void
  openFitInfoAction: (open: boolean, selectedIndex?: number) => void
  getDesignCheck: () => boolean
}

export class ShoppingCartPage extends React.Component<Props, {}> {
  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  handleCheckout = () => () => {
    const { history, cart, showReviewDesignModalAction } = this.props
    showReviewDesignModalAction()
    const userLogged = !!localStorage.getItem('user')
    if (!userLogged) {
      window.location.replace('/shopping-cart?login=open')
    } else {
      history.push('/checkout', { cart })
    }
  }

  onCheckoutClick = async () => {
    const { showReviewDesignModalAction, cart, getDesignCheck } = this.props
    const isCustom = find(cart, 'designId')
    const proDesign = await getDesignCheck()
    if (!!isCustom && !proDesign) {
      showReviewDesignModalAction()
    } else {
      this.handleCheckout()()
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
  handleSetDetailColor = (
    index: number,
    detailIndex: number,
    color: ProductColors
  ) => {
    const { setColorItemDetailAction } = this.props
    setColorItemDetailAction(index, detailIndex, color)
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
  handleCloseFitInfo = () => {
    const { openFitInfoAction } = this.props
    openFitInfoAction(false)
  }

  isAllSetInProduct = (cartItem: CartItems) => {
    const {
      itemDetails,
      product: { genders, fitStyles, sizeRange }
    } = cartItem
    const checkGender = genders.length && genders[0].id
    const checkFit = fitStyles.length && fitStyles[0].id
    const checkSize = sizeRange.length && sizeRange[0].id
    for (const details of itemDetails) {
      if (checkGender && !has(details, 'gender')) {
        return false
      }
      if (checkFit && !has(details, 'fit')) {
        return false
      }
      if (checkSize && !has(details, 'size')) {
        return false
      }
    }
    return true
  }

  render() {
    const {
      intl,
      history,
      cart,
      showDeleteLastItemModal,
      showReviewDesignModal,
      showReviewDesignModalAction,
      currentCurrency,
      openFitInfoAction,
      openFitInfo,
      selectedIndex
    } = this.props
    const { formatMessage } = intl

    const shoppingCartData = getShoppingCartData(
      cart,
      currentCurrency || config.defaultCurrency
    )
    const {
      total,
      totalWithoutDiscount,
      priceRangeToApply,
      show25PercentMessage,
      nameOfFirstProduct,
      numberOfProducts
    } = shoppingCartData

    let symbol = '$'

    const cartItems = cart || []
    let activeCheckout = true
    const renderList = cartItems.map((cartItem, index) => {
      if (!this.isAllSetInProduct(cartItem)) {
        activeCheckout = false
      }

      // get prices from currency
      const currencyPrices = filter(cartItem.product.priceRange, {
        abbreviation: currentCurrency || config.defaultCurrency
      })

      symbol = currencyPrices[0].shortName

      return (
        <CartItem
          currentCurrency={currentCurrency || config.defaultCurrency}
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
          price={currencyPrices[priceRangeToApply]}
          image={
            cartItem.designId
              ? cartItem.designImage || ''
              : cartItem.product.images[0].front
          }
          currencySymbol={symbol}
          cartItem={cartItem}
          handleAddItemDetail={this.handleAddItemDetail}
          handledeleteItemDetail={this.handledeleteItemDetail}
          itemIndex={index}
          setLabelItemDetail={this.handleSetDetailLabel}
          setDetailQuantity={this.handleSetDetailQuantity}
          setDetailFit={this.handleSetDetailFit}
          setDetailColor={this.handleSetDetailColor}
          setDetailGender={this.handleSetDetailGender}
          setDetailSize={this.handleSetDetailSize}
          removeItem={this.handleRemoveItem}
          {...{ history, openFitInfoAction, openFitInfo }}
        />
      )
    })

    const sideHeaderMessage = show25PercentMessage ? (
      <AddOneMoreMessage>
        <Bold>{formatMessage(messages.saveMore)}</Bold>
        <FormattedMessage
          id={messages.addOneMoreMessage.id}
          defaultMessage={messages.addOneMoreMessage.defaultMessage}
          values={{
            any: <Bold>{formatMessage(messages.any)}</Bold>,
            percent: <Bold>{formatMessage(messages.percent)}</Bold>,
            entireOrder: <Bold>{formatMessage(messages.entireOrder)}</Bold>
          }}
        />
      </AddOneMoreMessage>
    ) : null

    const designReviewModal = (
      <DesignCheckModal
        requestClose={showReviewDesignModalAction}
        handleActionButton={this.handleCheckout()}
        visible={showReviewDesignModal}
        {...{ formatMessage }}
      />
    )

    return (
      <Layout {...{ history, intl }}>
        <PageContent>
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
                  currencySymbol={symbol}
                  youSaved={totalWithoutDiscount - total}
                  {...{ formatMessage, totalWithoutDiscount }}
                />
                <ButtonWrapper disabled={!activeCheckout}>
                  <CheckoutButton
                    disabled={!activeCheckout}
                    type="primary"
                    onClick={this.onCheckoutClick}
                  >
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
            title={
              <ModalTitle title={formatMessage(messages.titleDeleteModal)} />
            }
            footer={
              <ModalFooter
                okText={formatMessage(messages.delete)}
                onOk={this.handleOnRemoveLastItem}
                onCancel={this.toggleDeleteLastItemModal}
                {...{ formatMessage }}
              />
            }
            maskClosable={false}
            closable={false}
            destroyOnClose={true}
          >
            <DeleteConfirmMessage>
              <FormattedMessage
                {...messages.messageDeleteItem}
                values={{ nameOfFirstProduct }}
              />
            </DeleteConfirmMessage>
          </Modal>
        </PageContent>
        {designReviewModal}
        {cart && cart.length && (
          <FitInfo
            open={openFitInfo}
            product={cart[selectedIndex].product}
            requestClose={this.handleCloseFitInfo}
            {...{ history, formatMessage }}
          />
        )}
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => {
  const shoppingProps = state.get('shoppingCartPage').toJS()
  const langProps = state.get('languageProvider').toJS()
  return {
    ...shoppingProps,
    ...langProps
  }
}

const ShoppingCartPageEnhance = compose(
  injectIntl,
  connect(
    mapStateToProps,
    { ...shoppingCartPageActions, ...thunkActions }
  )
)(ShoppingCartPage)

export default ShoppingCartPageEnhance
