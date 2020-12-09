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
  StyledButton,
  Advise
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
  userProfile: {
    firstName: firstNameUP,
    lastName: lastNameUP,
    email: emailUP,
    phone: phoneUP
  },
  onSaveProfileSettings,
  onToggleModalPassword
}: Props) => {
  const firstNameChanged =
    firstName !== null && firstNameUP !== firstName && firstName
  const lastNameChanged =
    lastName !== null && lastNameUP !== lastName && lastName
  const emailChanged = email !== null && emailUP !== email && email
  const phoneChanged = phone !== null && phoneUP !== phone && phone
  const disabled =
    !firstNameChanged && !lastNameChanged && !emailChanged && !phoneChanged
  const firstNameComponent = (
    <Column inputhWidth={!isMobile ? '48%' : '100%'}>
      <InputTitleContainer>
        <Label>{formatMessage(messages.firstName)}</Label>
      </InputTitleContainer>
      <StyledInput
        id="firstName"
        value={firstName !== null ? firstName : firstNameUP}
        onChange={handleInputChange}
        maxLength={50}
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
        value={lastName !== null ? lastName : lastNameUP}
        onChange={handleInputChange}
        maxLength={50}
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
            id="email"
            disabled={true} // Disabled until they approve client modify
            defaultValue={emailUP}
            onChange={handleInputChange}
          />
        </Column>
      </Row>
      <Advise>{formatMessage(messages.mailAdvise)}</Advise>
      <Row>
        <Column inputhWidth={'100%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.phone)}</Label>
          </InputTitleContainer>
          <StyledInput
            id="phone"
            value={phone !== null ? phone : phoneUP}
            onChange={handleInputChange}
            maxLength={50}
          />
        </Column>
      </Row>
      <Row>
        <Column inputhWidth={!isMobile ? '27%' : '37%'}>
          <StyledButton
            {...{ loading, disabled }}
            type="primary"
            onClick={onSaveProfileSettings}
          >
            {formatMessage(messages.save)}
          </StyledButton>
        </Column>
        <Column inputhWidth={!isMobile ? '40%' : '60%'}>
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
