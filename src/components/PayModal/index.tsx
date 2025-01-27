/**
 * PayModal Component - Created by miguelcanobbio on 23/05/18.
 */
import * as React from 'react'
import { compose, graphql, withApollo } from 'react-apollo'
import {
  CheckIcon,
  CloseIcon,
  CompletedDiv,
  Container,
  ContainerMethods,
  HeaderImages,
  HeadersDiv,
  MethodIcon,
  ItemColumn,
  ItemList,
  ItemRow,
  JakrooImage,
  MethodButton,
  okButtonStyles,
  PayAnimation,
  PayCompletedImg,
  PayCompleteInfo,
  PayForm,
  PaymentDiv,
  SelectPayment,
  StepIcon,
  StepWrapper,
  StyledIcon,
  StyledSwipeableViews,
  SummaryContainer,
  PaypalIcon
} from './styledComponents'
import withError from '../WithError'
import withLoading from '../WithLoading'
import config from '../../config'
import payAnimation from '../../assets/payanimation.png'
import payCompletedGif from '../../assets/paycompletedcard.gif'
import paypalLogo from '../../assets/Paypal.svg'
import jakrooLogo from '../../assets/jakroo_logo.svg'
import ModalCountry from '../ConfirmCountryDialog'
import zenscroll from 'zenscroll'
import Modal from 'antd/lib/modal/Modal'
import Message from 'antd/lib/message'
import CreditCardForm from './CreditCardFormBilling'
import { StripeProvider, Elements } from 'react-stripe-elements'
import * as PayModalActions from './actions'
import * as thunkActions from './thunkActions'
import { connect } from 'react-redux'
import { InjectedIntl, injectIntl } from 'react-intl'
import { EU_SUBSIDIARY_COUNTRIES, PaymentOptions } from '../../screens/Checkout/constants'
import messages from './messages'
import {
  AddressType,
  CreditCardData,
  IbanData,
  NetsuiteTax,
  PaymentIntent,
  QueryProps,
  ServiceItem,
  StripeCardData,
  TaxAddressObj
} from '../../types/common'
import { PHONE_MINIMUM, PHONE_MINIMUM_NOR } from '../../constants'
import { AddAddressMutation, CurrencyQuery } from '../../screens/Checkout/data'
import { CreatePaymentIntentMutation, isScaPaymentQuery, PlaceOrderServiceMutation, getTaxQuery } from './data'
import get from 'lodash/get'
import upperFirst from 'lodash/upperFirst'
import Steps from 'antd/lib/steps'
import CheckoutSummary from './CheckoutSummary'
import { getTaxesServices } from '../../utils/utilsCheckout'

const stepperTitles = ['PAYMENT', 'REVIEW', 'NOTES']
const { CREDITCARD, PAYPAL } = PaymentOptions
const { Step } = Steps
const { confirm } = Modal

