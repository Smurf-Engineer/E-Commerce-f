/**
 * Payment Component - Created by miguelcanobbio on 16/05/18.
 */
import * as React from 'react'
import upperFirst from 'lodash/upperFirst'
import messages from './messages'
import {
  Container,
  Title,
  ContainerMethods,
  MethodButton
} from './styledComponents'
import CreditCardForm from '../CreditCardFormBilling'
import { AddressType, StripeCardData, CreditCardData } from '../../types/common'
import Modal from '../../components/ConfirmCountryDialog'
import { PaymentOptions } from '../../screens/Checkout/constants'
const { CREDITCARD, PAYPAL } = PaymentOptions

interface Props {
  billingAddress: AddressType
  hasError: boolean
  cardHolderName: string
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

class Payment extends React.PureComponent<Props, {}> {
  state = { openConfirm: false }

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
    const { setPaymentMethodAction } = this.props
    setPaymentMethodAction(PAYPAL)
    this.setState({
      openConfirm: true
    })
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
    const { openConfirm } = this.state

    if (!showContent) {
      return <div />
    }

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
            selected={paymentMethod === PAYPAL}
            onClick={this.handlePaypalClick}
          >
            {formatMessage(messages.methodPaypal)}
          </MethodButton>
          {/* <MethodButton>{formatMessage(messages.methodAlipay)}</MethodButton>
          <MethodButton>
            {formatMessage(messages.methodBankTransfer)}
          </MethodButton> */}
          {/* TODO: uncomment MethodButtons when paypal, alipay and bank transfer are able */}
        </ContainerMethods>
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
    if (id !== 'cardHolderName') {
      const customId = 'billing' + upperFirst(id)
      inputChangeAction(customId, value)
      return
    }
    inputChangeAction(id, value)
  }
  handleOnDropdownAction = (id: string, value: string) => {
    const { selectDropdownAction } = this.props
    const customId = 'billing' + upperFirst(id)
    selectDropdownAction(customId, value)
  }
}

export default Payment
