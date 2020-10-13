/**
 * ResellerSignup Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
// UNCOMMENT WHEN REMMEBER ME OPTION GETS IMPLEMENTED
// import Checkbox from 'antd/lib/checkbox'
import message from 'antd/lib/message'
import Select from 'antd/lib/select'
import get from 'lodash/get'
import AntdMessage from 'antd/lib/message'
import * as mainLayoutActions from '../../components/MainLayout/api'
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl'
import {
  Container,
  LoginLabel,
  FormContainer,
  StyledInput,
  TitleDesc,
  FormTitle,
  InputRow,
  InputDiv,
  Label,
  RequiredSymbol,
  InfoLabel,
  StyledInputPassword,
  BillingSelect,
  Notifications,
  Checkboxes,
  CheckboxStyled,
  Advertisement,
  StyledUpload,
  UploadButton,
  StyledIcon,
  FileLabel,
  SavingContainer,
  Clip,
  FileName,
  ButtonsContainer,
  CancelButton,
  SaveButton,
  TermsCheckbox,
  LoadingContainer,
  layoutStyle
} from './styledComponents'
import { createUser } from './data'
import messages from './messages'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { uploadFileAction } from './api'
import { UploadChangeParam } from 'antd/lib/upload'
import Spin from 'antd/lib/spin'
import { getFileWithExtension } from '../../utils/utilsFiles'
import { validateEmail } from '../../utils/utilsFunctions'
import Layout from '../../components/MainLayout'
import { NEW_USER } from '../../constants'
import { User, UserType } from '../../types/common'
import { CA_COUNTRY, CA_CURRENCY, US_COUNTRY, US_CURRENCY } from '../../components/ResellerAbout/constants'
import { connect } from 'react-redux'

const { Option } = Select

const countries = [
  {
    label: 'Canada',
    value: 'cad'
  },
  {
    label: 'USA',
    value: 'usd'
  }
]

interface Props {
  intl: InjectedIntl
  client: any
  initialCountryCode: string
  history: History
  signUpUser: (variables: {}) => Promise<User>
  saveUserSession: (user: UserType, client: any) => void
}

interface StateProps {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  saving: boolean,
  password: string,
  confirmPassword: string,
  website: string,
  currency: string,
  sendSms: boolean,
  sendMail: boolean,
  terms: boolean,
  loading: boolean,
  fileName: string
}

export class ResellerSignup extends React.Component<Props, StateProps> {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    saving: false,
    password: '',
    confirmPassword: '',
    website: '',
    currency: '',
    sendSms: false,
    sendMail: false,
    terms: false,
    loading: false,
    fileName: ''
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value, id }
    } = evt
    evt.persist()
    this.setState({ [id]: value } as any)
  }
  handleChangeCurrency = (value: string) => {
    if (value) {
      this.setState({ currency: value })
    }
  }
  login = (user: UserType) => {
    const { saveUserSession, client } = this.props
    saveUserSession(user, client)
  }
  handleCheckChange = ({ target: { name, checked } }: CheckboxChangeEvent) => {
    if (!!name) {
      this.setState({ [name]: checked } as any)
    }
  }
  uploadFile = (event: UploadChangeParam) => {
    const { file } = event
    this.setState({ loading: true })
    uploadFileAction(file).then((fileName) => {
      this.setState({ loading: false, fileName })
    })
  }
  requestClose = () => {
    const { history } = this.props
    history.push('/')
  }
  beforeUpload = (file: any) => {
    const { intl: { formatMessage } } = this.props
    const isLt2M = file.size / 1024 / 1024 < 20
    if (!isLt2M) {
      AntdMessage.error(formatMessage(messages.sizeError))
    }
    return isLt2M
  }
  render() {
    const {
      history,
      intl,
    } = this.props
    const {
      loading,
      firstName,
      lastName,
      phone,
      saving,
      email,
      password,
      confirmPassword,
      website,
      currency,
      // sendSms,
      sendMail,
      terms,
      fileName
    } = this.state
    const { formatMessage } = intl
    const file = fileName ? getFileWithExtension(fileName) : ''
    return (
      <Layout {...{ intl, history }} style={layoutStyle}>
        <Container>
          {saving &&
            <SavingContainer>
              <Spin />
            </SavingContainer>
          }
          <LoginLabel>
            <FormattedMessage {...messages.signupTitle} />
          </LoginLabel>
          <TitleDesc
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.titleDesc)
            }}
          />
          <FormTitle>
            <FormattedMessage {...messages.resellerInfo} />
          </FormTitle>
          <FormContainer>
            <InputRow>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.firstName} />
                  <RequiredSymbol>*</RequiredSymbol>
                </Label>
                <StyledInput
                  id="firstName"
                  placeholder={formatMessage(messages.firstName)}
                  value={firstName}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.lastName} />
                  <RequiredSymbol>*</RequiredSymbol>
                </Label>
                <StyledInput
                  id="lastName"
                  placeholder={formatMessage(messages.lastName)}
                  value={lastName}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
            </InputRow>
            <InputRow>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.email} />
                  <RequiredSymbol>*</RequiredSymbol>
                </Label>
                <StyledInput
                  id="email"
                  placeholder={formatMessage(messages.email)}
                  value={email}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.phone} />
                  <RequiredSymbol>*</RequiredSymbol>
                </Label>
                <StyledInput
                  id="phone"
                  placeholder={formatMessage(messages.phone)}
                  value={phone}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
            </InputRow>
            <InputRow>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.password} />
                  <RequiredSymbol>*</RequiredSymbol>
                  <InfoLabel><FormattedMessage {...messages.passwordRestriction} /></InfoLabel>
                </Label>
                <StyledInputPassword
                  id="password"
                  type="Password"
                  placeholder={formatMessage(messages.password)}
                  value={password}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.confirmPassword} />
                  <RequiredSymbol>*</RequiredSymbol>
                </Label>
                <StyledInputPassword
                  id="confirmPassword"
                  type="Password"
                  placeholder={formatMessage(messages.confirmPassword)}
                  value={confirmPassword}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
            </InputRow>
            <InputRow>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.website} />
                </Label>
                <StyledInput
                  id="website"
                  placeholder={formatMessage(messages.website)}
                  value={website}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.billingCountry} />
                  <RequiredSymbol>*</RequiredSymbol>
                </Label>
                <BillingSelect
                  value={currency}
                  onChange={this.handleChangeCurrency}
                >
                  {countries.map(({ label, value }, index: Number) =>
                    <Option key={index} {...{ value }}>
                      {label}
                    </Option>
                  )}
                </BillingSelect>
              </InputDiv>
            </InputRow>
            <Notifications>
              <Label>
                <FormattedMessage {...messages.notifyMe} />
              </Label>
              <Checkboxes>
                <CheckboxStyled
                  checked={sendMail}
                  name="sendMail"
                  onChange={this.handleCheckChange}
                >
                  <FormattedMessage {...messages.sendMail} />
                </CheckboxStyled>
                {/* <CheckboxStyled
                  checked={sendSms}
                  name="sendSms"
                  onChange={this.handleCheckChange}
                >
                  <FormattedMessage {...messages.sendSms} />
                </CheckboxStyled> */}
              </Checkboxes>
            </Notifications>
          </FormContainer>
          <Advertisement>
            <FormattedMessage {...messages.advertisement} />
          </Advertisement>
          <TitleDesc
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.resellerDesc)
            }}
          />
          <StyledUpload
            listType="picture-card"
            className="avatar-uploader"
            customRequest={this.uploadFile}
            disabled={loading}
            showUploadList={false}
            beforeUpload={this.beforeUpload}
          >
            <UploadButton>
              {loading ?
                <LoadingContainer>
                  <Spin size="small" />
                </LoadingContainer> :
                <>
                  <StyledIcon type="upload" />
                  <FormattedMessage {...messages.uploadCertificate} />
                </>
              }
            </UploadButton>
          </StyledUpload>
          {!!file &&
            <FileLabel>
              <Clip type="paper-clip" />
              <FileName>
                {file}
              </FileName>
            </FileLabel>
          }
          <TitleDesc
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.reviewText)
            }}
          />
          <TermsCheckbox
            checked={terms}
            name="terms"
            onChange={this.handleCheckChange}
          >
            <FormattedMessage {...messages.termsAndConditions} />
          </TermsCheckbox>
          <ButtonsContainer>
            <SaveButton disabled={!terms} onClick={this.handleSignUp}>
              <FormattedMessage {...messages.create} />
            </SaveButton>
            <CancelButton onClick={this.requestClose}>
              <FormattedMessage {...messages.cancel} />
            </CancelButton>
          </ButtonsContainer>
        </Container>
      </Layout>
    )
  }
  clearState = () => {
    this.setState({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      saving: false,
      confirmPassword: '',
      website: '',
      currency: '',
      sendSms: false,
      sendMail: false,
      terms: false,
      loading: false,
      fileName: ''
    })
  }
  handleSignUp = async (evt: React.MouseEvent<EventTarget>) => {
    const {
      firstName,
      lastName,
      email,
      fileName,
      password,
      website,
      sendSms,
      sendMail,
      phone,
      currency,
      confirmPassword
    } = this.state
    const {
      signUpUser,
      history,
      intl: { formatMessage },
      initialCountryCode = ''
    } = this.props
    if (password.length < 8) {
      message.error(formatMessage(messages.passwordLengthError))
      return
    }
    if (password !== confirmPassword) {
      message.error(formatMessage(messages.passwordLengthError))
    }
    if (!firstName || !lastName || !email || !password || !confirmPassword || !phone || !currency || !fileName) {
      message.error(formatMessage(messages.requiredFieldsError))
      return
    }
    if (
      (currency === US_CURRENCY && initialCountryCode.toUpperCase() !== US_COUNTRY) ||
      (currency === CA_CURRENCY && initialCountryCode.toUpperCase() !== CA_COUNTRY)
    ) {
      message.error(formatMessage(messages.badCurrency))
      return
    }
    if (!validateEmail(email.toLowerCase())) {
      message.error(formatMessage(messages.badFormat))
      return
    }
    this.setState({ saving: true })
    const user = {
      email: email.toLowerCase(),
      first_name: firstName,
      last_name: lastName,
      password,
      newsletter_subscribed: false,
      countryCode: initialCountryCode
    }
    const reseller = {
      website,
      currency,
      sendSms,
      sendMail,
      fileName,
      phone
    }

    try {
      const response = await signUpUser({ variables: { user, reseller } })
      const data = get(response, 'data.signUp', false)
      if (data) {
        const { user: userResponse, token } = data || {}
        const { shortId, name, lastName: lastNameResponse, email: emailResponse, administrator } = userResponse || {}
        const userData = {
          id: shortId,
          token,
          name,
          lastName: lastNameResponse,
          email: emailResponse,
          administrator
        }
        message.success(formatMessage(messages.welcomeMessage, { name }))
        window.dataLayer.push({ event: NEW_USER, label: 'Form Sign Up' })
        this.login(userData)
      }
      history.replace('/account?option=resellerAbout')
    } catch (error) {
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
    } finally {
      this.clearState()
    }
  }
}

const mapStateToProps = (state: any) => {
  const langProps = state.get('languageProvider').toJS()
  const app = state.get('app').toJS()
  return {
    ...langProps,
    ...app,
  }
}

const loginEnhance = compose(
  injectIntl,
  withApollo,
  connect(mapStateToProps, {...mainLayoutActions}), 
  createUser
)(ResellerSignup)
export default loginEnhance
