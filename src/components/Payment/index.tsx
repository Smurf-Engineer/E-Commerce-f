/**
 * Payment Component - Created by miguelcanobbio on 16/05/18.
 */
import * as React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import upperFirst from 'lodash/upperFirst'
import messages from './messages'
import {
  Container,
  Title,
  ContainerMethods,
  MethodButton
} from './styledComponents'
import CreditCardForm from '../CreditCardForm'

interface Props {
  formatMessage: (messageDescriptor: any) => string
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
  cardHolderName: string
  sameBillingAndShipping: boolean
  stripeError: string
  loadingBilling: boolean
  setStripeTokenAction: (token: string) => void
  setLoadingBillingAction: (loading: boolean) => void
  setStripeErrorAction: (error: string) => void
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
  sameBillingAndAddressCheckedAction: () => void
  sameBillingAndAddressUncheckedAction: () => void
  invalidBillingFormAction: (hasError: boolean) => void
  nextStep: () => void
}

interface MyWindow extends Window {
  Stripe: any
}

declare var window: MyWindow

class Payment extends React.PureComponent<Props, {}> {
  state = {
    stripe: null
  }
  componentDidMount() {
    // In addition to loading asynchronously, this code is safe to server-side render.
    const stripeJs = document.createElement('script')
    stripeJs.src = 'https://js.stripe.com/v3/'
    stripeJs.async = true
    stripeJs.onload = () => {
      this.setState({
        stripe: window.Stripe('pk_test_lkyGYEP7Utu0LB0RytmjtAcA')
      })
    }
    // tslint:disable-next-line:no-unused-expression
    document.body && document.body.appendChild(stripeJs)
  }
  render() {
    const {
      formatMessage,
      firstName,
      lastName,
      street,
      apartment,
      country,
      stateProvince,
      city,
      zipCode,
      phone,
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
      setStripeTokenAction,
      nextStep
    } = this.props
    const { stripe } = this.state
    return (
      <Container>
        <Title>{formatMessage(messages.paymentMethod)}</Title>
        <ContainerMethods>
          <MethodButton>
            {formatMessage(messages.methodCreditCard)}
          </MethodButton>
          {/* <MethodButton>{formatMessage(messages.methodPaypal)}</MethodButton>
          <MethodButton>{formatMessage(messages.methodAlipay)}</MethodButton>
          <MethodButton>
            {formatMessage(messages.methodBankTransfer)}
          </MethodButton> */}{' '}
          {/* TODO: uncomment MethodButtons when paypal, alipay and bank transfer are able */}
        </ContainerMethods>
        <Title>{formatMessage(messages.methodCreditCard)}</Title>
        <StripeProvider {...{ stripe }}>
          <Elements>
            <CreditCardForm
              {...{
                stripe,
                formatMessage,
                cardHolderName,
                firstName,
                lastName,
                street,
                apartment,
                country,
                stateProvince,
                city,
                zipCode,
                phone,
                hasError,
                stripeError,
                loadingBilling,
                setLoadingBillingAction,
                setStripeErrorAction,
                sameBillingAndShipping,
                sameBillingAndAddressCheckedAction,
                sameBillingAndAddressUncheckedAction,
                invalidBillingFormAction,
                setStripeTokenAction,
                nextStep
              }}
              selectDropdownAction={this.handleOnDropdownAction}
              inputChangeAction={this.handleOnChangeInput}
            />
          </Elements>
        </StripeProvider>
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
