/**
 * ProfileSettings Component - Created by miguelcanobbio on 31/05/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import * as ProfileSettingsActions from './actions'
// import withError from '../WithError'
// import withLoading from '../WithLoading'
import messages from './messages'
import {
  Container,
  Title,
  SectionContainer,
  Row,
  Column,
  InputTitleContainer,
  Label,
  StyledInput,
  StyledButton
} from './styledComponents'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  firstName: string
  lastName: string
  email: string
  phone: string
  regionId: string
  languageId: string
  currencyId: string
  msrmntMetricSelected: true
  msrmntManSelected: true
  weight: string
  heightFirst: string
  heightSecond: string
  chestSize: string
  waistSize: string
  hipsSize: string
  inseamSize: string
  shouldersSize: string
  neckSize: string
  smsOrderShippingChecked: boolean
  smsDesignUpdatesChecked: boolean
  emailNewsletterChecked: boolean
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
  showPasswordModal: boolean
  passwordModalLoading: boolean
}

class ProfileSettings extends React.Component<Props, {}> {
  render() {
    const { formatMessage } = this.props
    return (
      <Container>
        {/* PROFILE */}
        <Title>{formatMessage(messages.profileTitle)}</Title>
        <SectionContainer>
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
            <Column inputhWidth={'40%'}>
              <StyledButton type="primary">
                {formatMessage(messages.changePassword)}
              </StyledButton>
            </Column>
            <Column inputhWidth={'11%'} />
          </Row>
        </SectionContainer>
        {/* LANGUAGE */}
        <Title>{formatMessage(messages.languageTitle)}</Title>
        <SectionContainer>
          <Row>
            <Column inputhWidth={'31%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.region)}</Label>
              </InputTitleContainer>
            </Column>
            <Column inputhWidth={'31%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.language)}</Label>
              </InputTitleContainer>
            </Column>
            <Column inputhWidth={'31%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.currency)}</Label>
              </InputTitleContainer>
            </Column>
          </Row>
          <Row>
            <Column inputhWidth={'27%'}>
              <StyledButton type="primary" disabled={true}>
                {formatMessage(messages.save)}
              </StyledButton>
            </Column>
            <Column inputhWidth={'51%'} />
          </Row>
        </SectionContainer>
        {/* MEASUREMENTS */}
        <Title>{formatMessage(messages.measurementsTitle)}</Title>
        <SectionContainer>
          <Row>
            <Column inputhWidth={'48%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.weight)}</Label>
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
                <Label>{formatMessage(messages.height)}</Label>
              </InputTitleContainer>
              <StyledInput
                id="heightFirst"
                // value={firstName}
                // onChange={this.handleInputChange}
                maxLength="50"
              />
              <StyledInput
                id="heightSecond"
                // value={firstName}
                // onChange={this.handleInputChange}
                maxLength="50"
              />
            </Column>
          </Row>
          <Row>
            <Column inputhWidth={'31%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.chest)}</Label>
              </InputTitleContainer>
              <StyledInput
                id="chest"
                // value={firstName}
                // onChange={this.handleInputChange}
                maxLength="50"
              />
            </Column>
            <Column inputhWidth={'31%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.waist)}</Label>
              </InputTitleContainer>
              <StyledInput
                id="waist"
                // value={firstName}
                // onChange={this.handleInputChange}
                maxLength="50"
              />
            </Column>
            <Column inputhWidth={'31%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.hips)}</Label>
              </InputTitleContainer>
              <StyledInput
                id="hips"
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
            <Column inputhWidth={'51%'} />
          </Row>
        </SectionContainer>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('profileSettings').toJS()

const ProfileSettingsEnhance = compose(
  connect(mapStateToProps, { ...ProfileSettingsActions })
)(ProfileSettings)

export default ProfileSettingsEnhance
