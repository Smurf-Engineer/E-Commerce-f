/**
 * ProfileSettings Component - Created by miguelcanobbio on 31/05/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import Message from 'antd/lib/message'
import Spin from 'antd/lib/spin'
import * as ProfileSettingsActions from './actions'
import {
  regionsQuery,
  profileSettingsQuery,
  UpdateSmsOptionsMutation,
  UpdateEmailOptionsMutation,
  UpdateUserProfileOptionsMutation,
  UpdateMeasurementsMutation,
  UpdateRegionOptionsMutation,
  ChangePasswordMutation
} from './data'
import messages from './messages'
import {
  Container,
  Title,
  SectionContainer,
  Row,
  Column,
  StyledButton,
  StyledCheckbox,
  LoadingErrorContainer,
  ErrorMessage
} from './styledComponents'
import ProfileForm from '../ProfileForm'
import LanguageAndCurrencyForm from '../LanguageAndCurrencyForm'
import MeasurementsForm from '../MeasurementsForm'
import {
  ClickParam,
  QueryProps,
  Region,
  IProfileSettings
} from '../../types/common'
import ChangePasswordModal from '../ChangePasswordModal'

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
}

interface RegionOptions extends QueryProps {
  regions: Region[]
}

interface Props {
  isMobile: boolean
  regionsOptions: RegionOptions
  profileData: ProfileData
  formatMessage: (messageDescriptor: any) => string
  firstName: string
  lastName: string
  email: string
  phone: string
  loadingProfile: boolean
  region: string
  language: string
  currency: string
  loadingRegion: boolean
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
  loadingMeasurements: boolean
  smsConfirmationChecked: boolean
  smsUpdatesChecked: boolean
  loadingSms: boolean
  emailNewsletterChecked: boolean
  loadingEmail: boolean
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
  showPasswordModal: boolean
  passwordModalLoading: boolean
  dataFromApollo: boolean
  modalPasswordHasError: boolean
  // redux actions
  inputChangeAction: (id: string, value: string) => void
  setSmsConfirmationChecked: (checked: boolean) => void
  setSmsUpdatesChecked: (checked: boolean) => void
  setEmailConfirmationChecked: (checked: boolean) => void
  setMsrmntSystemAction: (system: string) => void
  setMsrmntGenderAction: (gender: string) => void
  selectDropdownAction: (id: string, value: string) => void
  showPasswordModalAction: (show: boolean) => void
  setPasswordModalHasError: (hasError: boolean) => void
  setModalLoadingAction: (loading: boolean) => void
  setSettingsLoadingAction: (key: string, loading: boolean) => void
  changePasswordSuccessAction: () => void
  // mutations
  updateUserProfile: (variables: {}) => void
  updateEmailOptions: (variables: {}) => void
  updateSmsOptions: (variables: {}) => void
  updateMeasurements: (variables: {}) => void
  updateRegionOptions: (variables: {}) => void
  changePassword: (variables: {}) => void
}

class ProfileSettings extends React.Component<Props, {}> {
  render() {
    const {
      profileData: { loading, error }
    } = this.props
    if (loading) {
      return (
        <LoadingErrorContainer>
          <Spin />
        </LoadingErrorContainer>
      )
    }
    if (error) {
      return (
        <LoadingErrorContainer>
          <Title>Oops!</Title>
          <ErrorMessage>Something went wrong</ErrorMessage>
        </LoadingErrorContainer>
      )
    }
    const {
      isMobile,
      profileData: {
        profileData: {
          userProfile,
          languageSettings,
          measurementSettings,
          smsSettings,
          emailSettings
        }
      },
      regionsOptions: { regions },
      formatMessage,
      firstName,
      lastName,
      email,
      phone,
      loadingProfile,
      region,
      language,
      currency,
      loadingRegion,
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
      loadingMeasurements,
      smsConfirmationChecked,
      smsUpdatesChecked,
      loadingSms,
      emailNewsletterChecked,
      loadingEmail,
      currentPassword,
      newPassword,
      newPasswordConfirm,
      showPasswordModal,
      passwordModalLoading,
      modalPasswordHasError
    } = this.props

    const regionsOptions: Region[] = regions || []

    const smsButtonDisabled =
      (smsUpdatesChecked === null ||
        smsSettings.desingUpdates === smsUpdatesChecked) &&
      (smsConfirmationChecked === null ||
        smsSettings.orderConfirmation === smsConfirmationChecked)
    const emailButtonDisabled =
      emailNewsletterChecked === null ||
      emailSettings.newsletter === emailNewsletterChecked
    return (
      <Container>
        {/* PROFILE */}
        <Title>{formatMessage(messages.profileTitle)}</Title>
        <SectionContainer>
          <ProfileForm
            handleInputChange={this.handleInputChange}
            loading={loadingProfile}
            onSaveProfileSettings={this.handleOnSaveProfileSettings}
            onToggleModalPassword={this.handleOnToggleModalPassword}
            {...{
              formatMessage,
              firstName,
              lastName,
              email,
              phone,
              userProfile,
              isMobile
            }}
          />
        </SectionContainer>
        {/* REGION */}
        <Title>{formatMessage(messages.languageTitle)}</Title>
        <SectionContainer>
          <Row marginBottom={'0'}>
            <LanguageAndCurrencyForm
              selectedDropDown={this.selectedDropDown}
              regionsAndLanguageOptions={regionsOptions}
              onSaveLanguageSettings={this.handleOnSaveLanguageSettings}
              loading={loadingRegion}
              {...{
                languageSettings,
                region,
                language,
                currency,
                formatMessage,
                isMobile
              }}
            />
          </Row>
        </SectionContainer>
        {/* MEASUREMENTS */}
        <Title>{formatMessage(messages.measurementsTitle)}</Title>
        <SectionContainer>
          <MeasurementsForm
            loading={loadingMeasurements}
            onSaveMeasurementsSettings={this.handleOnSaveMeasurementsSettings}
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
              neckSize,
              measurementSettings,
              isMobile
            }}
          />
        </SectionContainer>
        {/*SMS Preferences*/}
        <SectionContainer>
          <Title>{formatMessage(messages.smsTitle)}</Title>
          <Row marginBottom={'0'}>
            <StyledCheckbox
              onChange={this.handleOnSmsConfirmationChecked}
              checked={
                smsConfirmationChecked !== null
                  ? smsConfirmationChecked
                  : smsSettings.orderConfirmation
              }
            >
              {formatMessage(messages.smsOrderConfirmation)}
            </StyledCheckbox>
          </Row>
          <Row>
            <StyledCheckbox
              onChange={this.handleOnSmsUpdatesChecked}
              checked={
                smsUpdatesChecked !== null
                  ? smsUpdatesChecked
                  : smsSettings.desingUpdates
              }
            >
              {formatMessage(messages.smsProDesignUpdates)}
            </StyledCheckbox>
          </Row>
          <Row>
            <Column inputhWidth={!isMobile ? '27%' : '48%'}>
              <StyledButton
                loading={loadingSms}
                type="primary"
                disabled={smsButtonDisabled}
                onClick={this.handleOnSaveSmsSettings}
              >
                {formatMessage(messages.save)}
              </StyledButton>
            </Column>
          </Row>
        </SectionContainer>
        {/*Email Preferences*/}
        <SectionContainer>
          <Title>{formatMessage(messages.emailTitle)}</Title>
          <Row>
            <StyledCheckbox
              onChange={this.handleOnEmailNewsletterChecked}
              checked={
                emailNewsletterChecked !== null
                  ? emailNewsletterChecked
                  : emailSettings.newsletter
              }
            >
              {formatMessage(messages.emailSignUpNewsLetter)}
            </StyledCheckbox>
          </Row>
          <Row>
            <Column inputhWidth={!isMobile ? '27%' : '48%'}>
              <StyledButton
                loading={loadingEmail}
                type="primary"
                disabled={emailButtonDisabled}
                onClick={this.handleOnSaveEmailSettings}
              >
                {formatMessage(messages.save)}
              </StyledButton>
            </Column>
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
          hasError={modalPasswordHasError}
          onChangePassword={this.handleOnChangePassword}
          toggleModalPassword={this.handleOnToggleModalPassword}
          handleInputChange={this.handleInputChange}
        />
      </Container>
    )
  }

  handleOnChangePassword = async () => {
    const {
      currentPassword,
      newPassword,
      newPasswordConfirm,
      setPasswordModalHasError,
      setModalLoadingAction,
      changePasswordSuccessAction,
      changePassword,
      formatMessage
    } = this.props
    if (
      !currentPassword ||
      !newPassword ||
      newPasswordConfirm !== newPassword
    ) {
      setPasswordModalHasError(true)
      return
    } else {
      setModalLoadingAction(true)
      try {
        await changePassword({
          variables: { currentPassword, password: newPassword }
        })
        changePasswordSuccessAction()
        Message.success(formatMessage(messages.passwordSuccessMessage))
      } catch (error) {
        setModalLoadingAction(false)
        const errorMessage = error.graphQLErrors.map((x: any) => x.message)
        Message.error(errorMessage, 5)
      }
    }
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

  handleOnSaveProfileSettings = async () => {
    const {
      updateUserProfile,
      firstName,
      lastName,
      email,
      phone,
      profileData: {
        profileData: { userProfile }
      }
    } = this.props

    const payload = {
      userData: {
        firstName: firstName || userProfile.firstName,
        lastName: lastName || userProfile.lastName,
        email: email || userProfile.email,
        phone: phone || userProfile.phone
      }
    }
    await this.updateSetting(
      'loadingProfile',
      payload,
      updateUserProfile,
      messages.profileSuccessMessage
    )
  }

  handleOnSaveLanguageSettings = async () => {
    const {
      region,
      language,
      currency,
      updateRegionOptions,
      profileData: {
        profileData: { languageSettings }
      }
    } = this.props
    const payload = {
      userRegion: {
        regionId: region || languageSettings.region.id,
        languageId: language || languageSettings.language.id,
        currencyId: currency || languageSettings.currency.id
      }
    }
    await this.updateSetting(
      'loadingRegion',
      payload,
      updateRegionOptions,
      messages.languageSuccessMessage
    )
  }

  handleOnSaveMeasurementsSettings = async () => {
    const {
      updateMeasurements,
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
      profileData: {
        profileData: { measurementSettings }
      }
    } = this.props
    const payload = {
      userMeasurements: {
        weight: weight || measurementSettings.weight,
        height: heightFirst || measurementSettings.heightFirst,
        heightSecond: heightSecond || measurementSettings.heightSecond,
        chest: chestSize || measurementSettings.chest,
        waist: waistSize || measurementSettings.waist,
        hips: hipsSize || measurementSettings.hips,
        inseam: inseamSize || measurementSettings.inseam,
        shoulders: shouldersSize || measurementSettings.shoulders,
        neck: neckSize || measurementSettings.neck,
        system:
          msrmntSystemSelected || measurementSettings.msrmntSystemSelected,
        gender: msrmntGenderSelected || measurementSettings.msrmntGenderSelected
      }
    }
    await this.updateSetting(
      'loadingMeasurements',
      payload,
      updateMeasurements,
      messages.measurementsSuccessMessage
    )
  }

  handleOnSaveSmsSettings = async () => {
    const {
      updateSmsOptions,
      smsConfirmationChecked,
      smsUpdatesChecked
    } = this.props

    const payload = {
      smsOptions: {
        orderConfirmation: smsConfirmationChecked,
        desingUpdates: smsUpdatesChecked
      }
    }
    await this.updateSetting(
      'loadingSms',
      payload,
      updateSmsOptions,
      messages.smsSuccessMessage
    )
  }

  handleOnSaveEmailSettings = async () => {
    const { updateEmailOptions, emailNewsletterChecked } = this.props

    const payload = { subscribed: emailNewsletterChecked }
    await this.updateSetting(
      'loadingEmail',
      payload,
      updateEmailOptions,
      messages.emailSuccessMessage
    )
  }

  updateSetting = async (
    setting: string,
    payload: {},
    mutation: any,
    successMessage: any
  ) => {
    const { setSettingsLoadingAction, formatMessage } = this.props
    try {
      setSettingsLoadingAction(setting, true)
      await mutation({
        variables: payload,
        refetchQueries: [
          {
            query: profileSettingsQuery,
            options: {
              fetchPolicy: 'network-only'
            }
          }
        ]
      })
      setSettingsLoadingAction(setting, false)
      Message.success(formatMessage(successMessage), 4)
    } catch (error) {
      setSettingsLoadingAction(setting, false)
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    }
  }
}

const mapStateToProps = (state: any) => state.get('profileSettings').toJS()

const ProfileSettingsEnhance = compose(
  graphql(profileSettingsQuery, {
    options: {
      fetchPolicy: 'network-only'
    },
    name: 'profileData'
  }),
  graphql(regionsQuery, {
    options: {
      fetchPolicy: 'network-only'
    },
    name: 'regionsOptions'
  }),
  UpdateEmailOptionsMutation,
  UpdateSmsOptionsMutation,
  UpdateUserProfileOptionsMutation,
  UpdateMeasurementsMutation,
  UpdateRegionOptionsMutation,
  ChangePasswordMutation,
  connect(
    mapStateToProps,
    { ...ProfileSettingsActions }
  )
)(ProfileSettings)

export default ProfileSettingsEnhance
