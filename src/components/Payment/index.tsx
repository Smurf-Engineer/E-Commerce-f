/**
 * Payment Component - Created by miguelcanobbio on 16/05/18.
 */
import * as React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import messages from './messages'
import {
  Container,
  Title,
  ContainerMethods,
  MethodButton,
  ContainerBilling,
  StyledCheckbox
} from './styledComponents'
import ShippingAddressForm from '../ShippingAddressForm'
import CreditCardForm from '../CreditCardForm'
import MyAddress from '../MyAddress'

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
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
  sameBillingAndAddressCheckedAction: () => void
  sameBillingAndAddressUncheckedAction: () => void
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
      selectDropdownAction,
      inputChangeAction
    } = this.props
    const { stripe } = this.state
    return (
      <Container>
        <Title>{formatMessage(messages.paymentMethod)}</Title>
        <ContainerMethods>
          <MethodButton>
            {formatMessage(messages.methodCreditCard)}
          </MethodButton>
          <MethodButton>{formatMessage(messages.methodPaypal)}</MethodButton>
          <MethodButton>{formatMessage(messages.methodAlipay)}</MethodButton>
          <MethodButton>
            {formatMessage(messages.methodBankTransfer)}
          </MethodButton>
        </ContainerMethods>
        <Title>{formatMessage(messages.methodCreditCard)}</Title>
        <StripeProvider {...{ stripe }}>
          <Elements>
            <CreditCardForm
              {...{
                stripe,
                formatMessage,
                cardHolderName,
                inputChangeAction
              }}
            />
          </Elements>
        </StripeProvider>
        <ContainerBilling>
          <Title>{formatMessage(messages.billingAddress)}</Title>
          <StyledCheckbox
            checked={sameBillingAndShipping}
            onChange={this.handleOnChangeDefaultShipping}
          >
            {formatMessage(messages.sameShippingAddress)}
          </StyledCheckbox>
          {!sameBillingAndShipping ? (
            <ShippingAddressForm
              {...{
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
                selectDropdownAction,
                inputChangeAction
              }}
            />
          ) : (
            <MyAddress
              {...{ street, zipCode, country, formatMessage }}
              name={`${firstName} ${lastName}`}
              city={`${city} ${stateProvince}`}
              addressIndex={-1}
              hideBottomButtons={true}
            />
          )}
        </ContainerBilling>
      </Container>
    )
  }

  handleOnChangeDefaultShipping = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      sameBillingAndAddressCheckedAction,
      sameBillingAndAddressUncheckedAction
    } = this.props
    const {
      target: { checked }
    } = event
    checked
      ? sameBillingAndAddressCheckedAction()
      : sameBillingAndAddressUncheckedAction()
  }
}

export default Payment
