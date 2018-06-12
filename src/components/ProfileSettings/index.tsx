/**
 * ProfileSettings Component - Created by miguelcanobbio on 31/05/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import * as ProfileSettingsActions from './actions'
import withError from '../WithError'
import withLoading from '../WithLoading'
import {
  profileSettingsQuery,
  UpdateSmsOptionsMutation,
  UpdateEmailOptionsMutation
} from './data'
import messages from './messages'
import {
  Container,
  Title,
  SectionContainer,
  Row,
  Column,
  StyledButton,
  StyledCheckbox
} from './styledComponents'
import ProfileForm from '../ProfileForm'
import LanguageAndCurrencyForm from '../LanguageAndCurrencyForm'
import MeasurementsForm from '../MeasurementsForm'
import {
  ClickParam,
  QueryProps,
  Region,
  ProfileSettingsReducer,
  IProfileSettings
} from '../../types/common'
import ChangePasswordModal from '../ChangePasswordModal'

interface Data extends QueryProps {
  regionsOptions: Region[]
  profileData: IProfileSettings
}

interface Props {
  data: Data
  formatMessage: (messageDescriptor: any) => string
  firstName: string
  lastName: string
  email: string
  phone: string
  region: string
  language: string
  currency: string
  msrmntSystemSelected: string
  msrmntGenderSelected: string
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
  dataFromApollo: boolean
  // redux actions
  inputChangeAction: (id: string, value: string) => void
  setSmsConfirmationChecked: (checked: boolean) => void
  setSmsUpdatesChecked: (checked: boolean) => void
  setEmailConfirmationChecked: (checked: boolean) => void
  setMsrmntSystemAction: (system: string) => void
  setMsrmntGenderAction: (gender: string) => void
  selectDropdownAction: (id: string, value: string) => void
  showPasswordModalAction: (show: boolean) => void
  setPasswordModalValid: (hasError: boolean) => void
  setModalLoadingAction: (loading: boolean) => void
  setDataFromApolloAction: (profileSettings: ProfileSettingsReducer) => void
  // mutations
  updateEmailOptions: (variables: {}) => void
}

class ProfileSettings extends React.Component<Props, {}> {
  render() {
    const {
      data: {
        profileData: { smsSettings, emailSettings }
      },
      formatMessage,
      firstName,
      lastName,
      email,
      phone,
      region,
      language,
      currency,
      msrmntSystemSelected,
      msrmntGenderSelected,
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
      emailNewsletterChecked,
      currentPassword,
      newPassword,
      newPasswordConfirm,
      showPasswordModal,
      passwordModalLoading,
      dataFromApollo
    } = this.props

    if (!dataFromApollo) {
      this.setDataFromApollo()
    }

    const regionsOptions: Region[] = []

    const profileButtonDisabled = !firstName || !lastName || !email || !phone
    const languageButtonDisabled = !region || !language || !currency
    const measurementsButtonDisabled =
      !weight ||
      !heightFirst ||
      !heightSecond ||
      !chestSize ||
      !waistSize ||
      !hipsSize ||
      !inseamSize ||
      !shouldersSize ||
      !neckSize
    const smsButtonDisabled =
      smsSettings.desingUpdates === smsUpdatesChecked ||
      smsSettings.orderConfirmation === smsConfirmationChecked
    const emailButtonDisabled =
      emailSettings.newsletter === emailNewsletterChecked
    return (
      <Container>
        {/* PROFILE */}
        <Title>{formatMessage(messages.profileTitle)}</Title>
        <SectionContainer>
          <ProfileForm
            handleInputChange={this.handleInputChange}
            {...{ formatMessage, firstName, lastName, email, phone }}
          />
          <Row>
            <Column inputhWidth={'27%'}>
              <StyledButton
                type="primary"
                disabled={profileButtonDisabled}
                onClick={this.handleOnSaveProfileSettings}
              >
                {formatMessage(messages.save)}
              </StyledButton>
            </Column>
            <Column inputhWidth={'40%'}>
              <StyledButton
                type="primary"
                onClick={this.handleOnToggleModalPassword}
              >
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
            <LanguageAndCurrencyForm
              selectedDropDown={this.selectedDropDown}
              {...{ regionsOptions, region, language, currency, formatMessage }}
            />
          </Row>
          <Row>
            <Column inputhWidth={'27%'}>
              <StyledButton
                type="primary"
                disabled={languageButtonDisabled}
                onClick={this.handleOnSaveLanguageSettings}
              >
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
            <MeasurementsForm
              handleInputChange={this.handleInputChange}
              handleOnMsrmntGenderChange={this.handleOnMsrmntGenderChange}
              handleOnMsrmntSystemChange={this.handleOnMsrmntSystemChange}
              {...{
                formatMessage,
                msrmntSystemSelected,
                msrmntGenderSelected,
                weight,
                heightFirst,
                heightSecond,
                chestSize,
                waistSize,
                hipsSize,
                inseamSize,
                shouldersSize,
                neckSize
              }}
            />
          </Row>
          <Row>
            <Column inputhWidth={'27%'}>
              <StyledButton
                type="primary"
                disabled={measurementsButtonDisabled}
                onClick={this.handleOnSaveMeasurementsSettings}
              >
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
              <StyledButton
                type="primary"
                disabled={smsButtonDisabled}
                onClick={this.handleOnSaveSmsSettings}
              >
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
              <StyledButton
                type="primary"
                disabled={emailButtonDisabled}
                onClick={this.handleOnSaveEmailSettings}
              >
                {formatMessage(messages.save)}
              </StyledButton>
            </Column>
            <Column inputhWidth={'51%'} />
          </Row>
        </SectionContainer>
        <ChangePasswordModal
          {...{
            formatMessage,
            currentPassword,
            newPassword,
            newPasswordConfirm,
            showPasswordModal,
            passwordModalLoading
          }}
          toggleModalPassword={this.handleOnToggleModalPassword}
          handleInputChange={this.handleInputChange}
        />
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

  selectedDropDown = (param: ClickParam) => {
    const { selectDropdownAction } = this.props
    const {
      key,
      item: {
        props: { id }
      }
    } = param
    selectDropdownAction(id, key)
  }

  handleOnMsrmntSystemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: system }
    } = event
    const { setMsrmntSystemAction } = this.props
    setMsrmntSystemAction(system)
  }

  handleOnMsrmntGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: gender }
    } = event
    const { setMsrmntGenderAction } = this.props
    setMsrmntGenderAction(gender)
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

  handleOnToggleModalPassword = () => {
    const { showPasswordModal, showPasswordModalAction } = this.props
    showPasswordModalAction(!showPasswordModal)
  }

  handleOnSaveProfileSettings = () => {}

  handleOnSaveLanguageSettings = () => {}

  handleOnSaveMeasurementsSettings = () => {}

  handleOnSaveSmsSettings = () => {}

  handleOnSaveEmailSettings = async () => {
    const { updateEmailOptions, emailNewsletterChecked } = this.props
    updateEmailOptions(emailNewsletterChecked)
    await updateEmailOptions({
      variables: { subscribed: emailNewsletterChecked }
    })
  }

  setDataFromApollo = () => {
    const {
      setDataFromApolloAction,
      data: {
        profileData: {
          userProfile,
          languageSettings,
          measurementSettings,
          smsSettings,
          emailSettings
        }
      }
    } = this.props
    const profileData: ProfileSettingsReducer = {
      firstName: (userProfile && userProfile.firstName) || '',
      lastName: (userProfile && userProfile.lastName) || '',
      email: (userProfile && userProfile.email) || '',
      phone: (userProfile && userProfile.phone) || '',
      region: languageSettings.region.id || '',
      language: languageSettings.language.id || '',
      currency: languageSettings.currency.id || '',
      msrmntSystemSelected:
        measurementSettings.msrmntSystemSelected || 'metric',
      msrmntGenderSelected: measurementSettings.msrmntGenderSelected || 'man',
      weight: measurementSettings.weight || '',
      heightFirst: measurementSettings.heightFirst || '',
      heightSecond: measurementSettings.heightSecond || '',
      chestSize: measurementSettings.chest || '',
      waistSize: measurementSettings.waist || '',
      hipsSize: measurementSettings.hips || '',
      inseamSize: measurementSettings.inseam || '',
      shouldersSize: measurementSettings.shoulders || '',
      neckSize: measurementSettings.neck || '',
      smsConfirmationChecked: smsSettings.orderConfirmation,
      smsUpdatesChecked: smsSettings.desingUpdates,
      emailNewsletterChecked: emailSettings.newsletter
    }
    console.log(profileData, 'userProfile')
    setDataFromApolloAction(profileData)
  }
}

const mapStateToProps = (state: any) => state.get('profileSettings').toJS()

const ProfileSettingsEnhance = compose(
  graphql(profileSettingsQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  withLoading,
  withError,
  UpdateEmailOptionsMutation,
  UpdateSmsOptionsMutation,
  connect(
    mapStateToProps,
    { ...ProfileSettingsActions }
  )
)(ProfileSettings)

export default ProfileSettingsEnhance
