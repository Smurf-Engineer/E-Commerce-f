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
  isMobile: boolean
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
  isMobile,
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
    (firstName !== null && !firstName) ||
    !userProfile.firstName ||
    (lastName !== null && !lastName) ||
    !userProfile.lastName ||
    (email !== null && !email) ||
    !userProfile.email ||
    (phone !== null && !phone) ||
    !userProfile.phone
  const firstNameComponent = (
    <Column inputhWidth={!isMobile ? '48%' : '100%'}>
      <InputTitleContainer>
        <Label>{formatMessage(messages.firstName)}</Label>
      </InputTitleContainer>
      <StyledInput
        id="firstName"
        value={firstName !== null ? firstName : userProfile.firstName}
        onChange={handleInputChange}
        maxLength="50"
      />
    </Column>
  )
  const lastNameComponent = (
    <Column inputhWidth={!isMobile ? '48%' : '100%'}>
      <InputTitleContainer>
        <Label>{formatMessage(messages.lastName)}</Label>
      </InputTitleContainer>
      <StyledInput
        id="lastName"
        value={lastName !== null ? lastName : userProfile.lastName}
        onChange={handleInputChange}
        maxLength="50"
      />
    </Column>
  )
  return (
    <Container>
      {!isMobile ? (
        <Row>
          {firstNameComponent}
          {lastNameComponent}
        </Row>
      ) : (
        <div>
          <Row>{firstNameComponent}</Row>
          <Row>{lastNameComponent}</Row>
        </div>
      )}
      <Row>
        <Column inputhWidth={'100%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.email)}</Label>
          </InputTitleContainer>
          <StyledInput
            disabled={true} // TODO: ask flow to change email
            id="email"
            value={email !== null ? email : userProfile.email}
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
            value={phone !== null ? phone : userProfile.phone}
            onChange={handleInputChange}
            maxLength="50"
          />
        </Column>
      </Row>
      <Row>
        <Column inputhWidth={!isMobile ? '27%' : '48%'}>
          <StyledButton
            {...{ loading, disabled }}
            type="primary"
            onClick={onSaveProfileSettings}
          >
            {formatMessage(messages.save)}
          </StyledButton>
        </Column>
        <Column inputhWidth={!isMobile ? '40%' : '48%'}>
          <StyledButton type="primary" onClick={onToggleModalPassword}>
            {formatMessage(messages.changePassword)}
          </StyledButton>
        </Column>
        {!isMobile ? <Column inputhWidth={'11%'} /> : null}
      </Row>
    </Container>
  )
}

export default ProfileForm
