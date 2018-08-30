/**
 * CreditCardForm Component - Created by miguelcanobbio on 29/05/18.
 */
import * as React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import Modal from 'antd/lib/modal'
import messages from './messages'
import {
  Container,
  Row,
  Column,
  InputTitleContainer,
  Label,
  RequiredSpan,
  ContainerInput,
  ErrorMsg,
  StyledInput,
  StripeCardElement,
  StyledButton,
  StyledGhostButton,
  StyledCheckbox
} from './styledComponents'

interface Props {
  stripe?: any
  stripeError: string
  cardHolderName: string
  hasError: boolean
  visible: boolean
  newCardLoading: boolean
  cardAsDefaultPayment: boolean
  saveAddress: (token: string) => void
  formatMessage: (messageDescriptor: any) => string
  inputChangeAction: (id: string, value: string) => void
  showCardModalAction: (show: boolean) => void
  validFormAction: (hasError: boolean) => void
  setModalLoadingAction: (loading: boolean) => void
  setDefaultPaymentCheckedAction: (checked: boolean) => void
  setStripeErrorAction: (error: string) => void
}

class ModalCreditCard extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      stripeError,
      cardHolderName,
      hasError,
      newCardLoading,
      visible,
      cardAsDefaultPayment
    } = this.props
    return (
      <Modal
        {...{ visible }}
        confirmLoading={newCardLoading}
        footer={[
          <StyledGhostButton key="cancel" onClick={this.handleOnCancel}>
            {formatMessage(messages.cancel)}
          </StyledGhostButton>,
          <StyledButton
            type="primary"
            key="submit"
            loading={newCardLoading}
            onClick={this.handleOnRequestToken}
          >
            {formatMessage(messages.saveCard)}
          </StyledButton>
        ]}
        closable={false}
        maskClosable={false}
        destroyOnClose={true}
      >
        <Container>
          <Row>
            <Column inputhWidth={'100%'}>
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
            <Column inputhWidth={'100%'}>
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
          <Row withoutMargin={true}>
            <StyledCheckbox
              checked={cardAsDefaultPayment}
              onChange={this.handleOnDefaultChecked}
            >
              {formatMessage(messages.defaultPayment)}
            </StyledCheckbox>
          </Row>
        </Container>
      </Modal>
    )
  }

  handleOnDefaultChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setDefaultPaymentCheckedAction } = this.props
    const {
      target: { checked }
    } = event
    setDefaultPaymentCheckedAction(checked)
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { inputChangeAction } = this.props
    const {
      currentTarget: { id, value }
    } = evt
    inputChangeAction(id, value)
  }

  handleOnCancel = () => {
    const { showCardModalAction } = this.props
    showCardModalAction(false)
  }

  handleOnRequestToken = async () => {
    const {
      stripe,
      cardHolderName,
      setStripeErrorAction,
      validFormAction,
      setModalLoadingAction,
      saveAddress
    } = this.props

    if (!cardHolderName) {
      validFormAction(true)
    } else {
      setModalLoadingAction(true)
    }
    const stripeResponse = await stripe.createToken({ name: cardHolderName })
    const { error } = stripeResponse
    if (error) {
      setStripeErrorAction(error.message)
    } else {
      if (!cardHolderName) {
        setModalLoadingAction(false)
        return
      }
      const {
        token: { id }
      } = stripeResponse
      saveAddress(id)
    }
  }
}

export default injectStripe(ModalCreditCard)
