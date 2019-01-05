import * as React from 'react'
import { injectStripe, IbanElement } from 'react-stripe-elements'
import messages from './messages'
import get from 'lodash/get'
import {
  Container,
  DisclaimerContainer,
  ContainerInput,
  ContinueButton,
  Title,
  StyledInput,
  Row,
  Column,
  RequiredSpan,
  InputTitleContainer,
  Label,
  ErrorMsg
} from './styledComponents'
import { IbanData } from '../../types/common'

interface Props {
  stripe: any
  hasError: boolean
  stripeError: string
  countryError: boolean
  cardHolderName: string
  email: string
  setLoadingBillingAction: (loading: boolean) => void
  invalidBillingFormAction: (hasError: boolean) => void
  setStripeErrorAction: (error: string) => void
  inputChangeAction: (id: string, value: string) => void
  setStripeIbanDataAction: (iban: IbanData) => void
  formatMessage: (messageDescriptor: any) => string
  nextStep: () => void
  handleConfirmSave: (countryCode: string) => void
}

class IbanForm extends React.Component<Props, {}> {
  render() {
    const {
      cardHolderName,
      email,
      formatMessage,
      countryError,
      stripeError,
      hasError
    } = this.props
    return (
      <Container>
        <Title>{formatMessage(messages.iban)}</Title>
        <Row>
          <Column>
            <InputTitleContainer>
              <Label>{formatMessage(messages.name)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id={'cardHolderName'}
              value={cardHolderName}
              onChange={this.handleInputChange}
            />
            {!cardHolderName && hasError && (
              <ErrorMsg>{formatMessage(messages.requiredField)}</ErrorMsg>
            )}
          </Column>
        </Row>
        <Row>
          <Column>
            <InputTitleContainer>
              <Label>{formatMessage(messages.email)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id={'email'}
              value={email}
              onChange={this.handleInputChange}
            />
            {!email && hasError && (
              <ErrorMsg>{formatMessage(messages.requiredField)}</ErrorMsg>
            )}
          </Column>
        </Row>
        <Row>
          <Column>
            <InputTitleContainer>
              <Label>{formatMessage(messages.iban)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <ContainerInput>
              <IbanElement
                supportedCountries={['SEPA']}
                onChange={this.handleOnChangeSepa}
              />
            </ContainerInput>
            {countryError && (
              <ErrorMsg>{formatMessage(messages.error)}</ErrorMsg>
            )}
            {stripeError && <ErrorMsg>{stripeError}</ErrorMsg>}
          </Column>
        </Row>
        <ContinueButton onClick={this.handleOnContinue}>
          {formatMessage(messages.continue)}
        </ContinueButton>
        <Row>
          <Column>
            <DisclaimerContainer id="mandate-acceptance">
              {formatMessage(messages.mandate)}
            </DisclaimerContainer>
          </Column>
        </Row>
      </Container>
    )
  }
  handleOnChangeSepa = (evt: any) => {
    const { handleConfirmSave } = this.props
    const country = get(evt, 'country', '').toLowerCase()
    handleConfirmSave(country)
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
      email,
      invalidBillingFormAction,
      setStripeErrorAction,
      setStripeIbanDataAction,
      setLoadingBillingAction,
      nextStep,
      stripe,
      countryError,
      formatMessage
    } = this.props

    const emptyForm = !cardHolderName && !email
    if (emptyForm || countryError) {
      invalidBillingFormAction(true)
      return
    }

    const stripeSourceData = {
      type: 'sepa_debit',
      currency: 'eur',
      owner: {
        name: cardHolderName,
        email: email
      },
      mandate: {
        notification_method: 'email'
      }
    }
    setLoadingBillingAction(true)
    try {
      const stripeResponse = await stripe.createSource(stripeSourceData)
      if (stripeResponse.error) {
        setStripeErrorAction(stripeResponse.error.message)
      } else {
        const { id, owner, sepa_debit } = stripeResponse.source

        const ibanData: IbanData = {
          id,
          name: owner.name,
          email: owner.email,
          last4: sepa_debit.last4
        }

        setStripeIbanDataAction(ibanData)
        nextStep()
      }
    } catch (err) {
      setStripeErrorAction(formatMessage(messages.unknowError))
    }
  }
}

export default injectStripe(IbanForm)
