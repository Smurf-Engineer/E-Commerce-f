/**
 * Checkout Screen - Created by cazarez on 05/05/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import Steps from 'antd/lib/steps'
import Message from 'antd/lib/message'
import SwipeableViews from 'react-swipeable-views'
import unset from 'lodash/unset'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import PaypalExpressBtn from 'react-paypal-express-checkout-authorize'
import * as checkoutActions from './actions'
import { getTotalItemsIncart } from '../../components/MainLayout/actions'
import { resetReducerData as resetReducerShoppingCartAction } from '../ShoppingCartPage/actions'
import messages from './messages'
import { AddAddressMutation, PlaceOrderMutation } from './data'
import {
  Container,
  Content,
  CheckoutTitle,
  StepsContainer,
  SummaryContainer,
  ContinueButton,
  StepWrapper,
  PlaceOrderButton,
  paypalButtonStyle,
  Step
  // SummaryTitle
} from './styledComponents'
import Layout from '../../components/MainLayout'
import Shipping from '../../components/Shippping'
import Payment from '../../components/Payment'
import Review from '../../components/Review'
import OrderSummary from '../../components/OrderSummary'
import {
  AddressType,
  CartItemDetail,
  Product,
  StripeCardData
} from '../../types/common'
import config from '../../config/index'

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  firstName: string
  lastName: string
  street: string
  apartment: string
  country: string
  stateProvince: string
  city: string
  zipCode: string
  phone: string
  hasError: boolean
  showForm: boolean
  indexAddressSelected: number
  billingFirstName: string
  billingLastName: string
  billingStreet: string
  billingApartment: string
  billingCountry: string
  billingStateProvince: string
  billingCity: string
  billingZipCode: string
  billingPhone: string
  billingHasError: boolean
  sameBillingAndShipping: boolean
  currentStep: number
  addNewAddress: any
  placeOrder: any
  cardHolderName: string
  stripeError: string
  cardNumber: string
  cardExpDate: string
  cardBrand: string
  stripeToken: string
  loadingBilling: boolean
  loadingPlaceOrder: boolean
  paymentMethod: string
  setStripeCardDataAction: (stripeCardData: StripeCardData) => void
  setLoadingBillingAction: (loading: boolean) => void
  setLoadingPlaceOrderAction: (loading: boolean) => void
  setStripeErrorAction: (error: string) => void
  stepAdvanceAction: (step: number) => void
  validFormAction: (hasError: boolean) => void
  invalidBillingFormAction: (hasError: boolean) => void
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
  smsCheckAction: (checked: boolean) => void
  emailCheckAction: (checked: boolean) => void
  showAddressFormAction: (show: boolean) => void
  setSelectedAddressAction: (address: AddressType, indexAddress: number) => void
  sameBillingAndAddressCheckedAction: () => void
  sameBillingAndAddressUncheckedAction: () => void
  saveToStorage: (cart: CartItems[]) => void
  resetReducerAction: () => void
  resetReducerShoppingCartAction: () => void
  getTotalItemsIncart: () => void
  setPaymentMethodAction: (method: string) => void
  cart: CartItems[]
}

const stepperTitles = ['SHIPPING', 'PAYMENT', 'REVIEW']
class Checkout extends React.Component<Props, {}> {
  componentWillUnmount() {
    const {
      resetReducerAction,
      resetReducerShoppingCartAction: resetReducerCartAction
    } = this.props
    resetReducerAction()
    resetReducerCartAction()
  }
  render() {
    const {
      intl,
      history,
      currentStep,
      hasError,
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone,
      showForm,
      indexAddressSelected,
      billingFirstName,
      billingLastName,
      billingStreet,
      billingApartment,
      billingCountry,
      billingStateProvince,
      billingCity,
      billingZipCode,
      billingPhone,
      billingHasError,
      cardHolderName,
      cardNumber,
      cardExpDate,
      cardBrand,
      sameBillingAndShipping,
      stripeError,
      loadingBilling,
      loadingPlaceOrder,
      smsCheckAction,
      emailCheckAction,
      inputChangeAction,
      selectDropdownAction,
      showAddressFormAction,
      sameBillingAndAddressCheckedAction,
      sameBillingAndAddressUncheckedAction,
      invalidBillingFormAction,
      setStripeErrorAction,
      setLoadingBillingAction,
      setStripeCardDataAction,
      setPaymentMethodAction,
      cart,
      paymentMethod
    } = this.props

    const shippingAddress: AddressType = {
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone
    }
    const billingAddress: AddressType = {
      firstName: billingFirstName,
      lastName: billingLastName,
      street: billingStreet,
      apartment: billingApartment,
      country: billingCountry,
      stateProvince: billingStateProvince,
      city: billingCity,
      zipCode: billingZipCode,
      phone: billingPhone
    }
    const cardData: StripeCardData = {
      cardNumber,
      cardExpDate,
      cardBrand
    }

    if (isEmpty(cart)) {
      return <Redirect to="/us?lang=en&currency=usd" />
    }

    let totalSum = 0
    if (cart) {
      const total = cart.map((cartItem, index) => {
        const quantities = cartItem.itemDetails.map((itemDetail, ind) => {
          return itemDetail.quantity
        })
        const quantitySum = quantities.reduce((a, b) => a + b, 0)
        return cartItem.product.priceRange[0].price * quantitySum
      })

      totalSum = total.reduce((a, b) => a + b, 0)
    }

    const steps = stepperTitles.map((step, key) => (
      <Step
        clickable={currentStep > key}
        onClick={this.handleOnStepClick(key)}
        title={step}
        {...{ key }}
      />
    ))

    const paypalClient = {
      sandbox: config.paypalClientId,
      production: ''
    }

    const orderButton =
      paymentMethod === 'paypal' ? (
        <PaypalExpressBtn
          env={config.paypalEnv}
          client={paypalClient}
          currency={'USD'}
          total={totalSum}
          shipping={1}
          onSuccess={this.onPaypalSuccess}
          onCancel={this.onPaypalCancel}
          onError={this.onPaypalError}
          style={paypalButtonStyle}
          paymentOptions={{ intent: 'authorize' }}
        />
      ) : (
        <PlaceOrderButton
          onClick={e => this.handleOnPlaceOrder(e, {})}
          loading={loadingPlaceOrder}
        >
          {intl.formatMessage(messages.placeOrder)}
        </PlaceOrderButton>
      )

    return (
      <Layout {...{ history, intl }}>
        <Container>
          <CheckoutTitle>
            {intl.formatMessage(messages.title).toLocaleUpperCase()}
          </CheckoutTitle>
          <Content>
            <StepsContainer>
              <StepWrapper>
                <Steps current={currentStep}>{steps}</Steps>
              </StepWrapper>
              <SwipeableViews index={currentStep}>
                <Shipping
                  {...{
                    hasError,
                    shippingAddress,
                    smsCheckAction,
                    emailCheckAction,
                    inputChangeAction,
                    selectDropdownAction,
                    showForm,
                    showAddressFormAction,
                    indexAddressSelected
                  }}
                  showContent={currentStep === 0}
                  setSelectedAddress={this.handleOnSelectAddress}
                  formatMessage={intl.formatMessage}
                />
                <Payment
                  {...{
                    billingAddress,
                    cardHolderName,
                    stripeError,
                    setStripeErrorAction,
                    inputChangeAction,
                    selectDropdownAction,
                    sameBillingAndShipping,
                    sameBillingAndAddressCheckedAction,
                    sameBillingAndAddressUncheckedAction,
                    invalidBillingFormAction,
                    loadingBilling,
                    setLoadingBillingAction,
                    setStripeCardDataAction,
                    setPaymentMethodAction
                  }}
                  showContent={currentStep === 1}
                  formatMessage={intl.formatMessage}
                  hasError={billingHasError}
                  nextStep={this.nextStep}
                />
                <Review
                  {...{
                    shippingAddress,
                    billingAddress,
                    cardData,
                    cardHolderName,
                    cart,
                    paymentMethod
                  }}
                  showContent={currentStep === 2}
                  formatMessage={intl.formatMessage}
                  goToStep={this.handleOnGoToStep}
                />
              </SwipeableViews>
            </StepsContainer>
            <SummaryContainer>
              <OrderSummary
                total={totalSum}
                subtotal={totalSum}
                discount={10}
                formatMessage={intl.formatMessage}
              />
              {currentStep === 2 ? orderButton : null}
            </SummaryContainer>
          </Content>
          {currentStep === 0 ? (
            <ContinueButton onClick={this.nextStep}>
              {'Continue'}
            </ContinueButton>
          ) : null}
        </Container>
      </Layout>
    )
  }

  handleOnStepClick = (step: number) => () => {
    const { currentStep } = this.props
    if (step < currentStep) {
      this.handleOnGoToStep(step + 1)
    }
  }

  nextStep = () => {
    const { currentStep } = this.props
    switch (currentStep) {
      case 0:
        this.verifyStepOne()
        break
      case 1:
        this.verifyStepTwo()
        break
      default:
        break
    }
  }

  handleOnGoToStep = (step: number) => {
    const { stepAdvanceAction } = this.props
    stepAdvanceAction(step - 1)
  }

  verifyStepTwo = () => {
    const { currentStep, stepAdvanceAction } = this.props
    stepAdvanceAction(currentStep + 1)
  }

  verifyStepOne = () => {
    const {
      currentStep,
      stepAdvanceAction,
      firstName,
      lastName,
      street,
      country,
      stateProvince,
      city,
      zipCode,
      phone,
      validFormAction
    } = this.props

    const error =
      !firstName ||
      !lastName ||
      !street ||
      !country ||
      !stateProvince ||
      !city ||
      !zipCode ||
      !phone
    if (error) {
      validFormAction(error)
      return
    }
    stepAdvanceAction(currentStep + 1)
  }

  saveAddress = async (address: AddressType) => {
    const { addNewAddress } = this.props
    const {
      data: { createUserAddress }
    } = await addNewAddress({
      variables: { address }
    })

    return createUserAddress
  }

  handleOnSelectAddress = (address: AddressType, index: number) => {
    const { setSelectedAddressAction } = this.props
    setSelectedAddressAction(address, index)
  }

  onPaypalSuccess = (payment: any) => {
    // paypal payment succeded
    const obj = {
      paymentId: payment.paymentID,
      payerId: payment.payerID
    }
    this.handleOnPlaceOrder(undefined, obj)
  }

  onPaypalCancel = (data: AnalyserNode) => {
    // User pressed "cancel" or close Paypal's popup!
    console.error('The payment was cancelled!', data)
  }

  onPaypalError = (err: any) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.error('Error!', err)
    Message.error(err, 5)
  }

  handleOnPlaceOrder = async (event?: any, paypalObj?: object) => {
    const {
      placeOrder,
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone,
      billingFirstName,
      billingLastName,
      billingStreet,
      billingApartment,
      billingCountry,
      billingStateProvince,
      billingCity,
      billingZipCode,
      billingPhone,
      stripeToken,
      cart,
      indexAddressSelected,
      sameBillingAndShipping,
      setLoadingPlaceOrderAction,
      getTotalItemsIncart: getTotalItemsIncartAction,
      paymentMethod
    } = this.props

    const shippingAddress: AddressType = {
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone
    }
    const billingAddress: AddressType = {
      firstName: billingFirstName,
      lastName: billingLastName,
      street: billingStreet,
      apartment: billingApartment,
      country: billingCountry,
      stateProvince: billingStateProvince,
      city: billingCity,
      zipCode: billingZipCode,
      phone: billingPhone
    }

    if (indexAddressSelected === -1) {
      this.saveAddress(shippingAddress)
    }
    if (paymentMethod === 'credit card' && !sameBillingAndShipping) {
      this.saveAddress(billingAddress)
    }

    /*
    * TODO: Find a better solution to unset these properties
    * from cart Object.
    * Maybe don't save them on localStorage
    */
    forEach(cart, cartItem => {
      unset(cartItem, 'designImage')
      unset(cartItem, 'designName')
      unset(cartItem, 'product.shortDescription')
      unset(cartItem, 'product.isTopProduct')
      unset(cartItem, 'product.__typename')
      unset(cartItem, 'product.genders')
      unset(cartItem, 'product.fitStyles')
      unset(cartItem, 'product.retailMen')
      unset(cartItem, 'product.collections')
      unset(cartItem, 'product.images')
      unset(cartItem, 'product.type')
      unset(cartItem, 'product.retailWomen')
      unset(cartItem, 'product.customizable')
      unset(cartItem, 'product.description')
      unset(cartItem, 'product.sizeRange')
      forEach(cartItem.product.priceRange, priceRange => {
        unset(priceRange, '__typename')
      })
      forEach(cartItem.itemDetails, itemDetail => {
        unset(itemDetail, 'gender.__typename')
        unset(itemDetail, 'fit.__typename')
      })
    })
    const orderObj = {
      paymentMethod,
      token: stripeToken,
      cart,
      shippingAddress,
      billingAddress,
      paypalData: paypalObj || null
    }
    try {
      setLoadingPlaceOrderAction(true)
      const response = await placeOrder({
        variables: { orderObj }
      })
      const orderId = get(response, 'data.charge.short_id', '')
      localStorage.removeItem('cart')
      setLoadingPlaceOrderAction(false)
      getTotalItemsIncartAction()

      const { history } = this.props
      history.push(`/order-placed?orderId=${orderId}`)
    } catch (error) {
      setLoadingPlaceOrderAction(false)
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    }
  }
}

const mapStateToProps = (state: any) => {
  const checkout = state.get('checkout').toJS()
  const shopppingCart = state.get('shoppingCartPage').toJS()

  return { ...checkout, ...shopppingCart }
}

const CheckoutEnhance = compose(
  injectIntl,
  AddAddressMutation,
  PlaceOrderMutation,
  connect(
    mapStateToProps,
    {
      ...checkoutActions,
      getTotalItemsIncart,
      resetReducerShoppingCartAction
    }
  )
)(Checkout)

export default CheckoutEnhance
