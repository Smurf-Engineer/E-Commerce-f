/**
 * StoreFront Screen - Created by gustavomedina on 11/04/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'
import get from 'lodash/get'
import * as thunkActions from './thunkActions'
import * as storeFrontActions from './actions'
import { isPhoneNumber } from '../../utils/utilsFiles'
import Badge from 'antd/lib/badge'
import { QueryProps, UserType, ContactInformation, CartItems } from '../../types/common'
import {
  AnimatedDiv,
  BounceDiv,
  CartButtonOpen,
  CartDiv,
  CartIcon,
  CartIconMini,
  CartInfo,
  CartItemDiv,
  CartList,
  CartThumbnail,
  CartTitle,
  CartTitleLabel,
  CloseIcon,
  Container,
  DeleteIcon,
  DesignCode,
  DesignName,
  GenderName,
  ProductName,
  Quantity,
  ShoppingCartIcon,
  SizeName,
  UpgradeName,
  UpgradeValue
} from './styledComponents'
import TeamsLayout from '../../components/MainLayout'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import StoreFrontContent from '../../components/StoreFrontContent'
import { getSessionCode } from './thunkActions'
import Helmet from 'react-helmet'
import messages from './messages'
import findIndex from 'lodash/findIndex'
import { getTotalItemsIncart } from '../../components/MainLayout/actions'
import { saveCartCloud } from '../../components/MainLayout/api'
import isEqual from 'lodash/isEqual'

interface Params extends QueryProps {
  teamStoreId: String
  passCode: String
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  openShare: boolean
  history: any
  openPassCode: boolean
  openEmailContact: boolean
  passCode: string
  emailContact: string
  emailMessage: string
  sendMessageLoading: boolean
  currentCurrency: string
  user: UserType
  shoppingCart: any
  itemsInCart: number
  openCartDiv: boolean
  contactInfo: ContactInformation
  skip: number
  pageNumber: number
  client: any
  getTotalItemsIncart: () => void
  setInitialData: (query: any) => void
  teamStoreQuery: (variables: {}) => void
  openShareModalAction: (open: boolean, id?: string) => void
  openQuickView: (id: number, yotpoId: string | null) => void
  openPassCodeDialogAction: (open: boolean) => void
  setPassCodeAction: (passCode: string) => void
  openEmailContactDialogAction: (open: boolean) => void
  setEmailContactAction: (email: string) => void
  setEmailMessageAction: (message: string) => void
  sendMessageLoadingAction: (loading: boolean) => void
  setContactFieldAction: (field: string, value: string) => void
  setPageAction: (skip: number, pageNumber: number) => void
}

export class StoreFront extends React.Component<Props, {}> {
  state = {
    showDetails: true,
    showSpecs: true,
    openCartDiv: false,
    bounceCart: false
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  getData = async (params: Params) => {
    const { teamStoreQuery } = this.props
    const response = await teamStoreQuery({
      variables: { teamStoreId: params.teamStoreId, passCode: params.passCode }
    })
    const data = get(response, 'data.getTeamStore', false)

    if (data) {
      return data
    }

    return {}
  }

  componentDidUpdate(prevProps: Props) {
    const { shoppingCart: prevCart, itemsInCart: prevItems } = prevProps || {}
    const { shoppingCart, itemsInCart } = this.props
    let numberOfProducts = 0
    if (shoppingCart.cart) {
      const cart = shoppingCart.cart as CartItems[]
      cart.map((cartItem) => {
        const quantities = cartItem.itemDetails.map((itemDetail, ind) => {
          return itemDetail.quantity
        })
        const quantitySum = quantities.reduce((a, b) => a + b, 0)
        numberOfProducts = numberOfProducts + quantitySum
      })
    }
    const newNumber = shoppingCart.cart && shoppingCart.cart.length > 0
      ? numberOfProducts : itemsInCart

    let numberOfProductsOld = 0

    if (prevCart.cart) {
      const cart = prevCart.cart as CartItems[]
      cart.map((cartItem) => {
        const quantities = cartItem.itemDetails.map((itemDetail, ind) => {
          return itemDetail.quantity
        })

        const quantitySum = quantities.reduce((a, b) => a + b, 0)

        numberOfProductsOld = numberOfProductsOld + quantitySum
      })
    }

    const prevNumber = prevCart.cart && prevCart.cart.length > 0
      ? numberOfProductsOld : prevItems
    
    if (newNumber !== prevNumber) {
      this.setState({ bounceCart: true })
    }
  }

  closePassCodeModal = () => {
    const { openPassCodeDialogAction } = this.props
    openPassCodeDialogAction(false)
  }

  handleOpenPassCode = () => {
    const { openPassCodeDialogAction } = this.props
    openPassCodeDialogAction(true)
  }
  handleOnContactFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setContactFieldAction } = this.props
    const {
      currentTarget: { id, value }
    } = event

    if (id === 'phone' && !isPhoneNumber(value) && value !== '') {
      return
    }
    setContactFieldAction(id, value)
  }

  goToCartPage = () => {
    const { history } = this.props
    history.push('/shopping-cart')
  }

  closeCart = () => {
    this.setState({ openCartDiv: false })
  }

  openCart = () => {
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      this.goToCartPage()
    } else {
      this.setState({ openCartDiv: true })
    }
  }

  removeItem = (id: string, itemDetail: number) => {
    if (itemDetail) {
      const { setInitialData, getTotalItemsIncart: getItemsAction, client: { query } } = this.props
      let cartListFromLS = []
      if (typeof window !== 'undefined') {
        cartListFromLS = JSON.parse(localStorage.getItem('cart') || '{}')
      }
      const designIndex = cartListFromLS && cartListFromLS.length > 0 ? 
        cartListFromLS.findIndex(({ designId, itemDetails }: CartItems) => 
        designId === id && itemDetails && itemDetails[0] && isEqual(itemDetails[0], itemDetail)) : []
      if (designIndex !== -1) {
        cartListFromLS.splice(designIndex, 1)
        const cart = JSON.stringify(cartListFromLS)
        localStorage.setItem('cart', cart)
        saveCartCloud(cart)
        this.forceUpdate()
        setInitialData(query)
        getItemsAction()
      }
    }
  }

  render() {
    const {
      intl,
      openShare,
      history,
      setPassCodeAction,
      passCode,
      openEmailContact,
      emailContact,
      emailMessage,
      openQuickView,
      setEmailContactAction,
      setEmailMessageAction,
      sendMessageLoading,
      sendMessageLoadingAction,
      openEmailContactDialogAction,
      openShareModalAction,
      openPassCodeDialogAction,
      currentCurrency,
      user,
      itemsInCart,
      shoppingCart,
      contactInfo,
      skip,
      pageNumber,
      setPageAction
    } = this.props
    const {
      location: { search }
    } = this.props
    const { bounceCart, openCartDiv } = this.state
    const queryParams = queryString.parse(search)
    const storeId = queryParams ? queryParams.storeId || '' : ''
    const titleProp = queryParams ? queryParams.titleProp : ''
    const bannerProp = queryParams ? queryParams.bannerProp : ''
    const storedCode = getSessionCode(storeId)
    let numberOfProducts = 0

    if (shoppingCart.cart) {
      const cart = shoppingCart.cart as CartItems[]
      cart.map((cartItem) => {
        const quantities = cartItem.itemDetails.map((itemDetail, ind) => {
          return itemDetail.quantity
        })

        const quantitySum = quantities.reduce((a, b) => a + b, 0)

        numberOfProducts = numberOfProducts + quantitySum
      })
    }

    const numberOfProductsInCart = shoppingCart.cart && shoppingCart.cart.length > 0
      ? numberOfProducts : itemsInCart
    if (bounceCart) {
      setTimeout(() => { this.setState({ bounceCart: false }) }, 2000)
    }
    let cartListFromLS = []
    let cartList: CartItems[] = []
    if (typeof window !== 'undefined') {
      cartListFromLS = JSON.parse(localStorage.getItem('cart') || '{}')
    }
    if (cartListFromLS && cartListFromLS.length > 0) {
      for (let i = 0; i < cartListFromLS.length; i++) {
        const item = cartListFromLS[i] || {}
        if (i === 0) {
          cartList.push(item)
          continue
        }
        const indexOfSameProduct = findIndex(cartList, (cartItem) => {
          return (
            cartItem.product.id === item.product.id &&
            item.designId === cartItem.designId
          )
        })
        if (indexOfSameProduct !== -1) {
          const itemToUpdate = cartList[indexOfSameProduct]
          cartList[indexOfSameProduct].itemDetails = [
            ...itemToUpdate.itemDetails,
            ...item.itemDetails
          ]
        } else {
          cartList.push(item)
        }
      }
    }

    // tslint:disable-next-line: max-line-length
    const shareStoreUrl = `https://jakroo.com/store-front?storeId=${storeId}&titleProp=${titleProp}&bannerProp=${bannerProp}`
    return (
      <TeamsLayout teamStoresHeader={true} {...{ intl, history }}>
        <Container>
          <Helmet
            meta={[
              { property: 'og:title', content: titleProp ? decodeURIComponent(titleProp) : 'My Team Store' },
              { property: 'og:description', content: 'Visit my Team Store on Jakroo'},
              { property: 'og:url', content: shareStoreUrl },
              { property: 'og:type', content: 'article' },
              {
                property: 'og:image',
                content: bannerProp ? bannerProp 
                : 'https://jakroo.com/static/media/teamStoreSearch.9279d162.jpg'
              }
            ]}
            title={titleProp}
          />
          <StoreFrontContent
            formatMessage={intl.formatMessage}
            openQuickViewAction={openQuickView}
            openEmailContactDialogAction={openEmailContactDialogAction}
            openShareModalAction={openShareModalAction}
            openShare={openShare}
            teamStoreId={storeId}
            passCode={passCode || storedCode}
            setOpenPassCodeDialog={openPassCodeDialogAction}
            openEmailContact={openEmailContact}
            emailContact={emailContact}
            emailMessage={emailMessage}
            sendMessageLoading={sendMessageLoading}
            setEmailContactAction={setEmailContactAction}
            setEmailMessageAction={setEmailMessageAction}
            sendMessageLoadingAction={sendMessageLoadingAction}
            setPassCodeAction={setPassCodeAction}
            handleInputChange={this.handleOnContactFieldChange}
            setPage={setPageAction}
            {...{
              history,
              currentCurrency,
              user,
              contactInfo,
              pageNumber,
              skip
            }}
          />
          <AnimatedDiv>
            <BounceDiv secondary={bounceCart}>
              <CartIcon onClick={this.openCart}>
                <Badge count={numberOfProductsInCart} overflowCount={9}>
                  <ShoppingCartIcon type="shopping-cart" />
                </Badge>
              </CartIcon>
            </BounceDiv>
          </AnimatedDiv>
          {openCartDiv && intl &&
            <CartDiv>
              <CartTitle>
                <CartTitleLabel>
                  <CartIconMini type="shopping" />
                  {intl.formatMessage(messages.myCart)} ({numberOfProductsInCart})
                </CartTitleLabel>
                <CloseIcon type="close" onClick={this.closeCart}/>
              </CartTitle>
              <CartList>
                {cartList.map((cartItem: CartItems) => {
                  const productItem = cartItem.product ? cartItem.product : {}
                  const upgradeOneObj = productItem ? productItem.upgradeOne : {}
                  const upgradeOneName = upgradeOneObj && upgradeOneObj.enabled ? upgradeOneObj.name : ''
  
                  const upgradeTwoObj = productItem ? productItem.upgradeTwo : {}
                  const upgradeTwoName = upgradeTwoObj && upgradeTwoObj.enabled ? upgradeTwoObj.name : ''
  
                  const upgradeThreeObj = productItem ? productItem.upgradeThree : {}
                  const upgradeThreeName = upgradeThreeObj && upgradeThreeObj.enabled ? upgradeThreeObj.name : ''
                  
                  const variableOneName = productItem ? productItem.variableOne : ''
                  const variableTwoName = productItem ? productItem.variableTwo : ''
  
                  return cartItem.itemDetails.map((itemDetail, index: number) =>
                    <CartItemDiv key={index}>
                      <CartThumbnail src={cartItem.designImage} />
                      <CartInfo>
                        <DesignName>
                          {cartItem.designName}
                        </DesignName>
                        <DesignCode>
                          {cartItem.designCode}
                        </DesignCode>
                        <ProductName>
                          {cartItem.product.name} {cartItem.product.shortDescription}
                        </ProductName>
                        <GenderName>
                          Gender: {itemDetail.gender ? itemDetail.gender.name : '-'}
                        </GenderName>
                        <SizeName>
                          Size: {itemDetail.size ? itemDetail.size.name : '-'}
                        </SizeName>
                        {upgradeOneName &&
                          <UpgradeName>
                            {upgradeOneName}:
                            <UpgradeValue>{itemDetail.firstUpgrade ? itemDetail.firstUpgrade.name : '-'}</UpgradeValue>
                          </UpgradeName>
                        }
                        {upgradeTwoName &&
                          <UpgradeName>
                            {upgradeTwoName}:
                            <UpgradeValue>
                              {itemDetail.secondUpgrade ? itemDetail.secondUpgrade.name : '-'}
                            </UpgradeValue>
                          </UpgradeName>
                        }
                        {upgradeThreeName &&
                          <UpgradeName>
                            {upgradeThreeName}:
                            <UpgradeValue>{itemDetail.thirdUpgrade ? itemDetail.thirdUpgrade.name : '-'}</UpgradeValue>
                          </UpgradeName>
                        }
                        {variableOneName && itemDetail.variableOneValue &&
                          <UpgradeName>
                            {variableOneName}:
                            <UpgradeValue>{itemDetail.variableOneValue || '-'}</UpgradeValue>
                          </UpgradeName>
                        }
                        {variableTwoName && itemDetail.variableOneValue &&
                          <UpgradeName>
                            {variableTwoName}:
                            <UpgradeValue>{itemDetail.variableOneValue || '-'}</UpgradeValue>
                          </UpgradeName>
                        }
                        <Quantity>
                          {itemDetail.quantity}
                        </Quantity>
                        <DeleteIcon
                          onClick={() => this.removeItem(cartItem.designId, itemDetail)}
                          type="cross"
                        />
                      </CartInfo>
                    </CartItemDiv>
                  )}
                )}
              </CartList>
              <CartButtonOpen onClick={this.goToCartPage}>{intl.formatMessage(messages.openCart)}</CartButtonOpen>
            </CartDiv>
          }
        </Container>
      </TeamsLayout>
    )
  }
}

const mapStateToProps = (state: any) => {
  const layoutProps = state.get('layout').toJS()
  const shoppingCart = state.get('shoppingCartPage').toJS()
  const storeFrontPops = state.get('storeFront').toJS()
  const langProps = state.get('languageProvider').toJS()
  return {
    ...storeFrontPops,
    ...langProps,
    user: state.get('app').get('user'),
    shoppingCart: { ...shoppingCart },
    itemsInCart: layoutProps.itemsInCart
  }
}

const StoreFrontEnhance = compose(
  withApollo,
  injectIntl,
  connect(
    mapStateToProps,
    {
      ...storeFrontActions,
      ...thunkActions,
      getTotalItemsIncart,
      openQuickView: openQuickViewAction
    }
  )
)(StoreFront)

export default StoreFrontEnhance
