/**
 * ProfileSettings Component - Created by miguelcanobbio on 31/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import {
  Container,
  Title,
  ProfileContainer,
  Row,
  Column,
  InputTitleContainer,
  Label,
  StyledInput,
  StyledButton
} from './styledComponents'

interface Props {
  formatMessage: (messageDescriptor: any) => string
}

class ProfileSettings extends React.Component<Props, {}> {
  render() {
    const { formatMessage } = this.props
    return (
      <Container>
        <Title>{formatMessage(messages.profileTitle)}</Title>
        <ProfileContainer>
          <Row>
            <Column inputhWidth={'48%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.firstName)}</Label>
              </InputTitleContainer>
              <StyledInput
                id="firstName"
                // value={firstName}
                // onChange={this.handleInputChange}
                maxLength="50"
              />
            </Column>
            <Column inputhWidth={'48%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.lastName)}</Label>
              </InputTitleContainer>
              <StyledInput
                id="lastName"
                // value={firstName}
                // onChange={this.handleInputChange}
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
                // value={firstName}
                // onChange={this.handleInputChange}
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
                // value={firstName}
                // onChange={this.handleInputChange}
                maxLength="50"
              />
            </Column>
          </Row>
          <Row>
            <Column inputhWidth={'27%'}>
              <StyledButton type="primary" disabled={true}>
                {formatMessage(messages.save)}
              </StyledButton>
            </Column>
            <Column inputhWidth={'47%'}>
              <StyledButton type="primary">
                {formatMessage(messages.changePassword)}
              </StyledButton>
            </Column>
            <Column inputhWidth={'11%'} />
          </Row>
        </ProfileContainer>
      </Container>
    )
  }
}

export default ProfileSettings