interface DataTaxes extends QueryProps {
  taxes: NetsuiteTax
}
interface Props {
  open: boolean
  intl: InjectedIntl
  paymentMethod: string
  showCardForm: boolean
  addNewAddress: any
  client: any
  stripeToken: string
  currentStep: number
  cardHolderName: string
  billingFirstName: string
  taxShipQuery?: DataTaxes
  billingStateProvinceCode: string
  billingLastName: string
  placeOrderService: any
  billingStreet: string
  billingApartment: string
  billingCountry: string
  billingStateProvince: string
  billingCity: string
  billingZipCode: string
  billingPhone: string
  intentId: string
  stripeSource: string
  ibanData: IbanData
  loadingPlaceOrder: boolean
  currentCurrency: string
  billingHasError: boolean
  stripeError: string
  items: ServiceItem[]
  loadingBilling: boolean
  showBillingForm: boolean
  billingSave: boolean
  indexAddressSelected: number
  selectedCard: CreditCardData
  paymentClientSecret: string
  selectCardToPayAction: (
    card: StripeCardData | CreditCardData,
    selectedCardId: string
  ) => void
  setSelectedAddressAction: (
    address: AddressType,
    indexAddress: number,
    billing: boolean
  ) => void
  callback: (id: string) => void
  requestClose: () => void
  setStripeIbanDataAction: (iban: IbanData) => void
  saveCountryAction: (countryCode: string | null) => void
  setLoadingPlaceOrderAction: (loading: boolean) => void
  stepAdvanceAction: (step: number) => void
  removeClientSecretAction: () => void
  inputChangeAction: (id: string, value: string) => void
  selectDropdownAction: (id: string, value: string) => void
  setStripeCardDataAction: (card: CreditCardData, stripeToken: string) => void
  savePaymentId: (paymentIntent: PaymentIntent) => void
  createPaymentIntent: (variables: {}) => Promise<PaymentIntent>
  showBillingAddressFormAction: (show: boolean) => void
  showCardFormAction: (open: boolean) => void
  invalidBillingFormAction: (hasError: boolean) => void
  setStripeAction: (stripe: any) => void
  setStripeErrorAction: (error: string) => void
  setLoadingBillingAction: (loading: boolean) => void
  setPaymentMethodAction: (method: string) => void
  formatMessage: (messageDescriptor: any) => string
}

interface MyWindow extends Window {
  Stripe: any
}

declare var window: MyWindow

class PayModal extends React.Component<Props, {}> {
  state = {
    stripe: null,
    checked: false,
    openConfirm: false,
    showPricing: false,
    payCompleted: false
  }
  private paySection: any
  private swipeableActions: any
  componentDidMount() {
    if (window.Stripe) {
      this.setState(
        {
          stripe: window.Stripe(config.pkStripeUS)
        },
        () => this.setStripeAction(this.state.stripe)
      )
    } else {
      // this code is safe to server-side render.
      const stripeJs = document.createElement('script')
      stripeJs.id = 'stripe-js'
      stripeJs.async = true
      stripeJs.src = 'https://js.stripe.com/v3/'
      stripeJs.onload = () => {
        this.setState(
          {
            stripe: window.Stripe(config.pkStripeUS),
          },
          () => this.setStripeAction(this.state.stripe)
        )
      }
      // tslint:disable-next-line:no-unused-expression
      document.body && document.body.appendChild(stripeJs)
    }
  }

  componentDidUpdate() {
    if (this.swipeableActions) {
      this.swipeableActions.updateHeight()
    }
  }

  setStripeAction = async (stripe: any) => {
    this.setState({
      stripe
    })
  }

  handlePaypalClick = () => {
    const { setPaymentMethodAction } = this.props
    setPaymentMethodAction(PAYPAL)
    this.setState({
      openConfirm: true
    })
  }

  handleConfirmSave = (countryCode: string | null) => {
    const { saveCountryAction } = this.props
    this.setState({
      openConfirm: false
    })
    saveCountryAction(countryCode)
    setTimeout(() => { this.scrollPayForm(true) }, 600)
  }

  nextStep = () => {
    const {
      stepAdvanceAction,
      currentStep,
      billingSave,
      paymentMethod,
      billingFirstName,
      billingLastName,
      billingStreet,
      billingApartment,
      intl: { formatMessage },
      billingCountry,
      billingStateProvince,
      billingStateProvinceCode,
      billingCity,
      billingZipCode,
      billingPhone
    } = this.props
    
    if (
      billingPhone && (billingPhone.length < PHONE_MINIMUM ||
        (billingPhone.startsWith('47') &&
        billingPhone.length < PHONE_MINIMUM_NOR))
    ) {
      Message.error(
        formatMessage(messages.phoneError, {
          phone_length:
            billingPhone && billingPhone.startsWith('47')
              ? PHONE_MINIMUM_NOR
              : PHONE_MINIMUM,
        })
      )
      return
    }

    if (
      paymentMethod === PaymentOptions.CREDITCARD &&
      billingSave
    ) {
      const billingAddress: AddressType = {
        firstName: billingFirstName,
        lastName: billingLastName,
        street: billingStreet,
        apartment: billingApartment,
        country: billingCountry,
        stateProvince: billingStateProvince,
        stateProvinceCode: billingStateProvinceCode,
        city: billingCity,
        zipCode: billingZipCode,
        phone: billingPhone
      }
      this.saveAddress(billingAddress)
    }
    stepAdvanceAction(currentStep + 1)
    zenscroll.toY(0)
  }

