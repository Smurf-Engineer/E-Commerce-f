/**
 * Payment Component    Created by miguelcanobbio on 16/05/18.
 */
import * as React from 'react'
import upperFirst from 'lodash/upperFirst'
import messages from './messages'
import { StripeProvider, Elements } from 'react-stripe-elements'
import config from '../../config'
import {
  Container,
  Title,
  ContainerMethods,
  MethodButton,
  InvoiceDiv,
  InvoiceTitle,
  InvoiceSubtitle,
  InvoiceInformation,
  InvoiceIcon,
  PaymentIcon,
  PaypalIcon,
  ReferenceIcon,
  CheckIcon,
  ReferenceDiv,
  LabelReference,
  ReferenceInput,
  StripeIcon
} from './styledComponents'
import paypalIcon from '../../assets/paypal_logo.png'
import stripeLogo from '../../assets/stripelogo.png'
import CreditCardForm from '../CreditCardFormBilling'
import { AddressType, StripeCardData, CreditCardData } from '../../types/common'
import Modal from '../../components/ConfirmCountryDialog'
import {
  PaymentOptions
} from '../../screens/Checkout/constants'

const { CREDITCARD, PAYPAL, INVOICE, PAYMENT_LINK } = PaymentOptions

interface Props {
  billingAddress: AddressType
  hasError: boolean
  cardHolderName: string
  email: string
  sameBillingAndShipping: boolean
  stripeError: string
  loadingBilling: boolean
  showContent: boolean
  showCardForm: boolean
  referenceNumber: string
  selectedCard: CreditCardData
  paymentMethod: string
  skip: number
  currentPage: number
  indexAddressSelected: number
  limit: number
  showBillingForm: boolean
  showBillingModal: boolean
  isFixedStore: boolean
  paymentClientSecret: string
  isFixedTeamstore: boolean
  invoiceEnabled: boolean
  isReseller: boolean
  onBehalf: boolean
  invoiceTerms: string
  totalReducer: number
  setPayRef: (payRef: any) => void
  updateReference: (evt: React.FormEvent<HTMLInputElement>) => void
  showBillingAddressFormAction: (show: boolean, modal?: boolean) => void
  setSkipValueAction: (skip: number, currentPage: number) => void
  formatMessage: (messageDescriptor: any) => string
  setStripeCardDataAction: (card: CreditCardData, stripeToken: string) => void
  setLoadingBillingAction: (loading: boolean) => void
  setStripeErrorAction: (error: string) => void
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
  sameBillingAndAddressCheckedAction: () => void
  sameBillingAndAddressUncheckedAction: () => void
  invalidBillingFormAction: (hasError: boolean) => void
  nextStep: () => void
  setPaymentMethodAction: (method: string) => void
  showCardFormAction: (open: boolean) => void
  selectCardToPayAction: (card: StripeCardData, selectedCardId: string) => void
  setSelectedAddress: (
    address: AddressType,
    indexAddress: number,
    billing: boolean
  ) => void
  saveCountryAction: (countryCode: string | null) => void
  setStripeAction: (stripe: any) => void
  createPaymentIntent: () => void
  setAddressEdit: (address: AddressType | {}, billing?: boolean) => void
  updateAddress: (variables: {}) => void
}

interface MyWindow extends Window {
  Stripe: any
}

declare var window: MyWindow

class Payment extends React.PureComponent<Props, {}> {
  state = {
    stripe: null,
    openConfirm: false
  }

