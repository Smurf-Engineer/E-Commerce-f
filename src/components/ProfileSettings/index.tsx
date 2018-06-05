/**
 * ProfileSettings Component - Created by miguelcanobbio on 31/05/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import RadioGroup from 'antd/lib/radio/group'
import RadioButton from 'antd/lib/radio/radioButton'
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
  StyledButton,
  StyledCheckbox
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
  smsConfirmationChecked: boolean
  smsUpdatesChecked: boolean
  emailNewsletterChecked: boolean
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
  showPasswordModal: boolean
  passwordModalLoading: boolean
  // redux actions
  inputChangeAction: (id: string, value: string) => void
  setSmsConfirmationChecked: (checked: boolean) => void
  setSmsUpdatesChecked: (checked: boolean) => void
  setEmailConfirmationChecked: (checked: boolean) => void
}

class ProfileSettings extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      firstName,
      lastName,
      email,
      phone,
      weight,
      heightFirst,
      heightSecond,
      chestSize,
      waistSize,
      hipsSize,
      inseamSize,
      shouldersSize,
      neckSize,
      smsConfirmationChecked,
      smsUpdatesChecked,
      emailNewsletterChecked
    } = this.props
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
                value={firstName}
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
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
            <Column inputhWidth={'31%'}>
              <RadioGroup
                value="metric"
                onChange={this.handleOnUnitMsrmntChange}
              >
                <RadioButton value="metric">
                  {formatMessage(messages.metric)}
                </RadioButton>
                <RadioButton value="imperial">
                  {formatMessage(messages.imperial)}
                </RadioButton>
              </RadioGroup>
            </Column>
            <Column inputhWidth={'31%'}>
              <RadioGroup value="man">
                <RadioButton value="man">
                  {formatMessage(messages.man)}
                </RadioButton>
                <RadioButton value="woman">
                  {formatMessage(messages.woman)}
                </RadioButton>
              </RadioGroup>
            </Column>
            <Column inputhWidth={'31%'} />
          </Row>
          <Row>
            <Column inputhWidth={'48%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.weight)}</Label>
              </InputTitleContainer>
              <StyledInput
                id="weight"
                value={weight}
                onChange={this.handleInputChange}
                maxLength="50"
              />
            </Column>
            <Column inputhWidth={'48%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.height)}</Label>
              </InputTitleContainer>
              <Row marginBottom={'0'}>
                <Column inputhWidth={'48%'}>
                  <StyledInput
                    id="heightFirst"
                    value={heightFirst}
                    onChange={this.handleInputChange}
                    maxLength="50"
                  />
                </Column>
                <Column inputhWidth={'48%'}>
                  <StyledInput
                    id="heightSecond"
                    value={heightSecond}
                    onChange={this.handleInputChange}
                    maxLength="50"
                  />
                </Column>
              </Row>
            </Column>
          </Row>
          <Row>
            <Column inputhWidth={'31%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.chest)}</Label>
              </InputTitleContainer>
              <StyledInput
                id="chestSize"
                value={chestSize}
                onChange={this.handleInputChange}
                maxLength="50"
              />
            </Column>
            <Column inputhWidth={'31%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.waist)}</Label>
              </InputTitleContainer>
              <StyledInput
                id="waistSize"
                value={waistSize}
                onChange={this.handleInputChange}
                maxLength="50"
              />
            </Column>
            <Column inputhWidth={'31%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.hips)}</Label>
              </InputTitleContainer>
              <StyledInput
                id="hipsSize"
                value={hipsSize}
                onChange={this.handleInputChange}
                maxLength="50"
              />
            </Column>
          </Row>
          <Row>
            <Column inputhWidth={'31%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.inseam)}</Label>
              </InputTitleContainer>
              <StyledInput
                id="inseamSize"
                value={inseamSize}
                onChange={this.handleInputChange}
                maxLength="50"
              />
            </Column>
            <Column inputhWidth={'31%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.shoulders)}</Label>
              </InputTitleContainer>
              <StyledInput
                id="shouldersSize"
                value={shouldersSize}
                onChange={this.handleInputChange}
                maxLength="50"
              />
            </Column>
            <Column inputhWidth={'31%'}>
              <InputTitleContainer>
                <Label>{formatMessage(messages.neck)}</Label>
              </InputTitleContainer>
              <StyledInput
                id="neckSize"
                value={neckSize}
                onChange={this.handleInputChange}
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
        {/*SMS Preferences*/}
        <SectionContainer>
          <Title>{formatMessage(messages.smsTitle)}</Title>
          <Row marginBottom={'0'}>
            <StyledCheckbox
              onChange={this.handleOnSmsConfirmationChecked}
              checked={smsConfirmationChecked}
            >
              {formatMessage(messages.smsOrderConfirmation)}
            </StyledCheckbox>
          </Row>
          <Row>
            <StyledCheckbox
              onChange={this.handleOnSmsUpdatesChecked}
              checked={smsUpdatesChecked}
            >
              {formatMessage(messages.smsProDesignUpdates)}
            </StyledCheckbox>
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
        {/*Email Preferences*/}
        <SectionContainer>
          <Title>{formatMessage(messages.emailTitle)}</Title>
          <Row>
            <StyledCheckbox
              onChange={this.handleOnEmailNewsletterChecked}
              checked={emailNewsletterChecked}
            >
              {formatMessage(messages.emailSignUpNewsLetter)}
            </StyledCheckbox>
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

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { inputChangeAction } = this.props
    const {
      currentTarget: { id, value }
    } = evt

    const regex = /^\d*(\.\d*)?$/
    const regexPhone = /^\d+$/

    const isNumber = regex.test(value)
    const isValidPhone = regexPhone.test(value)

    const checkIsDecimalNumber = id.match(
      /^(weight|heightFirst|heightSecond|chestSize|waistSize|hipsSize|inseamSize|shouldersSize|neckSize)$/
    )

    if (value && checkIsDecimalNumber && !isNumber) {
      return
    }
    if (value && id === 'phone' && !isValidPhone) {
      return
    }
    inputChangeAction(id, value)
  }

  handleOnUnitMsrmntChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
  }

  handleOnSmsConfirmationChecked = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { checked }
    } = event
    const { setSmsConfirmationChecked } = this.props
    setSmsConfirmationChecked(checked)
  }
  handleOnSmsUpdatesChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked }
    } = event
    const { setSmsUpdatesChecked } = this.props
    setSmsUpdatesChecked(checked)
  }
  handleOnEmailNewsletterChecked = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { checked }
    } = event
    const { setEmailConfirmationChecked } = this.props
    setEmailConfirmationChecked(checked)
  }
}

const mapStateToProps = (state: any) => state.get('profileSettings').toJS()

const ProfileSettingsEnhance = compose(
  connect(mapStateToProps, { ...ProfileSettingsActions })
)(ProfileSettings)

export default ProfileSettingsEnhance