  handleOnSelectAddress = (
    address: AddressType,
    index: number,
    billing = false
  ) => {
    const {
      setSelectedAddressAction,
    } = this.props
    setSelectedAddressAction(address, index, billing)
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
      this.handleOnGoToStep(1)
      Message.error('Error generating payment')
    }
  }

  setStripeCardData = async (
    card?: CreditCardData,
    stripeToken?: string
  ) => {
    const {
      setStripeCardDataAction,
      billingCountry,
      client: { query }
    } = this.props
    const { data } = await query({
      query: isScaPaymentQuery,
      variables: { code: billingCountry },
      fetchPolicy: 'network-only'
    })

    const subsidiarySCA = get(data, 'subsidiarySCA.sca', false)
    if (subsidiarySCA) {
      await this.createPaymentIntent()
    }
    if (card && stripeToken) {
      setStripeCardDataAction(card, stripeToken)
    }
  }

  handleOnGoToStep = (step: number) => {
    const { stepAdvanceAction, removeClientSecretAction } = this.props
    stepAdvanceAction(step - 1)
    zenscroll.toY(0)
    removeClientSecretAction()
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

  handleCancelConfirm = () => {
    this.setState({
      openConfirm: false
    })
  }

  handleOnDropdownAction = (id: string, value: string) => {
    const { selectDropdownAction } = this.props
    const customId = 'billing' + upperFirst(id)
    selectDropdownAction(customId, value)
  }

  handleOnChangeInput = (id: string, value: string) => {
    const { inputChangeAction } = this.props
    if (id === 'cardHolderName' || id === 'email') {
      inputChangeAction(id, value)
    } else {
      const customId = 'billing' + upperFirst(id)
      inputChangeAction(customId, value)
      return
    }
  }

  handleOnStepClick = (step: number) => () => {
    const { currentStep } = this.props
    if (step < currentStep) {
      this.handleOnGoToStep(step + 1)
    }
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

  getOrderObject = async (
    paypalObj?: object,
    sca: boolean = false
  ) => {
    const {
      items,
      billingFirstName,
      billingLastName,
      billingStreet,
      billingApartment,
      billingCountry,
      billingStateProvince,
      billingCity,
      billingZipCode,
      billingStateProvinceCode,
      billingPhone,
      paymentMethod,
      stripeToken,
      selectedCard,
      stripeSource,
      ibanData = {},
      currentCurrency,
      intentId
    } = this.props

    const billingAddress: AddressType = {
      firstName: billingFirstName,
      lastName: billingLastName,
      street: billingStreet,
      apartment: billingApartment,
      country: billingCountry,
      stateProvince: billingStateProvince,
      stateProvinceCode: billingStateProvinceCode,
      city: billingCity,
      zipCode: billingZipCode,
      phone: billingPhone
    }

    const cardId = selectedCard && selectedCard.id
    const total = items.reduce((sum, item) => sum += item.price, 0)

    const orderObj = {
      paymentMethod,
      cardId,
      total,
      items,
      tokenId: sca ? intentId : stripeToken,
      sourceId: stripeSource,
      billingAddress,
      paymentData: paypalObj || null,
      ibanSource: get(ibanData, 'id', null),
      countrySubsidiary: billingCountry,
      currency: currentCurrency || config.defaultCurrency
    }
    return orderObj
  }

  placeOrder = async (event: any, paypalObj?: any, sca?: boolean) => {
    const {
      placeOrderService,
      setLoadingPlaceOrderAction,
      stripeToken,
      paymentClientSecret
    } = this.props

    try {
      setLoadingPlaceOrderAction(true)
      const orderObj = await this.getOrderObject(paypalObj, sca)
      const response = await placeOrderService({
        variables: { orderObj }
      })
      const orderId = get(response, 'data.chargeService.orderId', '')

      if (
        sca &&
        orderObj.paymentMethod === PaymentOptions.CREDITCARD
      ) {
        const { stripe } = this.state
        const stripeResponse = await stripe.handleCardPayment(
          paymentClientSecret,
          {
            payment_method: stripeToken
          }
        )

        if (stripeResponse.error) {
          Message.error(stripeResponse.error.message)
          setLoadingPlaceOrderAction(false)
          return
        }
      }
      this.setState({ payCompleted: true })
      const { callback } = this.props
      if (callback) {
        setTimeout(() => callback(orderId), 2000)
      }
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    } finally {
      setLoadingPlaceOrderAction(false)
    }
  }

  confirmOrder = (isPaypal?: boolean, sca?: boolean) => {
    if (isPaypal) {
      this.setState({ checked: true })
    } else {
      this.placeOrder(undefined, undefined, sca)
    }
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

  scrollPayForm = (isPaypal?: boolean) => {
    if (window) {
      const node = document.querySelector('.ant-modal-wrap')
      if (node) {
        const intakeScroller = zenscroll.createScroller(node, 0)
        const isNotMobile = window && window.matchMedia('(min-width: 700px)').matches
        if (isPaypal || isNotMobile) {
          intakeScroller.toY(node.scrollHeight, 250)
        } else {
          intakeScroller.intoView(this.paySection, 200)
        }
      }
    }
  }

  handleCreditCardClick = () => {
    const { setPaymentMethodAction } = this.props
    setPaymentMethodAction(CREDITCARD)
    setTimeout(() => { this.scrollPayForm() }, 1200)
  }
  render() {
    const {
      open,
      items,
      paymentMethod,
      intl: {
        formatMessage
      },
      currentStep,
      cardHolderName,
      requestClose,
      billingFirstName,
      taxShipQuery,
      billingStateProvinceCode,
      billingLastName,
      billingStreet,
      billingApartment,
      billingCountry,
      billingStateProvince,
      billingCity,
      billingZipCode,
      billingPhone,
      billingHasError,
      stripeError,
      loadingBilling,
      paymentClientSecret,
      currentCurrency,
      invalidBillingFormAction,
      setLoadingBillingAction,
      setStripeErrorAction,
      showCardForm,
      loadingPlaceOrder,
      setStripeIbanDataAction,
      selectedCard,
      indexAddressSelected,
      showCardFormAction,
      selectCardToPayAction,
      showBillingForm,
      showBillingAddressFormAction,
    } = this.props
    const { stripe, checked, openConfirm, payCompleted } = this.state
    const billingAddress: AddressType = {
      firstName: billingFirstName,
      lastName: billingLastName,
      street: billingStreet,
      apartment: billingApartment,
      country: billingCountry,
      stateProvince: billingStateProvince,
      stateProvinceCode: billingStateProvinceCode,
      city: billingCity,
      zipCode: billingZipCode,
      phone: billingPhone
    }
    const europeStripeAccount = EU_SUBSIDIARY_COUNTRIES.includes(
      billingAddress.country.toLowerCase()
    )
    const paymentIntentLoading =
      paymentMethod === PaymentOptions.CREDITCARD &&
      currentStep === 2 &&
      !paymentClientSecret.length &&
      europeStripeAccount
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
    const showOrderButton = true
    if (!checked && paymentMethod === PaymentOptions.PAYPAL && showOrderButton) {
      this.confirmOrder(true)
    }
    const taxRates = get(taxShipQuery, 'taxes', undefined)
    const subTotal = items.reduce((sum, item) => sum += item.price, 0)

    const taxes = getTaxesServices(billingCountry, subTotal, taxRates)
    const taxGst = get(taxes, 'taxGst', 0)
    const taxPst = get(taxes, 'taxPst', 0)
    const taxFee = get(taxes, 'taxFee', 0)
    const taxesAmount = get(taxes, 'taxesAmount', 0)
    const total = subTotal + taxGst + taxPst + taxFee
    const currency = currentCurrency || config.defaultCurrency
    return (
      <Modal
        visible={open}
        footer={null}
        closable={false}
        width={'700px'}
        style={{ maxWidth: 'calc(93vw)' }}
      >
        <Container>
          {!loadingPlaceOrder && <CloseIcon onClick={requestClose} type="cross" />}
          <HeaderImages>
            <JakrooImage src={jakrooLogo} />
            <PayAnimation src={payAnimation} />
          </HeaderImages>
          {payCompleted ?
            <CompletedDiv>
              <PayCompletedImg src={payCompletedGif} />
              <PayCompleteInfo>
                {formatMessage(messages.paymentSuccess)}
              </PayCompleteInfo>
            </CompletedDiv> :
            <>
              <StepWrapper>
                <Steps current={currentStep}>{steps}</Steps>
              </StepWrapper>
              <ItemList>
                <SelectPayment>
                  <StyledIcon type="shopping-cart" />
                  {formatMessage(messages.details)}
                </SelectPayment>
                <HeadersDiv>
                  <ItemColumn bold={true} width="180px">{formatMessage(messages.item)}</ItemColumn>
                  <ItemColumn bold={true} width="360px">{formatMessage(messages.description)}</ItemColumn>
                  <ItemColumn bold={true} width="72px">{formatMessage(messages.price)}</ItemColumn>
                </HeadersDiv>
                {items.map(({ name, price, description }: ServiceItem, key: number) =>
                  <ItemRow {...{ key }}>
                    <ItemColumn width="180px">{name}</ItemColumn>
                    <ItemColumn width="360px">{description}</ItemColumn>
                    <ItemColumn uppercase={true} width="72px">{currency} {(price || 0).toFixed(2)}</ItemColumn>
                  </ItemRow>
                )}
                {taxGst > 0 && currentStep === 1 &&
                  <ItemRow>
                    <ItemColumn width="180px">GST/HST</ItemColumn>
                    <ItemColumn width="310px">Taxes</ItemColumn>
                    <ItemColumn uppercase={true} width="72px">{currency} {(taxGst || 0).toFixed(2)}</ItemColumn>
                  </ItemRow>
                }
                {taxPst > 0 && currentStep === 1 &&
                  <ItemRow>
                    <ItemColumn width="180px">PST</ItemColumn>
                    <ItemColumn width="310px">Taxes</ItemColumn>
                    <ItemColumn uppercase={true} width="72px">{currency} {(taxPst || 0).toFixed(2)}</ItemColumn>
                  </ItemRow>
                }
                {taxFee > 0 && currentStep === 1 &&
                  <ItemRow>
                    <ItemColumn width="180px">Taxes</ItemColumn>
                    <ItemColumn width="310px">({taxesAmount}%)</ItemColumn>
                    <ItemColumn uppercase={true} width="72px">{currency} {(taxFee || 0).toFixed(2)}</ItemColumn>
                  </ItemRow>
                }
              </ItemList>
              <StyledSwipeableViews
                action={actions => {
                  this.swipeableActions = actions
                }}
                animateHeight={true}
                index={currentStep}
                disabled={true}
              >
                <PaymentDiv>
                  <SelectPayment>
                    <StyledIcon type="credit-card" />
                    {formatMessage(messages.selectPayment)}
                  </SelectPayment>
                  <ContainerMethods>
                    <MethodButton
                      selected={paymentMethod === CREDITCARD}
                      onClick={this.handleCreditCardClick}
                    >
                      <MethodIcon twoToneColor="#009cde" type="credit-card" theme="twoTone" />
                      {formatMessage(messages.methodCreditCard)}
                    </MethodButton>
                    <MethodButton
                      selected={paymentMethod === PAYPAL}
                      onClick={this.handlePaypalClick}
                    >
                      <PaypalIcon src={paypalLogo} />
                    </MethodButton>
                  </ContainerMethods>
                  <PayForm>
                    {paymentMethod && (
                      <StripeProvider stripe={stripe}>
                        <Elements>
                          <CreditCardForm
                            {...{
                              formatMessage,
                              cardHolderName,
                              billingAddress,
                              stripeError,
                              loadingBilling,
                              setLoadingBillingAction,
                              setStripeErrorAction,
                              invalidBillingFormAction,
                              showCardForm,
                              setStripeIbanDataAction,
                              selectedCard,
                              showCardFormAction,
                              selectCardToPayAction,
                              indexAddressSelected,
                              showBillingForm,
                              showBillingAddressFormAction,
                              paymentClientSecret,
                              stripe
                            }}
                            showCard={paymentMethod === CREDITCARD}
                            createPaymentIntent={this.createPaymentIntent}
                            nextStep={this.nextStep}
                            hasError={billingHasError}
                            setSelectedAddress={this.handleOnSelectAddress}
                            setStripeCardDataAction={this.setStripeCardData}
                            selectDropdownAction={this.handleOnDropdownAction}
                            inputChangeAction={this.handleOnChangeInput}
                            isEuSubsidiary={europeStripeAccount}
                          />
                        </Elements>
                      </StripeProvider>
                    )}
                  </PayForm>
                </PaymentDiv>
                <SummaryContainer>
                  <CheckoutSummary
                    country={billingCountry}
                    billing={billingAddress}
                    onPaypalSuccess={this.onPaypalSuccess}
                    onPaypalCancel={this.onPaypalCancel}
                    onPaypalError={this.onPaypalError}
                    placingOrder={loadingPlaceOrder || paymentIntentLoading}
                    onPlaceOrder={this.handleOnPlaceOrder}
                    {...{
                      total,
                      showOrderButton,
                      formatMessage,
                      billingAddress,
                      selectedCard,
                      paymentMethod,
                      currentCurrency,
                    }}
                  />
                </SummaryContainer>
              </StyledSwipeableViews>
              
              <ModalCountry
                {...{ formatMessage }}
                open={openConfirm}
                requestClose={this.handleCancelConfirm}
                onSave={this.handleConfirmSave}
              />
            </>
          }
          <div
            ref={section => {
              this.paySection = section
            }}
          />
        </Container>
      </Modal>
    )
  }
}

interface OwnProps {
  billingCountry?: string
  billingStateProvince?: string
  billingZipCode?: number
  billingStateProvinceCode?: string
}

const mapStateToProps = (state: any) => {
  const payModalProps = state.get('payModal').toJS()
  const langProps = state.get('languageProvider').toJS()
  return {
    ...payModalProps,
    ...langProps
  }
}

const PayModalEnhanced = compose(
  injectIntl,
  withLoading,
  withError,
  PlaceOrderServiceMutation,
  CreatePaymentIntentMutation,
  AddAddressMutation,
  withApollo,
  connect(mapStateToProps, { ...PayModalActions, ...thunkActions }),
  graphql(getTaxQuery, {
    name: 'taxShipQuery',
    options: ({
        billingCountry: country,
        billingStateProvince,
        billingZipCode,
        billingStateProvinceCode
      }: OwnProps) => {
      const taxAddress: TaxAddressObj = country &&
        billingStateProvince &&
        billingZipCode && {
        country,
        stateName: billingStateProvince,
        state: billingStateProvinceCode,
        zipCode: billingZipCode
      }
      return {
        skip: !country || !billingStateProvince || !taxAddress,
        variables: { country, shipAddress: taxAddress },
        fetchPolicy: 'network-only'
      }
    }
  }),
)(PayModal)

export default PayModalEnhanced
