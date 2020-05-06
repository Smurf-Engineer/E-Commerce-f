/**
 * ShoppingCartPage Screen - Created by gustavomedina on 02/05/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import has from 'lodash/has'
import find from 'lodash/find'
import get from 'lodash/get'
import every from 'lodash/every'
import filter from 'lodash/filter'
import Layout from '../../components/MainLayout'
import FitInfo from '../../components/FitInfo'
import CheckoutDesignCheckModal from '../../components/CheckoutDesignCheckModal'
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
  DeleteConfirmMessage,
  ModalHeader,
  InfoBody,
  buttonStyle,
  CloseIcon,
  StoreInfo,
  ButtonContainer,
  ContinueButton
} from './styledComponents'
import CartItem from '../../components/CartListItem'
import config from '../../config/index'

import Ordersummary from '../../components/OrderSummary'
import {
  Product,
  CartItemDetail,
  ItemDetailType,
  ProductColors,
  PriceRange
} from '../../types/common'
import Modal from 'antd/lib/modal/Modal'
import Checkbox from 'antd/lib/checkbox'
import closeIcon from '../../assets/cancel-button.svg'
import { getShoppingCartData } from '../../utils/utilsShoppingCart'
import ModalTitle from '../../components/ModalTitle'
import ModalFooter from '../../components/ModalFooter'

const { warning } = Modal

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
  storeDesignId?: string
  designId?: string
  designName?: string
  designImage?: string
  isFixed?: boolean
  teamStoreId?: string
  fixedPrices: PriceRange[]
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  cart: CartItems[]
  client: any
  showDeleteLastItemModal: boolean
  showReviewDesignModal: boolean
  currentCurrency: string
  openFitInfo: boolean
  storeTerms: boolean
  openStoreInfo: boolean
  hasChanges: boolean
  selectedIndex: number
  openStoreInfoAction: (open: boolean) => void
  setStoreTerms: (checked: boolean) => void
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
  setInitialData: (query: any) => void
  showDeleteLastItemModalAction: (show: boolean) => void
  resetReducerData: () => void
  saveToStorage: (cart: CartItems[], reset: boolean) => void
  showReviewDesignModalAction: (open: boolean) => void
  openFitInfoAction: (open: boolean, selectedIndex?: number) => void
}

export class ShoppingCartPage extends React.Component<Props, {}> {
  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  handleCheckout = (proDesign = false) => () => {
    const { history, cart } = this.props
    const userLogged = !!localStorage.getItem('user')
    if (!userLogged) {
      window.location.replace('/shopping-cart?login=open')
    } else {
      history.push('/checkout', { cart, proDesign })
    }
  }

  showFixedError = () => {
    const {
      intl: { formatMessage }
    } = this.props
    warning({
      title: (
        <ModalHeader>{formatMessage(messages.differentStore)}</ModalHeader>
      ),
      okText: formatMessage(messages.gotIt),
      okButtonProps: {
        style: buttonStyle
      },
      content: <InfoBody>{formatMessage(messages.differentBody)}</InfoBody>
    })
  }

  proceedCheckout = () => {
    const {
      showReviewDesignModalAction,
      showReviewDesignModal,
      cart
    } = this.props
    const isCustom = find(cart, 'designId')
    const teamStore = find(cart, 'teamStoreId')
    if (!!isCustom && !teamStore) {
      if (showReviewDesignModal) {
        showReviewDesignModalAction(false)
        return
      }
      showReviewDesignModalAction(true)
    } else {
      this.handleCheckout()()
    }
  }

  handleCheckStore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked }
    } = event
    const { setStoreTerms } = this.props
    setStoreTerms(checked)
  }

  onCheckoutClick = () => {
    const { openStoreInfoAction, cart } = this.props
    const fixedItem = find(cart, 'isFixed')
    if (fixedItem) {
      const sameTeam = every(cart, ['teamStoreId', fixedItem.teamStoreId])
      if (sameTeam) {
        openStoreInfoAction(true)
      } else {
        this.showFixedError()
      }
      return
    }
    this.proceedCheckout()
  }

  handleCloseStoreInfo = () => {
    const { openStoreInfoAction } = this.props
    openStoreInfoAction(false)
  }

  componentDidMount() {
    const {
      setInitialData,
      client: { query }
    } = this.props
    setInitialData(query)
  }

  componentDidUpdate() {
    const { hasChanges } = this.props
    if (hasChanges) {
      this.saveCart()
    }
  }

  componentWillUnmount() {
    this.saveCart(true)
  }

  saveCart = (reset: boolean = false) => {
    const { cart, saveToStorage } = this.props
    saveToStorage(cart, reset)
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
      openStoreInfo,
      storeTerms,
      showDeleteLastItemModal,
      showReviewDesignModal,
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
      const productPriceRanges = get(
        cartItem,
        cartItem.fixedPrices && cartItem.fixedPrices.length
          ? 'fixedPrices'
          : 'product.priceRange',
        []
      )
      // get prices from currency
      const currencyPrices = filter(productPriceRanges, {
        abbreviation: currentCurrency || config.defaultCurrency
      })

      symbol = currencyPrices[0].shortName
      const teamStoreRange = cartItem.teamStoreId && cartItem.isFixed ? 0 : 1
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
          price={
            currencyPrices[
            cartItem.teamStoreId ? teamStoreRange : priceRangeToApply
            ]
          }
          image={
            cartItem.designId
              ? cartItem.designImage || ''
              : cartItem.product.images[0].front
          }
          currencySymbol={symbol}
          cartItem={cartItem}
          isFixed={cartItem.isFixed}
          teamStoreItem={cartItem.teamStoreItem}
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
          disable={cartItem.fixedCart}
          {...{ history, openFitInfoAction, openFitInfo }}
        />
      )
    })

    const designReviewModal = (
      <CheckoutDesignCheckModal
        requestClose={this.onCheckoutClick}
        handleContinue={this.handleCheckout()}
        handleAccept={this.handleCheckout(true)}
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
          <Modal
            visible={openStoreInfo}
            width="682px"
            closable={false}
            footer={null}
            destroyOnClose={true}
          >
            <ModalHeader>
              {formatMessage(messages.aboutStoreInfo)}
              <CloseIcon src={closeIcon} onClick={this.handleCloseStoreInfo} />
            </ModalHeader>
            <StoreInfo
              dangerouslySetInnerHTML={{
                __html: formatMessage(messages.storeInfoText)
              }}
            />
            <Checkbox checked={storeTerms} onChange={this.handleCheckStore}>
              {formatMessage(messages.terms)}
            </Checkbox>
            <ButtonContainer>
              <ContinueButton
                onClick={this.proceedCheckout}
                disabled={!storeTerms}
              >
                {formatMessage(messages.continue)}
              </ContinueButton>
            </ButtonContainer>
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
  const appProps = state.get('app').toJS()
  return {
    ...shoppingProps,
    ...langProps,
    ...appProps
  }
}

const ShoppingCartPageEnhance = compose(
  withApollo,
  injectIntl,
  connect(mapStateToProps, { ...shoppingCartPageActions, ...thunkActions })
)(ShoppingCartPage)

export default ShoppingCartPageEnhance
