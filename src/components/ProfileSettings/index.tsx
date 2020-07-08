/**
 * ProfileSettings Component - Created by miguelcanobbio on 31/05/18.
 */

/**
 *
 * COMMENTED CODE IS ONLY FOR HIDE OPTIONS
 * UNCOMMENT WHEN NEED THAT OPTIONS
 *
 */

import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import MessageBar from 'antd/lib/message'
import Spin from 'antd/lib/spin'
import queryString from 'query-string'
import * as ProfileApiActions from './api'
import * as ProfileSettingsActions from './actions'
import { PHONE_FIELD, PENDING } from '../../constants'
import { isNumberValue } from '../../utils/utilsAddressValidation'
import {
  regionsQuery,
  profileSettingsQuery,
  UpdateSmsOptionsMutation,
  UpdateEmailOptionsMutation,
  UpdateUserProfileOptionsMutation,
  UpdateMeasurementsMutation,
  UpdateRegionOptionsMutation,
  ChangePasswordMutation,
  sendAffiliateMutation,
  linkPaypalAccountMutation
} from './data'
import messages from './messages'
import {
  Container,
  Title,
  SectionContainer,
  // Row,
  // Column,
  // StyledButton,
  // StyledCheckbox,
  LoadingErrorContainer,
  ErrorMessage,
  // SwitchWrapper,
  // StyledSwitch,
  LoadingContainer,
  // StatusLabel,
  // AccountLabel,
} from './styledComponents'
// import AffiliateModal from '../AffiliateModal'
import ProfileForm from '../ProfileForm'
// import LanguageAndCurrencyForm from '../LanguageAndCurrencyForm'
// import MeasurementsForm from '../MeasurementsForm'
import {
  ClickParam,
  QueryProps,
  Region,
  IProfileSettings,
  UploadFile,
  Affiliate,
  Message,
} from '../../types/common'
import ChangePasswordModal from '../ChangePasswordModal'
import get from 'lodash/get'
import config from '../../config'

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
  formatMessage: (messageDescriptor: Message, values?: {}) => string
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
  history: History
  newPasswordConfirm: string
  showPasswordModal: boolean
  passwordModalLoading: boolean
  dataFromApollo: boolean
  modalPasswordHasError: boolean
  paypalCurrency: string
  paypalCheck: boolean
  loading: boolean
  openModal: boolean
  file: string
  // api actions
  uploadFileAction: (file: UploadFile) => void
  // redux actions
  successRequestAction: () => void
  setUploadingAction: (value: boolean) => void
  linkAccount: (value: boolean) => void
  openAffiliate: (value: boolean) => void
  setPaypalCheck: (value: boolean) => void
  setPaypalCurrency: (value: string) => void
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
  linkPaypalAccount: (variables: {}) => Promise<Affiliate>
  sendAffiliateRequest: (variables: {}) => Promise<Affiliate>
  updateUserProfile: (variables: {}) => void
  updateEmailOptions: (variables: {}) => void
  updateSmsOptions: (variables: {}) => void
  updateMeasurements: (variables: {}) => void
  updateRegionOptions: (variables: {}) => void
  changePassword: (variables: {}) => void
  resetPasswordFormAction: () => void
}

class ProfileSettings extends React.Component<Props, {}> {
  componentDidUpdate() {
    const { profileData, history } = this.props
    const { location: { search } } = history
    const { code } = queryString.parse(search)
    const { paypalAccount, status } = get(profileData, 'profileData.affiliate', {})
    if (code && !paypalAccount && !!status) {
      this.sendCode(code)
      history.replace('/account?option=profileSettings')
    }
  }
  render() {
    const {
      formatMessage,
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
          <Title>{formatMessage(messages.errorTitle)}</Title>
          <ErrorMessage>{formatMessage(messages.errorMessage)}</ErrorMessage>
        </LoadingErrorContainer>
      )
    }
    const {
      isMobile,
      profileData,
      firstName,
      lastName,
      loading: loadingFile,
      email,
      phone,
      loadingProfile,
      currentPassword,
      newPassword,
      newPasswordConfirm,
      showPasswordModal,
      passwordModalLoading,
      modalPasswordHasError
    } = this.props

