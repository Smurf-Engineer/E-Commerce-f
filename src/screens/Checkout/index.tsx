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
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import PaypalExpressBtn from 'react-paypal-express-checkout-authorize'
import * as checkoutActions from './actions'
import { getTotalItemsIncart } from '../../components/MainLayout/actions'
import messages from './messages'
import { AddAddressMutation, PlaceOrderMutation } from './data'
import { CheckoutTabs } from './constants'
import MediaQuery from 'react-responsive'
import { isPoBox, isApoCity } from '../../utils/utilsAddressValidation'

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
  CheckIcon,
  CurrencyWarningText
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
import Modal from 'antd/lib/modal'
import ModalFooter from '../../components/ModalFooter'

type ProductCart = {
  id: number
  code: string
  yotpoId: string
  name: string
}

interface CartItem {
  designId: string
  designCode: string
  product: ProductCart
  itemDetails: CartItemDetail[]
}

interface CartItems {
  designId: string
  designCode: string
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
  stateProvinceCode: string
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
  openCurrencyWarning: boolean
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
  openCurrencyWarningAction: (open: boolean) => void
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
      stateProvinceCode,
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
      currentCurrency,
      openCurrencyWarning
    } = this.props

    const shippingAddress: AddressType = {
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      stateProvinceCode,
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
      stateProvinceCode: billingStateProvince,
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
        state: shippingAddress.stateProvinceCode,
        zipCode: shippingAddress.zipCode
      }

    const { state: stateLocation } = location
    const { ShippingTab, RevieTab, PaymentTab } = CheckoutTabs

    if (!stateLocation || !stateLocation.cart) {
      return <Redirect to="/us?lang=en&currency=usd" />
    }

    const shoppingCart = stateLocation.cart as CartItems[]
    const shoppingCartData = getShoppingCartData(
      shoppingCart,
      currentCurrency || config.defaultCurrency
    )
    const { total, totalWithoutDiscount, weightSum, symbol } = shoppingCartData
    const { Step } = Steps
    const steps = stepperTitles.map((step, index) => (
      <Step
        key={index}
        title={step}
        icon={
          currentStep > index ? (
            <StepIcon clickable={currentStep > index}>
              <CheckIcon type="check-circle-o" />
            </StepIcon>
          ) : currentStep === index ? (
            <StepIcon>{index + 1}</StepIcon>
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
          currency={
            currentCurrency
              ? currentCurrency.toUpperCase()
              : config.defaultCurrency.toUpperCase()
          }
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
              <SwipeableViews index={currentStep} disabled={true}>
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
                    selectedCard,
                    paymentMethod
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
                currencySymbol={symbol}
                {...{ totalWithoutDiscount }}
              />
              <MediaQuery minWidth={481}>{showPaypalButton}</MediaQuery>
            </SummaryContainer>
          </Content>
        </Container>
        <Modal
          visible={openCurrencyWarning}
          footer={
            <ModalFooter
              okText={intl.formatMessage(messages.confirm)}
              onOk={this.placeOrder}
              onCancel={this.handleOnCancelWarning}
              formatMessage={intl.formatMessage}
            />
          }
          destroyOnClose={false}
          maskClosable={false}
          closable={false}
        >
          <CurrencyWarningText>
            {intl.formatMessage(messages.correctCurrency, {
              currentCurrency: (
                currentCurrency || config.defaultCurrency
              ).toUpperCase()
            })}
          </CurrencyWarningText>
        </Modal>
      </Layout>
    )
  }

  handleOnCancelWarning = () => {
    const { openCurrencyWarningAction } = this.props
    openCurrencyWarningAction(false)
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
      !phone ||
      isPoBox(street) ||
      isApoCity(city)

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
    this.placeOrder(undefined, obj)
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

  handleOnPlaceOrder = (event: any) => {
    // TODO: Change the condition for a validation of currencies between
    // the selected one and the one from billingAddress.
    const condition = true
    if (condition) {
      const { openCurrencyWarningAction } = this.props
      return openCurrencyWarningAction(true)
    }
    this.placeOrder(event)
  }

  placeOrder = async (event: any, paypalObj?: object) => {
    const {
      location,
      placeOrder,
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      stateProvinceCode,
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
      client: { query },
      currentCurrency
    } = this.props

    const shippingAddress: AddressType = {
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      stateProvinceCode,
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
      stateProvinceCode: billingStateProvince,
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
    const shoppingCartData = getShoppingCartData(
      shoppingCart,
      currentCurrency || config.defaultCurrency
    )
    const { weightSum } = shoppingCartData

    const taxAddress: TaxAddressObj = {
      country: shippingAddress.country,
      state: shippingAddress.stateProvinceCode,
      zipCode: shippingAddress.zipCode
    }

    const taxResponse = await query({
      query: getTaxQuery,
      variables: {
        country: billingCountry,
        weight: weightSum,
        shipAddress: taxAddress
      },
      fetchPolicy: 'network-only'
    })

    const {
      data: { taxes, shipping }
    } = taxResponse

    const taxId = get(taxes, 'internalId', null)
    const taxAmount = get(taxes, 'total', null)
    const shippingId = get(shipping, 'internalId', null)
    const shippingCarrier = get(shipping, 'carrier', null)
    const shippingAmount = get(shipping, 'total', '0')

    const sanitizedCart = shoppingCart.map(
      ({ designCode, designId, product, itemDetails }: CartItems) => {
        const item = { designCode, designId } as CartItem
        const productItem = {
          id: product.id,
          code: product.code,
          name: product.name,
          yotpoId: product.yotpoId
        }
        item.product = productItem
        item.itemDetails = itemDetails.map(
          ({ gender, quantity, size, fit }: any) => {
            unset(gender, '__typename')
            unset(quantity, '__typename')
            unset(size, '__typename')
            unset(fit, '__typename')
            return { gender, quantity, size, fit }
          }
        )
        return item
      }
    )

    const orderObj = {
      proDesign,
      paymentMethod,
      cardId,
      tokenId: stripeToken,
      cart: sanitizedCart,
      shippingAddress,
      billingAddress,
      paypalData: paypalObj || null,
      countrySubsidiary: billingCountry,
      taxId,
      taxAmount,
      shippingId,
      shippingCarrier,
      shippingAmount: shippingAmount || '0',
      currency: currentCurrency || config.defaultCurrency,
      weight: weightSum
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
