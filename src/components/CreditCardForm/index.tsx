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
  stripeError: string
  loadingBilling: boolean
  setStripeTokenAction: (token: string) => void
  setLoadingBillingAction: (loading: boolean) => void
  sameBillingAndShipping: boolean
  setStripeErrorAction: (error: string) => void
  validBillingFormAction: (hasError: boolean) => void
  selectDropdownAction: (id: string, value: string) => void
  formatMessage: (messageDescriptor: any) => string
  inputChangeAction: (id: string, value: string) => void
  sameBillingAndAddressCheckedAction: () => void
  sameBillingAndAddressUncheckedAction: () => void
  nextStep: () => void
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
      stripeError,
      loadingBilling,
      selectDropdownAction,
      inputChangeAction,
      sameBillingAndShipping
    } = this.props
    return (
      <Container>
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
            {stripeError && <ErrorMsg>{stripeError}</ErrorMsg>}
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
        <ContinueButton
          onClick={this.handleOnContinue}
          loading={loadingBilling}
        >
          {formatMessage(messages.continue)}
        </ContinueButton>
      </Container>
    )
  }

  handleOnContinue = async (ev: any) => {
    const {
      stripe,
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
      sameBillingAndShipping,
      validBillingFormAction,
      setStripeErrorAction,
      setLoadingBillingAction,
      setStripeTokenAction,
      nextStep
    } = this.props

    const error =
      !sameBillingAndShipping &&
      (!firstName ||
        !lastName ||
        !street ||
        !apartment ||
        !country ||
        !stateProvince ||
        !city ||
        !zipCode ||
        !phone)

    if (cardHolderName && !error) {
      const stripeTokenData = {
        name: cardHolderName,
        address_line1: `${street}`,
        address_line2: `${apartment}`,
        address_city: `${city}`,
        address_state: `${stateProvince}`,
        address_zip: `${zipCode}`,
        address_country: 'US' // TODO: add correct country code
      }
      setLoadingBillingAction(true)
      const stripeResponse = await stripe.createToken(stripeTokenData)
      if (stripeResponse.error) {
        setStripeErrorAction(stripeResponse.error.message)
        return
      }
      setStripeTokenAction(stripeResponse.token.id)
      nextStep()
    } else {
      validBillingFormAction(true)
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
