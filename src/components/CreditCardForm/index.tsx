/**
 * CreditCardForm Component
 */
import * as React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import messages from './messages'
import AnimateHeight from 'react-animate-height'
import get from 'lodash/get'
import {
  Row,
  Column,
  InputTitleContainer,
  Label,
  RequiredSpan,
  ContainerInput,
  StyledInput,
  ErrorMsg,
  ContinueButton,
  StripeCardElement
} from './styledComponents'

interface Props {
  stripe: any
  stripeError: string
  cardHolderName: string
  hasError: boolean
  showCardForm: boolean
  loadingBilling: boolean
  sameBillingAndShipping: boolean
  invalidBillingFormAction: (hasError: boolean) => void
  setStripeErrorAction: (error: string) => void
  setLoadingBillingAction: (loading: boolean) => void
  setStripeCardDataAction: (card: CreditCardData, stripeToken: string) => void
  nextStep: () => void
  selectedCard: CreditCardData
  formatMessage: (messageDescriptor: any) => string
  inputChangeAction: (id: string, value: string) => void
  handleOnContinue: (ev: any) => void
}
class CreditCardFormBilling extends React.Component<Props, {}> {

  render() {
    const {
      formatMessage,
      stripeError,
      cardHolderName,
      hasError,
      showCardForm,
      loadingBilling
    } = this.props

    return (
      <div>
        <AnimateHeight height={!showCardForm ? 0 : 'auto'} duration={500}>
          <Row>
            <Column>
              <InputTitleContainer>
                <Label>{formatMessage(messages.cardNumber)}</Label>
                <RequiredSpan>*</RequiredSpan>
              </InputTitleContainer>
              <ContainerInput>
                <CardElement
                  hidePostalCode={true}
                  style={StripeCardElement}
                />
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
                  <ErrorMsg>
                    {formatMessage(messages.requiredField)}
                  </ErrorMsg>
                )}
            </Column>
          </Row>

        </AnimateHeight>
        <ContinueButton
          onClick={this.handleOnContinue}
          loading={loadingBilling}
        >
          {formatMessage(messages.continue)}
        </ContinueButton>
      </div>

    )
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { inputChangeAction } = this.props
    const {
      currentTarget: { id, value }
    } = evt

    inputChangeAction(id, value)
  }
  handleOnContinue = async (ev: any) => {
    const {
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
      invalidBillingFormAction,
      setStripeErrorAction,
      setLoadingBillingAction,
      setStripeCardDataAction,
      nextStep,
      selectedCard,
      stripe
    } = this.props

    const selectedCardId = get(selectedCard, 'id', '')

    const emptyForm =
      !sameBillingAndShipping &&
      (!firstName ||
        !lastName ||
        !street ||
        !country ||
        !stateProvince ||
        !city ||
        !zipCode ||
        !phone)

    if ((!cardHolderName && !selectedCardId) || emptyForm) {
      invalidBillingFormAction(true)
      return
    }
    const stripeTokenData = {
      name: cardHolderName,
      address_line1: `${street}`,
      address_line2: `${apartment}`,
      address_city: `${city}`,
      address_state: `${stateProvince}`,
      address_zip: `${zipCode}`,
      address_country: `${country}`
    }
    setLoadingBillingAction(true)

    const stripeResponse = !selectedCardId
      ? await stripe.createToken(stripeTokenData)
      : {}
    if (stripeResponse && stripeResponse.error) {
      setStripeErrorAction(stripeResponse.error.message)
    } else if (!emptyForm) {
      if (!selectedCardId) {
        const {
          token: {
            id: tokenId,
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

        setStripeCardDataAction(cardData, tokenId)
      }
      nextStep()
    }
  }
}

export default injectStripe(CreditCardFormBilling)