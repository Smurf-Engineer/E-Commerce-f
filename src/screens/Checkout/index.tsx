/**
 * Checkout Screen - Created by cazarez on 05/05/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose, graphql, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import sumBy from 'lodash/sumBy'
import find from 'lodash/find'
import head from 'lodash/head'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import zenscroll from 'zenscroll'
import Steps from 'antd/lib/steps'
import Message from 'antd/lib/message'
import SwipeableViews from 'react-swipeable-views'
import unset from 'lodash/unset'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import * as checkoutActions from './actions'
import * as thunkActions from './thunkActions'
import packageIcon from '../../assets/packageicon.png'
import invoiceAnimation from '../../assets/invoiceanimation.gif'
import maintenanceImage from '../../assets/maintenance.png'
import { getTotalItemsIncart } from '../../components/MainLayout/actions'
import messages from './messages'
import {
  AddAddressMutation,
  PlaceOrderMutation,
  CurrencyQuery,
  CreatePaymentIntentMutation,
  AddCardMutation,
  isScaPaymentQuery,
  profileSettingsQuery,
  getDesignLabInfo,
  UpdateNotificationSettingMutation,
  UpdatePhoneSettingMutation
} from './data'
import {
  CheckoutTabs,
  PaymentOptions,
  quantities,
  EUROPE,
  STRIPE,
  EU_STRIPE,
  EU_SUBSIDIARY_COUNTRIES,
  STEP_ADDRESS,
  STEP_PAYMENT
} from './constants'

import { isPoBox, isApoCity, isValidCity, isValidZip, isNumberValue } from '../../utils/utilsAddressValidation'

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
  PlaceOrderLoading,
  ModalLoading,
  okButtonStyles,
  ModalTitle,
  InfoBody,
  InfoText,
  CheckList,
  CheckLabel,
  CheckGreen,
  InfoDescription,
  InvoiceAnimation,
  StyledSpin,
  InfoBatch,
  ProcessingDiv,
  SpinStyled,
  MaintenanceLayout,
  MaintenanceImage,
  MaintenaceLink,
  DeliveryDiv,
  DeliveryValue,
  PackageIcon,
  DeliveryLabels,
  StyledPopOver,
  PopoverText,
  InfoIcon,
  DeliveryDivMobile
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
  CouponCode,
  PaymentIntent,
  QueryProps,
  IProfileSettings,
  DesignLabInfo,
  NotificationSettings,
  NotificationOption
} from '../../types/common'
import config from '../../config/index'
import { getShoppingCartData, getPriceRangeToApply } from '../../utils/utilsShoppingCart'
import Modal from 'antd/lib/modal'
import CheckoutSummary from './CheckoutSummary'
import { getTaxQuery } from './CheckoutSummary/data'
import { APPROVED, DEFAULT_ROUTE, PHONE_MINIMUM } from '../../constants'
import { message } from 'antd'
import some from 'lodash/some'
import { updateAddressMutation } from '../../components/MyAddresses/data'
import moment from 'moment'
import OrderSMSAlertsModal from '../../components/OrderSMSAlertsModal'
import { saveCartCloud } from '../../components/MainLayout/api'

const { info } = Modal

type ProductCart = {
  id: number
  code: string
  yotpoId: string
  name: string
}

interface DataDesignLabInfo extends QueryProps {
  designInfo?: DesignLabInfo
}

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
  notificationData: NotificationSettings
}

interface CartItem {
  designId: string
  designCode: string
  product: ProductCart
  itemDetails: CartItemDetail[]
  teamStoreId?: string
}

interface CartItems {
  designId: string
  designCode: string
  product: Product
  totalOrder?: number
  itemDetails: CartItemDetail[]
  teamStoreId?: string
  isFixed?: boolean
}

interface Props extends RouteComponentProps<any> {
  client: any
  stripe: any
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
  designLabInfo: DataDesignLabInfo
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
  shippingSave: boolean
  billingSave: boolean
  showCardForm: boolean
  selectedCard: CreditCardData
  currentCurrency: string
  couponCode?: CouponCode
  profileData: ProfileData
  openCurrencyWarning: boolean
  paymentClientSecret: string
  intentId: string
  subsidiaryQuery?: number
  // Redux actions
  setStripeCardDataAction: (card: CreditCardData, stripeToken: string) => void
  setStripeIbanDataAction: (iban: IbanData) => void
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
  showBillingAddressFormAction: (show: boolean, modal?: boolean) => void
  setSelectedAddressAction: (
    address: AddressType,
    indexAddress: number,
    billing: boolean
  ) => void
  setSelectedAddressesAction: (
    address: AddressType,
    indexAddress: number
  ) => void
  updateAddress: (variables: {}) => void
  setAddressEditAction: (address: AddressType | {}, billing?: boolean) => void
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
  selectCardToPayAction: (
    card: StripeCardData | CreditCardData,
    selectedCardId: string
  ) => void
  setCouponCodeAction: (code: CouponCode) => void
  deleteCouponCodeAction: () => void
  openCurrencyWarningAction: (open: boolean) => void
  createPaymentIntent: (variables: {}) => Promise<PaymentIntent>
  savePaymentId: (paymentIntent: PaymentIntent) => void
  removeClientSecretAction: () => void
  addNewCard: (variables: {}) => Promise<any>
  updateNotification: (variables: {}) => void
  updatePhone: (variables: {}) => void
}

const { confirm } = Modal

const stepperTitles = ['SHIPPING', 'PAYMENT', 'REVIEW']
const DESIGNREVIEWFEE = 15
class Checkout extends React.Component<Props, {}> {
  state = {
    stripe: null,
    checked: false,
    smsAlertsModal: true,
    referenceNumber: ''
  }
  payReference: any
  componentDidMount() {
    window.onbeforeunload = () => true
  }
  componentWillUnmount() {
    const { resetReducerAction } = this.props
    resetReducerAction()
    window.onbeforeunload = null
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
      showBillingModal,
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
      profileData,
      cardHolderName,
      cardNumber,
      cardExpDate,
      cardBrand,
      ibanData,
      sameBillingAndShipping,
      stripeError,
      loadingBilling,
      loadingPlaceOrder,
      updateAddress,
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
      setLoadingBillingAction,
      setStripeIbanDataAction,
      setPaymentMethodAction,
      paymentMethod,
      saveCountryAction,
      openAddressesModalAction,
      openAddressesModal,
      skip,
      limit,
      designLabInfo,
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
      paymentClientSecret,
      user,
      updateNotification,
      updatePhone
    } = this.props
    const { smsAlertsModal, referenceNumber } = this.state
    const userPhone = get(profileData, 'profileData.userProfile.phone', '')
    const notificationData = get(profileData, 'notificationData', {})

    const openSMSAlertsModal = !(notificationData &&
      (notificationData.notifyOrderPayment === NotificationOption.BOTH || 
      notificationData.notifyOrderPayment === NotificationOption.SMS) &&
      userPhone)

    const underMaintenance = get(designLabInfo, 'getDesignLabInfo.underMaintenance', false)
    const deliveryDate = get(designLabInfo, 'deliveryDate', '')
    if (underMaintenance) {
      return (
        <Layout {...{ history, intl }}>
          <MaintenanceLayout>
            <MaintenanceImage src={maintenanceImage} />
            <MaintenaceLink onClick={this.goToHome}>
              {intl.formatMessage(messages.goToHome)}
            </MaintenaceLink>
          </MaintenanceLayout>
        </Layout>
      )
    }
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
      stateName: shippingAddress.stateProvince,
      state: shippingAddress.stateProvinceCode,
      zipCode: shippingAddress.zipCode
    }

    const { state: stateLocation } = location
    const { checked } = this.state
    const { ShippingTab, ReviewTab, PaymentTab } = CheckoutTabs

    if (!stateLocation || !stateLocation.cart || !stateLocation.cart.length) {
      return <Redirect to={DEFAULT_ROUTE} />
    }

    const { cart } = stateLocation
    const reorder = some(cart, 'fixedCart')
    const isFixedTeamstore = some(cart, 'isFixed')
    const isFixedStore = some(cart, 'fixedPrice')
    const showDiscount = some(cart, ['isReseller', false]) || some(cart, ['isReseller', null])
    const preorder = isFixedTeamstore && !reorder

    const shoppingCart = cloneDeep(cart) as CartItems[]

    const invoiceEnabled = get(profileData, 'profileData.userProfile.invoiceEnabled', false)
    const invoiceTerms = get(profileData, 'profileData.userProfile.invoiceTerms', false)
    const resellerStatus = get(profileData, 'profileData.reseller.status', '')

    const shoppingCartData = getShoppingCartData(
      shoppingCart,
      currentCurrency || config.defaultCurrency,
      shippingAddress ? shippingAddress.country : ''
    )
    const europeStripeAccount = EU_SUBSIDIARY_COUNTRIES.includes(
      billingCountry.toLowerCase()
    )
    const paymentIntentLoading =
      paymentMethod === PaymentOptions.CREDITCARD &&
      currentStep === 2 &&
      !paymentClientSecret.length &&
      europeStripeAccount &&
      !preorder

    const {
      total,
      totalWithoutDiscount,
      youthTotal,
      weightSum,
      symbol,
      upgradesTotal,
      variablesTotal
    } = shoppingCartData
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

    const simpleCart = this.getSimpleCart()
    const productsPrices = this.getProductsPrice()
    if (
      !(smsAlertsModal && openSMSAlertsModal) && 
      !checked && paymentMethod === PaymentOptions.PAYPAL && 
      showOrderButton && 
      !isFixedTeamstore
    ) {
      this.confirmOrder(true)
    }

    return (
      <Layout {...{ history, intl }} hideTopHeader={true} hideBottomHeader={true}>
        <Container>
          {deliveryDate &&
            <DeliveryDiv show={currentStep === ReviewTab}>
              <StyledPopOver
                overlayClassName="innerClassTooltip"
                title={
                  <PopoverText>
                    {intl.formatMessage(messages.deliveryInfo)}
                  </PopoverText>
                }
              >
                <InfoIcon type="question-circle" />
              </StyledPopOver>
              <DeliveryLabels>
                {intl.formatMessage(messages.estimatedDelivery)}
                <DeliveryValue>
                  {deliveryDate}
                </DeliveryValue>
              </DeliveryLabels>
              <PackageIcon src={packageIcon} />
            </DeliveryDiv>
          }
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
                    updateAddress,
                    skip,
                    limit,
                    currentPage,
                    setSkipValueAction
                  }}
                  multiButtons={true}
                  setAddressEdit={this.setAddressEdit}
                  buttonToRender={continueButton}
                  nextStep={this.nextStep}
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
                    setStripeErrorAction,
                    inputChangeAction,
                    referenceNumber,
                    selectDropdownAction,
                    sameBillingAndShipping,
                    sameBillingAndAddressCheckedAction,
                    sameBillingAndAddressUncheckedAction,
                    invalidBillingFormAction,
                    loadingBilling,
                    setLoadingBillingAction,
                    setStripeIbanDataAction,
                    setPaymentMethodAction,
                    saveCountryAction,
                    showCardForm,
                    invoiceEnabled,
                    invoiceTerms,
                    showCardFormAction,
                    selectCardToPayAction,
                    selectedCard,
                    paymentMethod,
                    skip,
                    currentPage,
                    indexAddressSelected,
                    isFixedStore,
                    limit,
                    setSkipValueAction,
                    updateAddress,
                    showBillingForm,
                    showBillingModal,
                    showBillingAddressFormAction,
                    paymentClientSecret
                  }}
                  onBehalf={user && user.onBehalf}
                  isReseller={resellerStatus === APPROVED}
                  updateReference={this.handleReferenceChange}
                  setPayRef={(payRef: any) => this.payReference = payRef}
                  setStripeCardDataAction={this.setStripeCardDataAction}
                  showContent={currentStep === PaymentTab}
                  setSelectedAddress={this.handleOnSelectAddress}
                  formatMessage={intl.formatMessage}
                  hasError={billingHasError}
                  nextStep={this.nextStep}
                  setStripeAction={this.setStripe}
                  createPaymentIntent={this.createPaymentIntent}
                  isFixedTeamstore={preorder}
                  setAddressEdit={this.setAddressEdit}
                />
                <Review
                  {...{
                    shippingAddress,
                    billingAddress,
                    cardData,
                    ibanData,
                    invoiceTerms,
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
              {deliveryDate &&
                <DeliveryDivMobile show={currentStep === ReviewTab}>
                  <StyledPopOver
                    overlayClassName="innerClassTooltip"
                    title={
                      <PopoverText>
                        {intl.formatMessage(messages.deliveryInfo)}
                      </PopoverText>
                    }
                  >
                    <InfoIcon type="question-circle" />
                  </StyledPopOver>
                  <DeliveryLabels>
                    {intl.formatMessage(messages.estimatedDelivery)}
                    <DeliveryValue>
                      {deliveryDate}
                    </DeliveryValue>
                  </DeliveryLabels>
                  <PackageIcon src={packageIcon} />
                </DeliveryDivMobile>
              }
              <CheckoutSummary
                subtotal={total}
                country={billingCountry}
                shipAddress={taxAddress}
                weight={weightSum}
                shipAddressCountry={shippingAddress.country}
                formatMessage={intl.formatMessage}
                currencySymbol={symbol}
                totalWithoutDiscount={totalWithoutDiscount}
                onPaypalSuccess={this.onPaypalSuccess}
                onPaypalCancel={this.onPaypalCancel}
                onPaypalError={this.onPaypalError}
                upgrades={upgradesTotal}
                variables={variablesTotal}
                handleNextStep={this.nextStepSummary}
                placingOrder={loadingPlaceOrder || paymentIntentLoading}
                onPlaceOrder={this.handleOnPlaceOrder}
                {...{
                  youthTotal,
                  showOrderButton,
                  couponCode,
                  isFixedStore,
                  history,
                  currentStep,
                  showDiscount,
                  setCouponCodeAction,
                  deleteCouponCodeAction,
                  proDesignReview,
                  paymentMethod,
                  currentCurrency,
                  simpleCart,
                  productsPrices
                }}
              />
            </SummaryContainer>
          </Content>

          {(loadingPlaceOrder || paymentIntentLoading) && (
            <PlaceOrderLoading>
              <ModalLoading>
                <InvoiceAnimation src={invoiceAnimation} />
                <ProcessingDiv>
                  {intl.formatMessage(messages.processing)}
                  <SpinStyled />
                </ProcessingDiv>
              </ModalLoading>
            </PlaceOrderLoading>
          )}
        </Container>
        {currentStep === ReviewTab && openSMSAlertsModal && smsAlertsModal && 
          <OrderSMSAlertsModal
            user={user}
            notificationData={notificationData || {}}
            phone={userPhone}
            updateNotification={updateNotification}
            updatePhone={updatePhone}
            onClose={() => this.setState( { smsAlertsModal: false } )}
            formatMessage={intl.formatMessage}
            notifyOrderPayment={true}
          />
        }
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
    const { stepAdvanceAction, removeClientSecretAction } = this.props
    stepAdvanceAction(step - 1)
    zenscroll.toY(0)
    removeClientSecretAction()
  }

  verifyStepTwo = () => {
    const {
      currentStep,
      stepAdvanceAction,
      billingSave,
      paymentMethod,
      sameBillingAndShipping,
      billingFirstName,
      billingLastName,
      billingStreet,
      billingApartment,
      intl: { formatMessage },
      billingCountry,
      billingStateProvince,
      billingCity,
      billingZipCode,
      billingPhone
    } = this.props
    if (billingPhone && billingPhone.length < PHONE_MINIMUM) {
      message.error(formatMessage(messages.phoneError))
      return
    }
    if (
      (paymentMethod === PaymentOptions.CREDITCARD || paymentMethod === PaymentOptions.INVOICE) &&
      !sameBillingAndShipping &&
      billingSave
    ) {
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
      this.saveAddress(billingAddress)
    }
    stepAdvanceAction(currentStep + 1)
  }

  verifyStepOne = () => {
    const {
      currentStep,
      stepAdvanceAction,
      firstName,
      intl: { formatMessage },
      lastName,
      street,
      country,
      stateProvince,
      city,
      zipCode,
      apartment,
      stateProvinceCode,
      phone,
      shippingSave,
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
    
    if (isPoBox(street)) {
      message.error(formatMessage(messages.shipTopPoApoLabel))
    }

    if (!isValidCity(city) || isNumberValue(city)) {
      message.error(formatMessage(messages.invalidCity))
      return
    }

    if (!isValidZip(zipCode)) {
      message.error(formatMessage(messages.invalidZip))
      return
    }
    
    if (phone && phone.length < PHONE_MINIMUM) {
      message.error(formatMessage(messages.phoneError))
      return
    }

    if (error) {
      validFormAction(error)
      return
    }
    if (shippingSave) {
      const shippingAddress: AddressType = {
        firstName,
        lastName,
        street,
        apartment,
        country,
        stateProvince,
        stateProvinceCode,
        city,
        zipCode: zipCode.trim(),
        phone
      }
      this.saveAddress(shippingAddress)
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
    this.validateLargeStore()
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

  setAddressEdit = (address: AddressType | {}, billing?: boolean) => {
    const { setAddressEditAction } = this.props
    setAddressEditAction(address, billing)
  }

  handleOnPlaceOrder = async (event: any, sca?: boolean) => {
    const {
      client: { query },
      billingCountry,
      currentCurrency,
      loadingPlaceOrder,
      setLoadingPlaceOrderAction,
      intl: { formatMessage }
    } = this.props
    if (!loadingPlaceOrder) {
      this.validateLargeStore()
      setLoadingPlaceOrderAction(true)
      const { data } = await query({
        query: CurrencyQuery,
        variables: { countryCode: billingCountry },
        fetchPolicy: 'network-only'
      })
      const selectedCurrency = currentCurrency || config.defaultCurrency
      if (data && data.currency) {
        if (data.currency.toLowerCase() !== selectedCurrency) {
          confirm({
            icon: ' ',
            okText: formatMessage(messages.confirm),
            title: formatMessage(messages.correctCurrency, {
              currentCurrency: selectedCurrency.toUpperCase()
            }),
            okButtonProps: { style: okButtonStyles },
            onOk: () => {
              this.confirmOrder(false, sca)
            }
          })
        } else {
          this.confirmOrder(false, sca)
        }
      }
    }
  }
  goToHome = () => {
    window.location.replace('/')
  }
  handleReferenceChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    const referenceNumber = value ? value.replace(/[^0-9]+/g, '') : ''
    if (!referenceNumber || (referenceNumber && referenceNumber.length < 16)) {
      this.setState({ referenceNumber })
    }
  }
  confirmOrder = (isPaypal?: boolean, sca?: boolean) => {
    const {
      location,
      intl: { formatMessage }
    } = this.props
    const {
      state: { cart }
    } = location
    const isFixedTeamstore = some(cart, 'isFixed')
    if (isFixedTeamstore && !isPaypal) {
      this.placeOrder(undefined, undefined, sca)
    } else {
      confirm({
        title: (
          <ModalTitle>
            {formatMessage(messages.areYouSure)}
          </ModalTitle>
        ),
        icon: ' ',
        width: 642,
        okText: formatMessage(messages.proceed),
        okButtonProps: {
          style: okButtonStyles
        },
        cancelText: formatMessage(messages.goBack),
        onOk: () => {
          if (isPaypal) {
            this.setState({ checked: true })
          } else {
            this.placeOrder(undefined, undefined, sca)
          }
        },
        content: (
          <InfoBody>
            <InfoText
              dangerouslySetInnerHTML={{
                __html: formatMessage(messages.infoOrder)
              }} />
            <CheckList>
              <CheckLabel><CheckGreen type="check" />{formatMessage(messages.shippingBilling)}</CheckLabel>
              <CheckLabel><CheckGreen type="check" />{formatMessage(messages.itemQuantities)}</CheckLabel>
              <CheckLabel><CheckGreen type="check" />{formatMessage(messages.itemSizes)}</CheckLabel>
            </CheckList>
          </InfoBody>
        )
      })
    }
  }
  getSimpleCart = () => {
    const {
      location: {
        state: { cart }
      }
    } = this.props
    return cart.map(({ product, itemDetails }: CartItems) => {
      const simpleCartItem = {
        id: product.id,
        quantity: sumBy(itemDetails, 'quantity')
      }
      return simpleCartItem
    })
  }
  createPaymentIntent = async () => {
    const { savePaymentId, createPaymentIntent } = this.props
    try {
      const orderObj = await this.getOrderObject()
      const response = await createPaymentIntent({
        variables: { orderObj }
      })
      const paymentIntent = get(response, 'data.createPaymentIntent', {})
      await savePaymentId(paymentIntent)
    } catch (e) {
      this.handleOnGoToStep(STEP_ADDRESS)
      message.error('Error generating payment')
    }
  }
  setStripeCardDataAction = async (
    card?: CreditCardData,
    stripeToken?: string
  ) => {
    const {
      setStripeCardDataAction,
      billingCountry,
      addNewCard,
      selectCardToPayAction,
      intl: { formatMessage },
      client: { query },
      location: {
        state: { cart }
      }
    } = this.props
    const { data } = await query({
      query: isScaPaymentQuery,
      variables: { code: billingCountry },
      fetchPolicy: 'network-only'
    })
    const reorder = some(cart, 'fixedCart')
    const isFixedTeamstore = some(cart, 'isFixed')

    const preorder = isFixedTeamstore && !reorder

    const subsidiarySCA = get(data, 'subsidiarySCA.sca', false)
    if (subsidiarySCA && !preorder) {
      await this.createPaymentIntent()
    }
    if (card && stripeToken) {
      try {
        if (preorder) {
          const newCard = await addNewCard({
            variables: { token: stripeToken }
          })
          const newCardId = get(newCard, 'data.addCardSourceStripeCustomer.id')

          if (!newCardId) {
            this.handleOnGoToStep(STEP_PAYMENT)
            return message.error(formatMessage(messages.paymentError))
          }
          return selectCardToPayAction(card, card.id)
        } else {
          setStripeCardDataAction(card, stripeToken)
        }
      } catch (e) {
        message.error(formatMessage(messages.errorSavingCart))
      }
    }
  }
  getProductsPrice = () => {
    const {
      location: {
        state: { cart }
      },
      currentCurrency
    } = this.props
    const { priceRangeToApply } = getShoppingCartData(cart, currentCurrency)
    const quantity = quantities[priceRangeToApply]

    return cart.map(({ product, itemDetails, designId, isFixed, totalOrder = 0 }: CartItems) => {
      // Check for fixed prices
      const currentQuantity = sumBy(itemDetails, 'quantity')
      const productPriceRanges = get(product, 'priceRange', [])
      const itemPriceRange = getPriceRangeToApply(totalOrder + currentQuantity)
      const itemQuantity = quantities[itemPriceRange === 0 ? 1 : itemPriceRange]

      const totalItems = !!isFixed ? itemQuantity : quantity
      // get prices from currency
      const currencyPrice = find(productPriceRanges, {
        abbreviation: currentCurrency,
        quantity: totalItems
      })

      const designsPrice = {
        yotpoId: product.yotpoId,
        designId,
        price: currencyPrice.price,
        quantity: currentQuantity
      }
      return designsPrice
    })
  }
  nextStepSummary = async () => {
    const { currentStep } = this.props
    const { PaymentTab } = CheckoutTabs
    if (currentStep === PaymentTab) {
      await this.triggerPayValidation()
    } else {
      this.nextStep()
    }
  }
  triggerPayValidation = async () => {
    if (this.payReference) {
      await this.payReference.getWrappedInstance().handleOnContinue()
    }
  }
  getStripeAccount = (subsidiary: number = 0) => {
    if (subsidiary === EUROPE) {
      return EU_STRIPE
    }
    return STRIPE
  }
  validateLargeStore = () => {
    const {
      location,
      intl: {
        formatMessage
      },
    } = this.props
    const {
      state: { cart }
    } = location
    const orderTotal = cart.reduce((sum: number, { isFixed, totalOrder = 0 }: CartItems) => {
      if (isFixed) {
        sum += totalOrder
      }
      return sum
    // tslint:disable-next-line: align
    }, 0)
    if (orderTotal > 20) {
      info({
        icon: ' ',
        width: '580px',
        centered: true,
        okButtonProps: {
          style: { display: 'none'}
        },
        content:
          <InfoBatch>
            <InvoiceAnimation src={invoiceAnimation} />
            <InfoDescription
              dangerouslySetInnerHTML={{
                __html: formatMessage(messages.batchInfo)
              }}
            />
            <StyledSpin size="large" />
          </InfoBatch>
      })
    }
  }
  placeOrder = async (event: any, paypalObj?: object, sca?: boolean) => {
    const {
      placeOrder,
      setLoadingPlaceOrderAction,
      getTotalItemsIncart: getTotalItemsIncartAction,
      stripeToken,
      paymentClientSecret,
      history,
      user
    } = this.props

    try {
      setLoadingPlaceOrderAction(true)
      const orderObj = await this.getOrderObject(paypalObj, sca)
      if (
        orderObj && 
        !orderObj.cardId && 
        orderObj.isFixedTeamstore && 
        orderObj.paymentMethod === PaymentOptions.CREDITCARD
      ) {
        message.error('Invalid card/not available, please try another.')
        return
      }
      const { referenceNumber } = this.state
      const usedBy = get(user, 'usedBy', '')
      orderObj.placedBy = usedBy || ''
      orderObj.referenceNumber = referenceNumber || ''
      const response = await placeOrder({
        variables: { orderObj }
      })

      const orderId = get(response, 'data.charge.short_id', '')
      const preorder = orderObj.isFixedTeamstore && !orderObj.replaceOrder

      if (
        sca &&
        orderObj.paymentMethod === PaymentOptions.CREDITCARD &&
        !preorder
      ) {
        const { stripe } = this.state
        const stripeResponse = await stripe.handleCardPayment(
          paymentClientSecret,
          {
            payment_method: stripeToken
          }
        )

        if (stripeResponse.error) {
          message.error(stripeResponse.error.message)
          setLoadingPlaceOrderAction(false)

          return
        }
      }

      localStorage.removeItem('cart')
      setLoadingPlaceOrderAction(false)
      getTotalItemsIncartAction()

      history.push(`/order-placed?orderId=${orderId}`)
    } catch (error) {
      setLoadingPlaceOrderAction(false)
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
      const errorString = get(errorMessage, '[0]', '')
      if (errorString) {
        const idPart = errorString.split('ID: ')
        if (idPart && idPart.length > 0) {
          const idDesign = idPart[1] || ''
          if (idDesign && typeof window !== 'undefined') {
            const parsedLocal = localStorage.getItem('cart') as any
            const cartList = JSON.parse(parsedLocal)
            if (cartList) {
              const filteredList = cartList.filter(({ designId }: any) => designId !== idDesign)
              const cart = JSON.stringify(filteredList)
              localStorage.setItem('cart', cart)
              saveCartCloud(cart)
              setTimeout(() => history.replace('/shopping-cart'), 1000)
            }
          }
        }
      }
    }
  }
  getOrderObject = async (
    paypalObj?: object,
    sca: boolean = false
  ) => {
    const {
      location,
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
      paymentMethod,
      stripeToken,
      selectedCard,
      stripeSource,
      ibanData = {},
      client: { query },
      currentCurrency,
      couponCode: couponObject,
      intentId
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
      stateName: shippingAddress.stateProvince,
      state: shippingAddress.stateProvinceCode,
      zipCode: shippingAddress.zipCode
    }
    const isFixedTeamstore = some(cart, 'isFixed')
    const replaceOrder = get(head(cart), 'replaceOrder', '')

    try {
      const taxResponse = await query({
        query: getTaxQuery,
        variables: {
          country: billingCountry,
          cart: this.getSimpleCart(),
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
        ({
          designCode,
          designId,
          product,
          itemDetails,
          teamStoreId
        }: CartItems) => {
          const item = { designCode, designId } as CartItem

          const productItem = {
            id: product.id,
            code: product.code,
            name: product.name,
            yotpoId: product.yotpoId
          }
          item.product = productItem
          item.teamStoreId = teamStoreId
          item.itemDetails = itemDetails.map(
            ({
              gender,
              quantity,
              size,
              fit,
              color,
              topSize,
              bottomSize,
              variableOneValue,
              variableTwoValue,
              firstUpgrade: firstUpObj,
              secondUpgrade: secondUpObj,
              thirdUpgrade: thirdObj
            }: CartItemDetail) => {
              const fitId = get(fit, 'id', 0)
              const fitName = get(fit, 'name', '')
              const fitObj: ItemDetailType = {
                id: fitId,
                name: fitName
              }
              const firstUpgrade = get(firstUpObj, 'name', '')
              const secondUpgrade = get(secondUpObj, 'name', '')
              const thirdUpgrade = get(thirdObj, 'name', '')
              unset(gender, '__typename')
              unset(quantity, '__typename')
              unset(size, '__typename')
              unset(color, '__typename')
              unset(topSize, '__typename')
              unset(bottomSize, '__typename')

              return {
                gender,
                quantity,
                size,
                fit: fitObj,
                color,
                topSize,
                bottomSize,
                firstUpgrade,
                secondUpgrade,
                thirdUpgrade,
                variableOneValue,
                variableTwoValue
              }
            }
          )

          return item
        }
      )
      const couponCode = couponObject && couponObject.code
      const timeZone = moment().utcOffset()
      const orderObj = {
        proDesign,
        paymentMethod,
        cardId,
        tokenId: sca ? intentId : stripeToken,
        sourceId: stripeSource,
        cart: sanitizedCart,
        shippingAddress,
        billingAddress,
        paymentData: paypalObj || null,
        ibanSource: get(ibanData, 'id', null),
        countrySubsidiary: billingCountry,
        taxId,
        taxAmount,
        shippingId,
        shippingCarrier,
        shippingAmount: shippingAmount || '0',
        currency: currentCurrency || config.defaultCurrency,
        weight: weightSum,
        couponCode,
        isFixedTeamstore,
        timeZone,
        replaceOrder
      }
      return orderObj
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    }
  }
  setStripe = async (stripe: any) => {
    this.setState({
      stripe
    })
  }
}

type OwnProps = {
  location?: any
}

const mapStateToProps = (state: any) => {
  const appState = state.get('app').toJS()
  const checkoutProps = state.get('checkout').toJS()
  const langProps = state.get('languageProvider').toJS()
  return {
    ...appState,
    ...checkoutProps,
    ...langProps
  }
}

const CheckoutEnhance = compose(
  injectIntl,
  AddAddressMutation,
  PlaceOrderMutation,
  CreatePaymentIntentMutation,
  AddCardMutation,
  updateAddressMutation,
  UpdateNotificationSettingMutation,
  UpdatePhoneSettingMutation,
  withApollo,
  connect(
    mapStateToProps,
    {
      ...checkoutActions,
      ...thunkActions,
      getTotalItemsIncart
    }
  ),
  graphql(profileSettingsQuery, {
    options: ({ firstName }) => ({
      fetchPolicy: 'network-only',
      skip: !firstName
    }),
    name: 'profileData',
  }),
  graphql(getDesignLabInfo, {
    options: ({ location }: OwnProps) => {
      let teamStoreId
      const shoppingCart = get(location, 'state.cart', [])
      if (shoppingCart && shoppingCart.length > 0 && some(shoppingCart, 'isFixed')) {
        teamStoreId = shoppingCart[0].teamStoreId || ''
      } 
      return {
        variables: { teamStoreId },
        fetchPolicy: 'network-only'
      }
    },
    name: 'designLabInfo'
  }),
)(Checkout)

export default CheckoutEnhance