    const userProfile = get(profileData, 'profileData.userProfile', {})
    // const affiliate = get(profileData, 'profileData.affiliate', {})
    // const regionsOptions: Region[] = regions || []

    // const smsButtonDisabled =
    //   (smsUpdatesChecked === null ||
    //     smsSettings.desingUpdates === smsUpdatesChecked) &&
    //   (smsConfirmationChecked === null ||
    //     smsSettings.orderConfirmation === smsConfirmationChecked)
    // const emailButtonDisabled =
    //   emailNewsletterChecked === null ||
    //   emailSettings.newsletter === emailNewsletterChecked
    // const { status, paypalAccount } = affiliate
    return (
      <Container>
        {/* PROFILE */}
        {loadingFile &&
          <LoadingContainer>
            <Spin />
          </LoadingContainer>
        }
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
        {/* <SwitchWrapper>
          {formatMessage(messages.makeAffiliate)}
          <StyledSwitch disabled={!!status} checked={openModal || !!status} onChange={openAffiliate} />
        </SwitchWrapper>
        {status === PENDING &&
          <StatusLabel>
            {formatMessage(messages.pending)}
          </StatusLabel>
        }
        {!!paypalAccount &&
          <AccountLabel>
            {formatMessage(messages.linkedTo, { paypalAccount })}
          </AccountLabel>
        }
        <AffiliateModal
          {...{
            history,
            paypalCheck,
            setPaypalCheck,
            formatMessage,
            file,
            openAffiliate,
            uploadFileAction,
            paypalCurrency,
            setPaypalCurrency
          }}
          linkPaypal={this.linkPaypal}
          sendRequest={this.sendRequest}
          open={openModal}
        /> */}
        {/* REGION */}
        {/*<Title>{formatMessage(messages.languageTitle)}</Title>
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
        */}
        {/* MEASUREMENTS
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
        </SectionContainer> */}
        {/*SMS Preferences*/}
        {/* <SectionContainer>
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
        </SectionContainer> */}
        {/*Email Preferences*/}
        {/*
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
         */}
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
          resetPasswordForm={this.resetPasswordForm}
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
        MessageBar.success(formatMessage(messages.passwordSuccessMessage))
      } catch (error) {
        setModalLoadingAction(false)
        const errorMessage = error.graphQLErrors.map((x: any) => x.message)
        MessageBar.error(errorMessage, 5)
      }
    }
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { inputChangeAction } = this.props
    const {
      currentTarget: { id, value }
    } = evt

    const regex = /^\d*(\.\d*)?$/
    const isValidNumber = regex.test(value)

    const checkIsDecimalNumber = id.match(
      /^(weight|heightFirst|heightSecond|chestSize|waistSize|hipsSize|inseamSize|shouldersSize|neckSize)$/
    )

    if (value && checkIsDecimalNumber && !isValidNumber) {
      return
    }
    if (value && id === PHONE_FIELD && !isNumberValue(value)) {
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

  handleOnSaveProfileSettings = () => {
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
    this.updateSetting(
      'loadingProfile',
      payload,
      updateUserProfile,
      messages.profileSuccessMessage
    )
  }

  handleOnSaveLanguageSettings = () => {
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
    this.updateSetting(
      'loadingRegion',
      payload,
      updateRegionOptions,
      messages.languageSuccessMessage
    )
  }

  handleOnSaveMeasurementsSettings = () => {
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
    this.updateSetting(
      'loadingMeasurements',
      payload,
      updateMeasurements,
      messages.measurementsSuccessMessage
    )
  }

  handleOnSaveSmsSettings = () => {
    const {
      updateSmsOptions,
      smsConfirmationChecked,
      smsUpdatesChecked,
      profileData: {
        profileData: { smsSettings }
      }
    } = this.props

    const payload = {
      smsOptions: {
        orderConfirmation:
          smsConfirmationChecked !== null
            ? smsConfirmationChecked
            : smsSettings.orderConfirmation,
        desingUpdates:
          smsUpdatesChecked !== null
            ? smsUpdatesChecked
            : smsSettings.desingUpdates
      }
    }
    this.updateSetting(
      'loadingSms',
      payload,
      updateSmsOptions,
      messages.smsSuccessMessage
    )
  }

  handleOnSaveEmailSettings = () => {
    const { updateEmailOptions, emailNewsletterChecked } = this.props

    const payload = { subscribed: emailNewsletterChecked }
    this.updateSetting(
      'loadingEmail',
      payload,
      updateEmailOptions,
      messages.emailSuccessMessage
    )
  }

  linkPaypal = () => {
    // Use the next line on development env (Paypal doesn't accept localhost as a valid URL)
    // const redirect = encodeURIComponent(`https://designlab.jakroo.com/account?option=profileSettings`)

    const redirect = encodeURIComponent(`${config.baseUrl}account?option=profileSettings`)
    const client = `flowEntry=static&client_id=${config.paypalClientId}`
    const params = `&scope=openid email https://uri.paypal.com/services/paypalattributes&redirect_uri=${redirect}`
    window.location.href = `${config.paypalBaseUrl}${client}${params}`
  }

  sendCode = async (code: string) => {
    const {
      setUploadingAction,
      formatMessage,
      linkPaypalAccount
    } = this.props
    try {
      setUploadingAction(true)
      await linkPaypalAccount({
        variables: {
          code
        },
        update: (store: any, responseData: Affiliate) => {
          const newAccount = get(responseData, 'data.linkPaypalAccount.paypalAccount')
          const profileData = store.readQuery({
            query: profileSettingsQuery
          })
          const affiliateData = get(profileData, 'profileData.affiliate', {})
          affiliateData.paypalAccount = newAccount
          store.writeQuery({
            query: profileSettingsQuery,
            data: profileData
          })
        }
      })
      setUploadingAction(false)
      MessageBar.success(formatMessage(messages.successLink), 4)
    } catch (error) {
      setUploadingAction(false)
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      MessageBar.error(errorMessage, 5)
    }
  }

  sendRequest = async () => {
    const {
      setUploadingAction,
      successRequestAction,
      paypalCurrency: currency,
      file,
      formatMessage,
      sendAffiliateRequest
    } = this.props
    try {
      setUploadingAction(true)
      await sendAffiliateRequest({
        variables: {
          currency,
          file
        },
        update: (store: any) => {
          const profileData = store.readQuery({
            query: profileSettingsQuery
          })
          const affiliateData = get(profileData, 'profileData.affiliate', {})
          affiliateData.status = PENDING
          store.writeQuery({
            query: profileSettingsQuery,
            data: profileData
          })
        }
      })
      successRequestAction()
      MessageBar.success(formatMessage(messages.success), 4)
    } catch (error) {
      setUploadingAction(false)
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      MessageBar.error(errorMessage, 5)
    }
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
      MessageBar.success(formatMessage(successMessage), 4)
    } catch (error) {
      setSettingsLoadingAction(setting, false)
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      MessageBar.error(errorMessage, 5)
    }
  }

  resetPasswordForm = () => {
    const { resetPasswordFormAction } = this.props
    resetPasswordFormAction()
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
  linkPaypalAccountMutation,
  sendAffiliateMutation,
  UpdateEmailOptionsMutation,
  UpdateSmsOptionsMutation,
  UpdateUserProfileOptionsMutation,
  UpdateMeasurementsMutation,
  UpdateRegionOptionsMutation,
  ChangePasswordMutation,
  connect(
    mapStateToProps,
    {
      ...ProfileSettingsActions,
      ...ProfileApiActions
    }
  )
)(ProfileSettings)

export default ProfileSettingsEnhance
