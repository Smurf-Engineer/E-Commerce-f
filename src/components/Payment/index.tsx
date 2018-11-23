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
  MethodButton
} from './styledComponents'
import CreditCardForm from '../CreditCardFormBilling'
import IbanForm from '../IbanForm'
import { AddressType, StripeCardData, CreditCardData } from '../../types/common'
import Modal from '../../components/ConfirmCountryDialog'
import { PaymentOptions, COUNTRY_CODE_DE } from '../../screens/Checkout/constants'
const { CREDITCARD, PAYPAL, IBAN } = PaymentOptions

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
  selectedCard: CreditCardData
  paymentMethod: string
  skip: number
  currentPage: number
  indexAddressSelected: number
  limit: number
  showBillingForm: boolean
  showBillingAddressFormAction: (show: boolean) => void
  setSkipValueAction: (skip: number, currentPage: number) => void
  formatMessage: (messageDescriptor: any) => string
  setStripeCardDataAction: (card: CreditCardData) => void
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
}

interface MyWindow extends Window {
  Stripe: any
}

declare var window: MyWindow

class Payment extends React.PureComponent<Props, {}> {
  state = {
    stripe: null,
    openConfirm: false,
    ibanError: true
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(config.pkStripeUS) })
    } else {
      // this code is safe to server-side render.
      const stripeJs = document.createElement('script')
      stripeJs.id = 'stripe-js'
      stripeJs.async = true
      stripeJs.src = 'https://js.stripe.com/v3/'
      stripeJs.onload = () => {
        this.setState({
          stripe: window.Stripe(config.pkStripeUS)
        })
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
    const { nextStep, saveCountryAction, paymentMethod } = this.props
    this.setState({
      openConfirm: false
    })
    saveCountryAction(countryCode)
    if (paymentMethod === IBAN) {
      const notEU = countryCode !== COUNTRY_CODE_DE
      this.setState({
        ibanError: notEU
      })
    } else {
      nextStep()
    }
  }

  handlePaypalClick = () => {
    const { setPaymentMethodAction } = this.props
    setPaymentMethodAction(PAYPAL)
    this.setState({
      openConfirm: true,
      ibanError: false
    })
  }

  handleIbanClick = () => {
    const { setPaymentMethodAction } = this.props
    setPaymentMethodAction(IBAN)
    this.setState({
      openConfirm: true
    })
  }

  handleCreditCardClick = () => {
    const { setPaymentMethodAction } = this.props
    setPaymentMethodAction(CREDITCARD)
    this.setState({
      ibanError: false
    })
  }

  render() {
    const {
      formatMessage,
      billingAddress,
      hasError,
      cardHolderName,
      email,
      sameBillingAndShipping,
      stripeError,
      setStripeErrorAction,
      loadingBilling,
      setLoadingBillingAction,
      sameBillingAndAddressCheckedAction,
      sameBillingAndAddressUncheckedAction,
      invalidBillingFormAction,
      setStripeCardDataAction,
      nextStep,
      showContent,
      showCardForm,
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
      showBillingAddressFormAction
    } = this.props
    const { stripe, openConfirm, ibanError } = this.state

    if (!showContent) {
      return <div />
    }

    const paymentForm = (paymentMethod === CREDITCARD) ? (
      <CreditCardForm
        {...{
          stripe,
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
          setStripeCardDataAction,
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
          showBillingAddressFormAction
        }}
        selectDropdownAction={this.handleOnDropdownAction}
        inputChangeAction={this.handleOnChangeInput}
      />
    ) : (
        <IbanForm
          disabled={ibanError}
          {...{
            stripe,
            cardHolderName,
            email,
            formatMessage,
            hasError,
            stripeError,
            nextStep,
            setLoadingBillingAction,
            invalidBillingFormAction,
            setStripeErrorAction,
          }}
          inputChangeAction={this.handleOnChangeInput}
        />
      )

    return (
      <Container>
        <Title>{formatMessage(messages.paymentMethod)}</Title>
        <ContainerMethods>
          <MethodButton
            selected={paymentMethod === CREDITCARD}
            onClick={this.handleCreditCardClick}
          >
            {formatMessage(messages.methodCreditCard)}
          </MethodButton>
          <MethodButton
            selected={paymentMethod === IBAN}
            onClick={this.handleIbanClick}
          >
            {formatMessage(messages.methodIban)}
          </MethodButton>
          <MethodButton
            selected={paymentMethod === PAYPAL}
            onClick={this.handlePaypalClick}
          >
            {formatMessage(messages.methodPaypal)}
          </MethodButton>
        </ContainerMethods>
        <StripeProvider {...{ stripe }}>
          <Elements>
            {paymentForm}
          </Elements>
        </StripeProvider>
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
}

export default Payment
