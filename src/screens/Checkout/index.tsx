/**
 * Checkout Screen - Created by cazarez on 05/05/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import zenscroll from 'zenscroll'
import Steps from 'antd/lib/steps'
import Message from 'antd/lib/message'
import SwipeableViews from 'react-swipeable-views'
import unset from 'lodash/unset'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import PaypalExpressBtn from 'react-paypal-express-checkout-authorize'
import * as checkoutActions from './actions'
import { getTotalItemsIncart } from '../../components/MainLayout/actions'
import messages from './messages'
import { AddAddressMutation, PlaceOrderMutation } from './data'
import { CheckoutTabs } from './constants'
import MediaQuery from 'react-responsive'
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
  StepIcon,
  CheckIcon
} from './styledComponents'
import Layout from '../../components/MainLayout'
import Shipping from '../../components/Shippping'
import Payment from '../../components/Payment'
import Review from '../../components/Review'
import OrderSummary from '../../components/OrderSummary'
import { getTaxQuery } from '../../components/OrderSummary/data'
import {
  AddressType,
  CartItemDetail,
  Product,
  StripeCardData,
  CreditCardData,
  TaxAddressObj
} from '../../types/common'
import config from '../../config/index'
import { getShoppingCartData } from '../../utils/utilsShoppingCart'

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
}

interface Props extends RouteComponentProps<any> {
  client: any
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
  cardExpMonth: string
  cardExpYear: string
  stripeToken: string
  loadingBilling: boolean
  loadingPlaceOrder: boolean
  paymentMethod: string
  openAddressesModal: boolean
  limit: number
  currentPage: number
  skip: number
  showCardForm: boolean
  selectedCard: CreditCardData
  currentCurrency: string
  setStripeCardDataAction: (card: CreditCardData) => void
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
  saveCountryAction: (countryCode: string | null) => void
  openAddressesModalAction: (open: boolean) => void
  setSkipValueAction: (limit: number, pageNumber: number) => void
  showCardFormAction: (open: boolean) => void
  selectCardToPayAction: (card: StripeCardData, selectedCardId: string) => void
}

const stepperTitles = ['SHIPPING', 'PAYMENT', 'REVIEW']
const DESIGNREVIEWFEE = 15
class Checkout extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetReducerAction } = this.props
    resetReducerAction()
  }
  render() {
    const {
      intl,
      history,
      location,
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
      paymentMethod,
      saveCountryAction,
      openAddressesModalAction,
      openAddressesModal,
      skip,
      limit,
      currentPage,
      setSkipValueAction,
      showCardForm,
      showCardFormAction,
      selectCardToPayAction,
      selectedCard,
      currentCurrency
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

    const taxAddress: TaxAddressObj = shippingAddress.country &&
      shippingAddress.stateProvince &&
      shippingAddress.zipCode && {
        country: shippingAddress.country,
        state: shippingAddress.stateProvince,
        zipCode: shippingAddress.zipCode
      }

    const { state: stateLocation } = location
    const { ShippingTab, RevieTab, PaymentTab } = CheckoutTabs

    if (!stateLocation || !stateLocation.cart) {
      return <Redirect to="/us?lang=en&currency=usd" />
    }

    const shoppingCart = stateLocation.cart as CartItems[]
    const shoppingCartData = getShoppingCartData(shoppingCart)
    const { total, totalWithoutDiscount, weightSum } = shoppingCartData
    const { Step } = Steps
    const steps = stepperTitles.map((step, index) => (
      <Step
        key={index}
        title={step}
        icon={
          currentStep > index ? (
            <CheckIcon type="check-circle-o" clickable={currentStep > index} />
          ) : currentStep === index ? (
            <StepIcon clickable={currentStep > index}>{index + 1}</StepIcon>
          ) : null
        }
        onClick={this.handleOnStepClick(index)}
      />
    ))

    const paypalClient = {
      sandbox: config.paypalClientId,
      production: ''
    }

    const {
      state: { proDesign }
    } = location

    const orderButton =
      paymentMethod === 'paypal' ? (
        <PaypalExpressBtn
          env={config.paypalEnv}
          client={paypalClient}
          currency={'USD'} // TODO: set currency
          shipping={1}
          onSuccess={this.onPaypalSuccess}
          onCancel={this.onPaypalCancel}
          onError={this.onPaypalError}
          style={paypalButtonStyle}
          paymentOptions={{ intent: 'authorize' }}
          {...{ total }}
        />
      ) : (
        <PlaceOrderButton
          onClick={this.handleOnPlaceOrder}
          loading={loadingPlaceOrder}
        >
          {intl.formatMessage(messages.placeOrder)}
        </PlaceOrderButton>
      )

    const continueButton = (
      <ContinueButton onClick={this.nextStep}>
        <FormattedMessage {...messages.continueButtonLabel} />
      </ContinueButton>
    )

    const showPaypalButton = currentStep === RevieTab ? orderButton : null
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
                    indexAddressSelected,
                    openAddressesModalAction,
                    openAddressesModal,
                    skip,
                    limit,
                    currentPage,
                    setSkipValueAction
                  }}
                  buttonToRender={continueButton}
                  showContent={currentStep === ShippingTab}
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
                    setPaymentMethodAction,
                    saveCountryAction,
                    showCardForm,
                    showCardFormAction,
                    selectCardToPayAction,
                    selectedCard
                  }}
                  showContent={currentStep === PaymentTab}
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
                    paymentMethod,
                    selectedCard
                  }}
                  currency={currentCurrency || config.defaultCurrency}
                  cart={shoppingCart}
                  showContent={currentStep === RevieTab}
                  formatMessage={intl.formatMessage}
                  goToStep={this.handleOnGoToStep}
                />
              </SwipeableViews>
            </StepsContainer>
            <SummaryContainer>
              <MediaQuery maxWidth={480}>{showPaypalButton}</MediaQuery>
              <OrderSummary
                subtotal={total}
                discount={10}
                country={billingCountry}
                shipAddress={taxAddress}
                weight={weightSum}
                formatMessage={intl.formatMessage}
                total={!proDesign ? total : total + DESIGNREVIEWFEE}
                proDesignReview={proDesign ? DESIGNREVIEWFEE : 0}
                {...{ totalWithoutDiscount }}
              />
              <MediaQuery minWidth={481}>{showPaypalButton}</MediaQuery>
            </SummaryContainer>
          </Content>
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
    zenscroll.toY(0)
  }

  handleOnGoToStep = (step: number) => {
    const { stepAdvanceAction } = this.props
    stepAdvanceAction(step - 1)
    zenscroll.toY(0)
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

  handleOnPlaceOrder = async (event: any, paypalObj?: object) => {
    const {
      location,
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
      indexAddressSelected,
      sameBillingAndShipping,
      setLoadingPlaceOrderAction,
      getTotalItemsIncart: getTotalItemsIncartAction,
      paymentMethod,
      stripeToken,
      selectedCard,
      client,
      currentCurrency
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

    const {
      state: { cart, proDesign }
    } = location
    const shoppingCart = cloneDeep(cart) as CartItems[]

    const cardId = selectedCard && selectedCard.id

    // get taxes and shipping from query
    const shoppingCartData = getShoppingCartData(shoppingCart)
    const { weightSum } = shoppingCartData

    const taxAddress: TaxAddressObj = {
      country: shippingAddress.country,
      state: shippingAddress.stateProvince,
      zipCode: shippingAddress.zipCode
    }

    const data = client.readQuery({
      query: getTaxQuery,
      variables: {
        country: billingCountry,
        weight: weightSum,
        shipAddress: taxAddress
      }
    })

    const taxId = get(data, 'taxes.internalId', null)
    const taxAmount = get(data, 'taxes.total', null)
    const shippingId = get(data, 'shipping.internalId', null)
    const shippingCarrier = get(data, 'shipping.carrier', null)
    const shippingAmount = get(data, 'shipping.total', null)

    /*
    * TODO: Find a better solution to unset these properties
    * from cart Object.
    * Maybe don't save them on localStorage
    */
    forEach(shoppingCart, cartItem => {
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
      unset(cartItem, 'product.details')
      unset(cartItem, 'product.sport_id')
      unset(cartItem, 'product.materials')
      unset(cartItem, 'product.yotpoAverageScore')
      unset(cartItem, 'product.intendedUse')
      unset(cartItem, 'product.retail_version')
      unset(cartItem, 'product.category_id')
      unset(cartItem, 'product.temperatures')
      unset(cartItem, 'product.sports')
      unset(cartItem, 'product.weight')
      forEach(cartItem.product.priceRange, priceRange => {
        unset(priceRange, '__typename')
        unset(priceRange, 'shortName')
        unset(priceRange, 'abbreviation')
      })
      forEach(cartItem.itemDetails, itemDetail => {
        unset(itemDetail, 'gender.__typename')
        unset(itemDetail, 'fit.__typename')
        unset(itemDetail, 'size.__typename')
        unset(itemDetail, '__typename')
      })
    })
    const orderObj = {
      proDesign,
      paymentMethod,
      cardId,
      tokenId: stripeToken,
      cart: shoppingCart,
      shippingAddress,
      billingAddress,
      paypalData: paypalObj || null,
      countrySubsidiary: billingCountry,
      taxId,
      taxAmount,
      shippingId,
      shippingCarrier,
      shippingAmount,
      currency: currentCurrency
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
  const checkoutProps = state.get('checkout').toJS()
  const langProps = state.get('languageProvider').toJS()
  return {
    ...checkoutProps,
    ...langProps
  }
}

const CheckoutEnhance = compose(
  injectIntl,
  AddAddressMutation,
  PlaceOrderMutation,
  withApollo,
  connect(
    mapStateToProps,
    {
      ...checkoutActions,
      getTotalItemsIncart
    }
  )
)(Checkout)

export default CheckoutEnhance
