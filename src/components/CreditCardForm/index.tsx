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
  StyledInput
} from './styledComponents'

interface Props {
  stripe: any
  cardHolderName: string
  formatMessage: (messageDescriptor: any) => string
  inputChangeAction: (id: string, value: string) => void
}

class CreditCardForm extends React.Component<Props, {}> {
  render() {
    const { formatMessage, cardHolderName } = this.props
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
          </Column>
        </Row>
      </Container>
    )
  }

  handleSubmit = async (ev: any) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault()
    const { stripe } = this.props
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    const token = await stripe.createToken({ name: 'Jenny Rosen' })
    console.log('Received Stripe token:', token)

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
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
}

export default injectStripe(CreditCardForm)
