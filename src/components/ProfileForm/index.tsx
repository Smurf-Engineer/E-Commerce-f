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
  StyledInput,
  StyledButton
} from './styledComponents'
import { UserProfileSettings } from '../../types/common'

interface Props {
  loading: boolean
  userProfile: UserProfileSettings
  firstName: string
  lastName: string
  email: string
  phone: string
  formatMessage: (messageDescriptor: any) => string
  handleInputChange: (evt: React.FormEvent<HTMLInputElement>) => void
  onSaveProfileSettings: () => void
  onToggleModalPassword: () => void
}

const ProfileForm = ({
  firstName,
  lastName,
  email,
  phone,
  formatMessage,
  handleInputChange,
  loading,
  userProfile,
  onSaveProfileSettings,
  onToggleModalPassword
}: Props) => {
  const disabled =
    (userProfile.firstName === firstName &&
      userProfile.lastName === lastName &&
      userProfile.email === email &&
      userProfile.phone === phone) ||
    (!firstName || !lastName || !email || !phone)
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
            disabled={true} // TODO: ask flow to change email
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
      <Row>
        <Column inputhWidth={'27%'}>
          <StyledButton
            {...{ loading, disabled }}
            type="primary"
            onClick={onSaveProfileSettings}
          >
            {formatMessage(messages.save)}
          </StyledButton>
        </Column>
        <Column inputhWidth={'40%'}>
          <StyledButton type="primary" onClick={onToggleModalPassword}>
            {formatMessage(messages.changePassword)}
          </StyledButton>
        </Column>
        <Column inputhWidth={'11%'} />
      </Row>
    </Container>
  )
}

export default ProfileForm
