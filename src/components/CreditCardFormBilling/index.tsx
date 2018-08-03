/**
 * CreditCardFormBilling Component - Created by miguelcanobbio on 16/05/18.
 */
import * as React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import AnimateHeight from 'react-animate-height'
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
  ContinueButton,
  StripeCardElement
} from './styledComponents'
import ShippingAddressForm from '../ShippingAddressForm'
import MyAddress from '../MyAddress'
import { AddressType, CreditCardData } from '../../types/common'

interface Props {
  stripe: any
  cardHolderName: string
  billingAddress: AddressType
  hasError: boolean
  stripeError: string
  loadingBilling: boolean
  sameBillingAndShipping: boolean
  showCardForm: boolean
  selectedCard: CreditCardData
  setStripeCardDataAction: (card: CreditCardData) => void
  setLoadingBillingAction: (loading: boolean) => void
  setStripeErrorAction: (error: string) => void
  invalidBillingFormAction: (hasError: boolean) => void
  selectDropdownAction: (id: string, value: string) => void
  formatMessage: (messageDescriptor: any) => string
  inputChangeAction: (id: string, value: string) => void
  sameBillingAndAddressCheckedAction: () => void
  sameBillingAndAddressUncheckedAction: () => void
  nextStep: () => void
}

class CreditCardFormBilling extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      cardHolderName,
      billingAddress: {
        firstName,
        lastName,
        street,
        apartment,
        country,
        stateProvince,
        city,
        zipCode,
        phone
      },
      hasError,
      stripeError,
      loadingBilling,
      selectDropdownAction,
      inputChangeAction,
      sameBillingAndShipping,
      showCardForm
    } = this.props

    return (
      <Container>
        <AnimateHeight height={!showCardForm ? 0 : 'auto'} duration={500}>
          <Row>
            <Column>
              <InputTitleContainer>
                <Label>{formatMessage(messages.cardNumber)}</Label>
                <RequiredSpan>*</RequiredSpan>
              </InputTitleContainer>
              <ContainerInput>
                <CardElement hidePostalCode={true} style={StripeCardElement} />
              </ContainerInput>
              {stripeError && <ErrorMsg>{stripeError}</ErrorMsg>}
            </Column>
          </Row>
          <Row>
            <Column>
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
                hasError && (
                  <ErrorMsg>{formatMessage(messages.requiredField)}</ErrorMsg>
                )}
            </Column>
          </Row>
        </AnimateHeight>
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
                inputChangeAction,
                formatMessage
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
      billingAddress: {
        firstName,
        lastName,
        street,
        apartment,
        country,
        stateProvince,
        city,
        zipCode,
        phone
      },
      sameBillingAndShipping,
      invalidBillingFormAction,
      setStripeErrorAction,
      setLoadingBillingAction,
      setStripeCardDataAction,
      nextStep,
      selectedCard: { id: selectedCardId }
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
    if ((!cardHolderName && !selectedCardId) || error) {
      invalidBillingFormAction(true)
    }
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

    const stripeResponse = !selectedCardId
      ? await stripe.createToken(stripeTokenData)
      : {}

    if (stripeResponse && stripeResponse.error) {
      setStripeErrorAction(stripeResponse.error.message)
    } else {
      if (!selectedCardId) {
        const {
          token: {
            card: { id, name, brand, last4, exp_month, exp_year }
          }
        } = stripeResponse

        const cardData: CreditCardData = {
          id,
          name,
          last4,
          expMonth: exp_month,
          expYear: exp_year,
          brand
        }

        setStripeCardDataAction(cardData)
      }
      nextStep()
    }
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { inputChangeAction } = this.props
    const {
      currentTarget: { id, value }
    } = evt

    const regex = /^[0-9]+$/
    const isNumber = regex.test(value)

    if (value && id === 'phone' && !isNumber) {
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

export default injectStripe(CreditCardFormBilling)
