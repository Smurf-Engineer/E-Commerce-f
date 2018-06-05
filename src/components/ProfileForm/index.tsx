/**
 * ProfileForm Component - Created by miguelcanobbio on 05/06/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  Row,
  Column,
  InputTitleContainer,
  Label,
  StyledInput
} from './styledComponents'

interface Props {
  firstName: string
  lastName: string
  email: string
  phone: string
  formatMessage: (messageDescriptor: any) => string
  handleInputChange: (evt: React.FormEvent<HTMLInputElement>) => void
}

const ProfileForm = ({
  firstName,
  lastName,
  email,
  phone,
  formatMessage,
  handleInputChange
}: Props) => {
  return (
    <Container>
      <Row>
        <Column inputhWidth={'48%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.firstName)}</Label>
          </InputTitleContainer>
          <StyledInput
            id="firstName"
            value={firstName}
            onChange={handleInputChange}
            maxLength="50"
          />
        </Column>
        <Column inputhWidth={'48%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.lastName)}</Label>
          </InputTitleContainer>
          <StyledInput
            id="lastName"
            value={lastName}
            onChange={handleInputChange}
            maxLength="50"
          />
        </Column>
      </Row>
      <Row>
        <Column inputhWidth={'100%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.email)}</Label>
          </InputTitleContainer>
          <StyledInput
            id="email"
            value={email}
            onChange={handleInputChange}
            maxLength="50"
          />
        </Column>
      </Row>
      <Row>
        <Column inputhWidth={'100%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.phone)}</Label>
          </InputTitleContainer>
          <StyledInput
            id="phone"
            value={phone}
            onChange={handleInputChange}
            maxLength="50"
          />
        </Column>
      </Row>
    </Container>
  )
}

export default ProfileForm