  componentDidMount() {
    const { setStripeAction } = this.props
    if (window.Stripe) {
      this.setState(
        {
          stripe: window.Stripe(config.pkStripeUS)
        },
        () => setStripeAction(this.state.stripe)
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
          () => setStripeAction(this.state.stripe)
        )
      }
      // tslint:disable-next-line:no-unused-expression
      document.body && document.body.appendChild(stripeJs)
    }
  }

  handleCancelConfirm = () => {
    this.setState({
      openConfirm: false
    })
  }

  handleConfirmSave = (countryCode: string | null) => {
    const { nextStep, saveCountryAction } = this.props
    this.setState({
      openConfirm: false
    })
    saveCountryAction(countryCode)
    nextStep()
  }

  handlePaypalClick = () => {
    const { setPaymentMethodAction, totalReducer } = this.props
    if (totalReducer > 0) {
      setPaymentMethodAction(PAYPAL)
      this.setState({
        openConfirm: true
      })
    }
  }

  handleCreditCardClick = () => {
    const { setPaymentMethodAction, totalReducer } = this.props
    if (totalReducer > 0) {
      setPaymentMethodAction(CREDITCARD)
    }
  }

  handleInvoiceClick = () => {
    const { setPaymentMethodAction, totalReducer } = this.props
    if (totalReducer > 0) {
      setPaymentMethodAction(INVOICE)
    }
  }

  handlePaymentLinkClick = () => {
    const { setPaymentMethodAction, totalReducer } = this.props
    if (totalReducer > 0) {
      setPaymentMethodAction(PAYMENT_LINK)
    }
  }

  render() {
    const {
      formatMessage,
      billingAddress,
      hasError,
      onBehalf,
      totalReducer,
      cardHolderName,
      sameBillingAndShipping,
      stripeError,
      isReseller,
      referenceNumber,
      updateReference,
      setStripeErrorAction,
      loadingBilling,
      setLoadingBillingAction,
      sameBillingAndAddressCheckedAction,
      sameBillingAndAddressUncheckedAction,
      invalidBillingFormAction,
      nextStep,
      showContent,
      showCardForm,
      invoiceEnabled,
      invoiceTerms,
      showCardFormAction,
      selectCardToPayAction,
      selectedCard,
      paymentMethod,
      skip,
      currentPage,
      setSelectedAddress,
      indexAddressSelected,
      limit,
      setSkipValueAction,
      showBillingForm,
      showBillingModal,
      showBillingAddressFormAction,
      paymentClientSecret,
      createPaymentIntent,
      setPayRef,
      isFixedTeamstore,
      setAddressEdit,
      updateAddress
    } = this.props
    const { stripe, openConfirm } = this.state

    if (!showContent) {
      return <div />
    }
    const disabledMethods = totalReducer <= 0
    const europeStripeAccount = false
    // const europeStripeAccount = EU_SUBSIDIARY_COUNTRIES.includes(
    //   billingAddress.country.toLowerCase()
    // )
    const paymentForm = (
      <CreditCardForm
        {...{
          formatMessage,
          cardHolderName,
          billingAddress,
          hasError,
          stripeError,
          loadingBilling,
          setLoadingBillingAction,
          setStripeErrorAction,
          sameBillingAndShipping,
          sameBillingAndAddressCheckedAction,
          sameBillingAndAddressUncheckedAction,
          invalidBillingFormAction,
          nextStep,
          showCardForm,
          selectedCard,
          showCardFormAction,
          selectCardToPayAction,
          skip,
          currentPage,
          setSelectedAddress,
          indexAddressSelected,
          limit,
          setSkipValueAction,
          showBillingForm,
          disabledMethods,
          showBillingModal,
          showBillingAddressFormAction,
          paymentClientSecret,
          createPaymentIntent,
          isFixedTeamstore,
          stripe,
          setAddressEdit,
          updateAddress
        }}
        ref={(payRef: any) => { setPayRef(payRef) }}
        isInvoice={paymentMethod === INVOICE || paymentMethod === PAYMENT_LINK}
        setStripeCardDataAction={this.setStripeCardData}
        selectDropdownAction={this.handleOnDropdownAction}
        inputChangeAction={this.handleOnChangeInput}
        isEuSubsidiary={europeStripeAccount}
        />
    )
    return (
      <Container>
        <Title>{formatMessage(messages.paymentMethod)}</Title>
        <ContainerMethods secondary={isReseller}>
          <MethodButton
            secondary={isReseller}
            disabledProp={disabledMethods}
            selected={!disabledMethods && paymentMethod === CREDITCARD}
            onClick={this.handleCreditCardClick}
          >
              {!disabledMethods && paymentMethod === CREDITCARD && <CheckIcon type="check-circle" theme="filled" />}
            <PaymentIcon type="credit-card" />
            {formatMessage(messages.methodCreditCard)}
          </MethodButton>
          {!isFixedTeamstore && !onBehalf &&
            <MethodButton
              secondary={isReseller}
              disabledProp={disabledMethods}
              selected={!disabledMethods && paymentMethod === PAYPAL}
              onClick={this.handlePaypalClick}
            >
              {!disabledMethods && paymentMethod === PAYPAL && <CheckIcon type="check-circle" theme="filled" />}
              <PaypalIcon src={paypalIcon} />
            </MethodButton>
          }
          {invoiceEnabled && invoiceTerms &&
            <MethodButton
              selected={!disabledMethods && paymentMethod === INVOICE}
              secondary={isReseller}
              disabledProp={disabledMethods}
              onClick={this.handleInvoiceClick}
            >
              {!disabledMethods && paymentMethod === INVOICE && <CheckIcon type="check-circle" theme="filled" />}
              <PaymentIcon type="audit" />
              {formatMessage(messages.invoice)}
            </MethodButton>
          }
          {onBehalf &&
            <MethodButton
              selected={!disabledMethods && paymentMethod === PAYMENT_LINK}
              secondary={isReseller}
              disabledProp={disabledMethods}
              onClick={this.handlePaymentLinkClick}
            >
              {!disabledMethods && paymentMethod === PAYMENT_LINK && <CheckIcon type="check-circle" theme="filled" />}
              <StripeIcon src={stripeLogo} />
              {formatMessage(messages.paymentLink)}
            </MethodButton>
          }
          {isReseller &&
            <ReferenceDiv>
              <LabelReference><ReferenceIcon type="number" />{formatMessage(messages.reference)}</LabelReference>
              <ReferenceInput
                onChange={updateReference}
                value={referenceNumber}
                placeholder={formatMessage(messages.referencesPlaceholder)}
              />
            </ReferenceDiv>
          }
        </ContainerMethods>
        {paymentMethod === INVOICE && !disabledMethods &&
          <InvoiceDiv>
            <InvoiceTitle><InvoiceIcon type="file-text" />{formatMessage(messages.invoice)}</InvoiceTitle>
            <InvoiceSubtitle>{formatMessage(messages.paymentTerms)} {invoiceTerms}</InvoiceSubtitle>
            <InvoiceInformation>{formatMessage(messages.paymentInfo)}</InvoiceInformation>
          </InvoiceDiv>
        }
        {(paymentMethod === CREDITCARD || paymentMethod === INVOICE || paymentMethod === PAYMENT_LINK) && (
          <StripeProvider stripe={stripe}>
            <Elements>{paymentForm}</Elements>
          </StripeProvider>
        )}
        <Modal
          {...{ formatMessage }}
          open={openConfirm}
          requestClose={this.handleCancelConfirm}
          onSave={this.handleConfirmSave}
        />
      </Container>
    )
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
  handleOnDropdownAction = (id: string, value: string) => {
    const { selectDropdownAction } = this.props
    const customId = 'billing' + upperFirst(id)
    selectDropdownAction(customId, value)
  }
  setStripeCardData = (cardData: CreditCardData, stripeToken: string) => {
    const { setStripeCardDataAction } = this.props
    setStripeCardDataAction(cardData, stripeToken)
  }
}

export default Payment
