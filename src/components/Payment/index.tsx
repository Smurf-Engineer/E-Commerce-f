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
import {
  PaymentOptions,
  EU_SUBSIDIARY_COUNTRIES
} from '../../screens/Checkout/constants'
import { IbanData } from '../../types/common'

const { CREDITCARD, PAYPAL, IBAN } = PaymentOptions

interface Props {
  billingAddress: AddressType
  hasError: boolean
  cardHolderName: string
  email: string
  sameBillingAndShipping: boolean
  stripeError: string
  ibanError: boolean
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
  paymentClientSecret: string
  showBillingAddressFormAction: (show: boolean) => void
  setSkipValueAction: (skip: number, currentPage: number) => void
  formatMessage: (messageDescriptor: any) => string
  setStripeCardDataAction: (card: CreditCardData, stripeToken: string) => void
  setLoadingBillingAction: (loading: boolean) => void
  setStripeErrorAction: (error: string) => void
  setIbanErrorAction: (isError: boolean) => void
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
  setStripeIbanDataAction: (iban: IbanData) => void
  setStripeAction: (stripe: any) => void
  createPaymentIntent: () => void
}

interface MyWindow extends Window {
  Stripe: any
}

declare var window: MyWindow

class Payment extends React.PureComponent<Props, {}> {
  state = {
    stripe: null,
    openConfirm: false,
    euStripe: null
  }

  componentDidMount() {
    const { setStripeAction } = this.props
    if (window.Stripe) {
      this.setState(
        {
          stripe: window.Stripe(config.pkStripeUS),
          euStripe: window.Stripe(config.pkStripeEU)
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
            euStripe: window.Stripe(config.pkStripeEU)
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
    const {
      nextStep,
      saveCountryAction,
      paymentMethod,
      setIbanErrorAction
    } = this.props
    this.setState({
      openConfirm: false
    })
    saveCountryAction(countryCode)
    if (paymentMethod === IBAN) {
      const sepaCountry =
        !!countryCode && EU_SUBSIDIARY_COUNTRIES.includes(countryCode)
      const isError = countryCode == null || !sepaCountry
      setIbanErrorAction(isError)
    } else {
      nextStep()
    }
  }

  handlePaypalClick = () => {
    const { setPaymentMethodAction } = this.props
    setPaymentMethodAction(PAYPAL)
    this.setState({
      openConfirm: true
    })
  }

  handleIbanClick = () => {
    const { setPaymentMethodAction } = this.props
    setPaymentMethodAction(IBAN)
  }

  handleCreditCardClick = () => {
    const { setPaymentMethodAction } = this.props
    setPaymentMethodAction(CREDITCARD)
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
      ibanError,
      setStripeErrorAction,
      loadingBilling,
      setLoadingBillingAction,
      sameBillingAndAddressCheckedAction,
      sameBillingAndAddressUncheckedAction,
      invalidBillingFormAction,
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
      showBillingAddressFormAction,
      setStripeIbanDataAction,
      paymentClientSecret,
      createPaymentIntent
    } = this.props
    const { stripe, openConfirm, euStripe } = this.state

    if (!showContent) {
      return <div />
    }

    const paymentForm =
      paymentMethod === CREDITCARD ? (
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
            showBillingAddressFormAction,
            paymentClientSecret,
            createPaymentIntent
          }}
          setStripeCardDataAction={this.setStripeCardData}
          selectDropdownAction={this.handleOnDropdownAction}
          inputChangeAction={this.handleOnChangeInput}
        />
      ) : (
        <IbanForm
          countryError={ibanError}
          stripe={euStripe}
          {...{
            cardHolderName,
            email,
            formatMessage,
            hasError,
            stripeError,
            nextStep,
            setLoadingBillingAction,
            invalidBillingFormAction,
            setStripeErrorAction,
            setStripeIbanDataAction
          }}
          handleConfirmSave={this.handleConfirmSave}
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

        {paymentMethod === CREDITCARD && (
          <StripeProvider stripe={stripe}>
            <Elements>{paymentForm}</Elements>
          </StripeProvider>
        )}
        {paymentMethod !== CREDITCARD && (
          <StripeProvider stripe={euStripe}>
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
