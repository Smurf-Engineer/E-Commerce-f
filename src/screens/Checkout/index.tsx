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
import * as checkoutActions from './actions'
import { getTotalItemsIncart } from '../../components/MainLayout/actions'
import messages from './messages'
import { AddAddressMutation, PlaceOrderMutation, CurrencyQuery } from './data'
import { CheckoutTabs, PaymentOptions } from './constants'

import { isPoBox, isApoCity } from '../../utils/utilsAddressValidation'

import {
  Container,
  Content,
  CheckoutTitle,
  StepsContainer,
  SummaryContainer,
  ContinueButton,
  StepWrapper,
  StepIcon,
  CheckIcon,
  CurrencyWarningText,
  PlaceOrderLoading
} from './styledComponents'
import Layout from '../../components/MainLayout'
import Shipping from '../../components/Shippping'
import Payment from '../../components/Payment'
import Review from '../../components/Review'
import {
  AddressType,
  CartItemDetail,
  Product,
  StripeCardData,
  IbanData,
  CreditCardData,
  TaxAddressObj,
  ItemDetailType,
  CouponCode
} from '../../types/common'
import config from '../../config/index'
import { getShoppingCartData } from '../../utils/utilsShoppingCart'
import Modal from 'antd/lib/modal'
import ModalFooter from '../../components/ModalFooter'
import CheckoutSummary from './CheckoutSummary'
import { getTaxQuery } from './CheckoutSummary/data'
import { DEFAULT_ROUTE } from '../../constants'
import Spin from 'antd/lib/spin'

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
  email: string
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
  showBillingForm: boolean
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
  ibanError: boolean
  cardNumber: string
  cardExpDate: string
  cardBrand: string
  cardExpMonth: string
  cardExpYear: string
  ibanData: IbanData
  stripeToken: string
  stripeSource: string
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
  couponCode?: CouponCode
  openCurrencyWarning: boolean
  // Redux actions
  setStripeCardDataAction: (card: CreditCardData) => void
  setStripeIbanDataAction: (iban: IbanData) => void
  setLoadingBillingAction: (loading: boolean) => void
  setLoadingPlaceOrderAction: (loading: boolean) => void
  setStripeErrorAction: (error: string) => void
  setIbanErrorAction: (isError: boolean) => void
  stepAdvanceAction: (step: number) => void
  validFormAction: (hasError: boolean) => void
  invalidBillingFormAction: (hasError: boolean) => void
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
  smsCheckAction: (checked: boolean) => void
  emailCheckAction: (checked: boolean) => void
  showAddressFormAction: (show: boolean) => void
  showBillingAddressFormAction: (show: boolean) => void
  setSelectedAddressAction: (
    address: AddressType,
    indexAddress: number,
    billing: boolean
  ) => void
  setSelectedAddressesAction: (
    address: AddressType,
    indexAddress: number
  ) => void
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
  setCouponCodeAction: (code: CouponCode) => void
  deleteCouponCodeAction: () => void
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
      email,
      street,
      apartment,
      country,
      stateProvince,
      stateProvinceCode,
      city,
      zipCode,
      phone,
      showForm,
      showBillingForm,
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
      ibanData,
      sameBillingAndShipping,
      stripeError,
      ibanError,
      loadingBilling,
      loadingPlaceOrder,
      smsCheckAction,
      emailCheckAction,
      inputChangeAction,
      selectDropdownAction,
      showAddressFormAction,
      showBillingAddressFormAction,
      sameBillingAndAddressCheckedAction,
      sameBillingAndAddressUncheckedAction,
      invalidBillingFormAction,
      setStripeErrorAction,
      setIbanErrorAction,
      setLoadingBillingAction,
      setStripeCardDataAction,
      setStripeIbanDataAction,
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
      couponCode,
      setCouponCodeAction,
      deleteCouponCodeAction,
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

    // const IbanData: StripeCardData = {
    //   cardNumber,
    //   cardExpDate,
    //   cardBrand
    // }

    const taxAddress: TaxAddressObj = shippingAddress.country &&
      shippingAddress.stateProvince &&
      shippingAddress.zipCode && {
        country: shippingAddress.country,
        state: shippingAddress.stateProvinceCode,
        zipCode: shippingAddress.zipCode
      }

    const { state: stateLocation } = location
    const { ShippingTab, ReviewTab, PaymentTab } = CheckoutTabs

    if (!stateLocation || !stateLocation.cart || !stateLocation.cart.length) {
      return <Redirect to={DEFAULT_ROUTE} />
    }

    const { cart } = stateLocation
    const shoppingCart = cloneDeep(cart) as CartItems[]

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

    const {
      state: { proDesign }
    } = location

    const proDesignReview = proDesign ? DESIGNREVIEWFEE : 0

    const continueButton = (
      <ContinueButton onClick={this.nextStep}>
        <FormattedMessage {...messages.continueButtonLabel} />
      </ContinueButton>
    )

    const showOrderButton = currentStep === ReviewTab

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
                    email,
                    billingAddress,
                    cardHolderName,
                    stripeError,
                    ibanError,
                    setStripeErrorAction,
                    setIbanErrorAction,
                    inputChangeAction,
                    selectDropdownAction,
                    sameBillingAndShipping,
                    sameBillingAndAddressCheckedAction,
                    sameBillingAndAddressUncheckedAction,
                    invalidBillingFormAction,
                    loadingBilling,
                    setLoadingBillingAction,
                    setStripeCardDataAction,
                    setStripeIbanDataAction,
                    setPaymentMethodAction,
                    saveCountryAction,
                    showCardForm,
                    showCardFormAction,
                    selectCardToPayAction,
                    selectedCard,
                    paymentMethod,
                    skip,
                    currentPage,
                    indexAddressSelected,
                    limit,
                    setSkipValueAction,
                    showBillingForm,
                    showBillingAddressFormAction
                  }}
                  showContent={currentStep === PaymentTab}
                  setSelectedAddress={this.handleOnSelectAddress}
                  formatMessage={intl.formatMessage}
                  hasError={billingHasError}
                  nextStep={this.nextStep}
                />
                <Review
                  {...{
                    shippingAddress,
                    billingAddress,
                    cardData,
                    ibanData,
                    cardHolderName,
                    paymentMethod,
                    selectedCard
                  }}
                  currency={currentCurrency || config.defaultCurrency}
                  cart={shoppingCart}
                  showContent={currentStep === ReviewTab}
                  formatMessage={intl.formatMessage}
                  goToStep={this.handleOnGoToStep}
                />
              </SwipeableViews>
            </StepsContainer>
            <SummaryContainer>
              <CheckoutSummary
                subtotal={total}
                country={billingCountry}
                shipAddress={taxAddress}
                weight={weightSum}
                shipAddressCountry={shippingAddress.country}
                formatMessage={intl.formatMessage}
                currencySymbol={symbol}
                totalWithoutDiscount={totalWithoutDiscount + proDesignReview}
                onPaypalSuccess={this.onPaypalSuccess}
                onPaypalCancel={this.onPaypalCancel}
                onPaypalError={this.onPaypalError}
                onPlaceOrder={this.handleOnPlaceOrder}
                {...{
                  showOrderButton,
                  couponCode,
                  setCouponCodeAction,
                  deleteCouponCodeAction,
                  proDesignReview,
                  paymentMethod,
                  currentCurrency
                }}
              />
            </SummaryContainer>
          </Content>
          {loadingPlaceOrder && (
            <PlaceOrderLoading>
              <Spin />
            </PlaceOrderLoading>
          )}
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

  handleOnSelectAddress = (
    address: AddressType,
    index: number,
    billing = false
  ) => {
    const {
      setSelectedAddressAction,
      sameBillingAndShipping,
      setSelectedAddressesAction
    } = this.props
    if (sameBillingAndShipping) {
      setSelectedAddressesAction(address, index)
      return
    }
    setSelectedAddressAction(address, index, billing)
  }

  onPaypalSuccess = (payment: any) => {
    // paypal payment succeded
    const obj = {
      payment: payment.paymentID,
      payer: payment.payerID
    }
    this.placeOrder(undefined, obj)
  }

  onPaypalCancel = (data: AnalyserNode) => {
    // User pressed "cancel" or close Paypal's popup!
    console.error('The payment was cancelled!')
  }

  onPaypalError = (err: any) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.error('Error!', err)
    Message.error(err, 5)
  }

  handleOnPlaceOrder = async (event: any) => {
    const {
      client: { query },
      billingCountry,
      currentCurrency,
      openCurrencyWarningAction
    } = this.props

    const { data } = await query({
      query: CurrencyQuery,
      variables: { countryCode: billingCountry },
      fetchPolicy: 'network-only'
    })

    const selectedCurrency = currentCurrency || config.defaultCurrency

    if (data && data.currency) {
      if (data.currency.toLowerCase() !== selectedCurrency) {
        return openCurrencyWarningAction(true)
      }
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
      stripeSource,
      client: { query },
      currentCurrency,
      couponCode: couponObject
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
    if (
      paymentMethod === PaymentOptions.CREDITCARD &&
      !sameBillingAndShipping
    ) {
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
    const { weightSum = 0 } = shoppingCartData

    const taxAddress: TaxAddressObj = {
      country: shippingAddress.country,
      state: shippingAddress.stateProvinceCode,
      zipCode: shippingAddress.zipCode
    }

    try {
      setLoadingPlaceOrderAction(true)
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
            ({ gender, quantity, size, fit, color }: CartItemDetail) => {
              const fitId = get(fit, 'id', 0)
              const fitName = get(fit, 'name', '')
              const fitObj: ItemDetailType = {
                id: fitId,
                name: fitName
              }
              unset(gender, '__typename')
              unset(quantity, '__typename')
              unset(size, '__typename')
              unset(color, '__typename')
              return { gender, quantity, size, fit: fitObj, color }
            }
          )
          return item
        }
      )
      const couponCode = couponObject && couponObject.code

      const orderObj = {
        proDesign,
        paymentMethod,
        cardId,
        tokenId: stripeToken,
        sourceId: stripeSource,
        cart: sanitizedCart,
        shippingAddress,
        billingAddress,
        paymentData: paypalObj || null,
        countrySubsidiary: billingCountry,
        taxId,
        taxAmount,
        shippingId,
        shippingCarrier,
        shippingAmount: shippingAmount || '0',
        currency: currentCurrency || config.defaultCurrency,
        weight: weightSum,
        couponCode
      }

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
