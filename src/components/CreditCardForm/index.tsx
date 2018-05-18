/**
 * CreditCardForm Component - Created by miguelcanobbio on 16/05/18.
 */
import * as React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import messages from './messages'
import {
  Container,
  Row,
  Column,
  InputTitleContainer,
  Label,
  RequiredSpan,
  ContainerInput,
  StyledInput,
  ContainerBilling,
  Title,
  ErrorMsg,
  StyledCheckbox,
  ContinueButton
} from './styledComponents'
import ShippingAddressForm from '../ShippingAddressForm'
import MyAddress from '../MyAddress'

interface Props {
  stripe: any
  cardHolderName: string
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
  sameBillingAndShipping: boolean
  selectDropdownAction: (id: string, value: string) => void
  formatMessage: (messageDescriptor: any) => string
  inputChangeAction: (id: string, value: string) => void
  sameBillingAndAddressCheckedAction: () => void
  sameBillingAndAddressUncheckedAction: () => void
}

class CreditCardForm extends React.Component<Props, {}> {
  render() {
    const {
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
      selectDropdownAction,
      inputChangeAction,
      sameBillingAndShipping
    } = this.props
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Column inputhWidth={'70%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.cardNumber)}</Label>
                <RequiredSpan>*</RequiredSpan>
              </InputTitleContainer>
              <ContainerInput>
                <CardElement
                  hidePostalCode={true}
                  style={{
                    base: { fontSize: '18px', fontFamily: 'Avenir Next' }
                  }}
                />
              </ContainerInput>
            </Column>
          </Row>
          <Row>
            <Column inputhWidth={'70%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.cardholderName)}</Label>
                <RequiredSpan>*</RequiredSpan>
              </InputTitleContainer>
              <StyledInput
                id={'cardHolderName'}
                value={cardHolderName}
                onChange={this.handleInputChange}
              />
              {!cardHolderName &&
                hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
            </Column>
          </Row>
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
          <ContinueButton>{formatMessage(messages.continue)}</ContinueButton>
        </form>
      </Container>
    )
  }

  handleSubmit = async (ev: any) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault()
    const {
      stripe,
      cardHolderName,
      sameBillingAndShipping,
      setBillingError
    } = this.props

    if (cardHolderName && sameBillingAndShipping) {
      // Within the context of `Elements`, this call to createToken knows which Element to
      // tokenize, since there's only one in this group.
      const token = await stripe.createToken({ name: cardHolderName })
      console.log('Received Stripe token:', token)

      // However, this line of code will do the same thing:
      // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    } else {
    }
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { inputChangeAction } = this.props
    const {
      currentTarget: { id, value }
    } = evt

    const regex = /^[0-9]+$/
    const isNumber = regex.test(value)

    if (value && (id === 'zipCode' || id === 'phone') && !isNumber) {
      return
    }
    inputChangeAction(id, value)
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

export default injectStripe(CreditCardForm)
