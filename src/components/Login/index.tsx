/**
 * Login Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
// UNCOMMENT WHEN REMMEBER ME OPTION GETS IMPLEMENTED
// import Checkbox from 'antd/lib/checkbox'
import message from 'antd/lib/message'
import get from 'lodash/get'
import { validate } from 'email-validator'
import { FormattedMessage } from 'react-intl'
import {
  Container,
  LoginLabel,
  FormContainer,
  StyledInput,
  RememberMeRow,
  StyledLoginButton,
  NotAMemberLabel,
  JoinNowLabel,
  ForgotPasswordLabel,
  LoginFailedView,
  LoginFailed,
  OkButton,
  InputIcon,
  LoadingContainer
} from './styledComponents'
import JakrooModal from '../Common/JakrooModal'
import FacebookGmailLogin from '../FacebookGmailLogin'
import SignUp from '../SignUp'
import { mailLogin } from './data'
import messages from './messages'
import Spin from 'antd/lib/spin'

interface Props {
  open: boolean
  initialCountryCode: string
  countryName: string
  countryCode: string
  regionName: string
  city: string
  requestClose: () => void
  loginWithEmail: (variables: {}) => void
  loginWithFacebook: (variables: {}) => void
  loginWithGoogle: (variables: {}) => void
  formatMessage: (messageDescriptor: any, values?: object) => string
  login: (user: object) => void
  handleForgotPassword?: () => void
}

interface StateProps {
  isLoginIn: boolean
  email: string
  password: string
  validEmail: boolean
  validPassword: boolean
  loginFailed: boolean
  loginFailedReason: string
  selectedCountry: string,
  selectedCountryName: string,
  selectedCountryId: string,
  selectedRegion: string,
  selectedRegionCode: string,
}

export class Login extends React.Component<Props, StateProps> {
  state = {
    loading: false,
    isLoginIn: true,
    email: '',
    password: '',
    selectedCountry: '',
    selectedCountryName: '',
    selectedCountryId: '',
    selectedRegion: '',
    selectedRegionCode: '',
    validEmail: false,
    validPassword: false,
    loginFailed: false,
    loginFailedReason: 'email' // 'email', 'google', 'facebook'
  }
  render() {
    const {
      open,
      requestClose,
      formatMessage,
      handleForgotPassword,
      login,
      initialCountryCode,
      countryName,
      countryCode,
      regionName,
      city
    } = this.props
    const {
      loading,
      isLoginIn,
      loginFailed,
      loginFailedReason,
      email,
      password,
      selectedCountry = '',
      selectedCountryName = '',
      selectedRegion = ''
    } = this.state
    const countrySelected = selectedCountryName || countryName
    const countryCodeSelected = selectedCountry || countryCode
    const regionSelected = selectedRegion || regionName
    const loginFailedMessage = loginFailedReason === 'email'
      ? messages.msgLoginFailed
      : messages.msgLoginFailedSocial
    const renderView = isLoginIn ? loginFailed
      ? (
        <LoginFailedView>
          <LoginFailed
            dangerouslySetInnerHTML={{
              __html: formatMessage(loginFailedMessage, { social: loginFailedReason })
            }}
          />
          <OkButton onClick={this.handleLoginFailedModal}>
            {formatMessage(messages.ok)}
          </OkButton>
        </LoginFailedView>
      )
      : (
        <div>
          <LoginLabel>
            <FormattedMessage {...messages.login} />
          </LoginLabel>
          <FormContainer>
            <StyledInput
              id="email"
              placeholder={formatMessage(messages.emailLabel)}
              value={email}
              prefix={<InputIcon type="mail" theme="twoTone" />}
              onChange={this.handleInputChange}
            />
            <StyledInput
              id="password"
              type={formatMessage(messages.passwordLabel)}
              placeholder="Password"
              prefix={<InputIcon type="lock" theme="twoTone" />}
              value={password}
              onChange={this.handleInputChange}
            />
            <RememberMeRow>
              {/* {UNCOMMENT WHEN REMMEBER ME OPTION GETS IMPLEMENTED} */}
              {/* <Checkbox>{formatMessage(messages.rememberMe)}</Checkbox>*/}
              <ForgotPasswordLabel onClick={handleForgotPassword}>
                {formatMessage(messages.forgotPassword)}
              </ForgotPasswordLabel>
            </RememberMeRow>
            <StyledLoginButton type="danger" onClick={this.handleMailLogin}>
              {formatMessage(messages.loginButtonLabel)}
            </StyledLoginButton>
            <FacebookGmailLogin
              handleLogin={login}
              handleJoinNow={this.handleJoinNow}
              regionName={regionSelected}
              countryName={countrySelected}
              initialCountryCode={countryCodeSelected}
              countryCode={countryCodeSelected}
              city={regionSelected === regionName ? city : ''}
              {...{
                requestClose,
                isLoginIn,
                formatMessage
              }}
            />
          </FormContainer>
          <NotAMemberLabel>
            {formatMessage(messages.notAMember)}
            <JoinNowLabel onClick={this.handleJoinNow}>
              {formatMessage(messages.joinNow)}
            </JoinNowLabel>
          </NotAMemberLabel>
        </div>
      ) : (
      <SignUp
        closeSignUp={this.showLogin}
        login={this.onSignedUp}
        setLoading={this.setLoadingAction}
        setCountryValue={this.handleCountryChange}
        setRegionChange={this.handleRegionChange}
        {...{
          requestClose,
          formatMessage,
          initialCountryCode,
          countryName,
          countryCode,
          regionName,
          city
        }}
      />
    )
    return (
      <JakrooModal
        open={open}
        width="450px"
        requestClose={this.onClosemodal}
        style={{ top: 20, zIndex: 99999 }}
      >
        <Container>
          {loading &&
            <LoadingContainer>
              <Spin size="large" />
            </LoadingContainer>
          }
          {renderView}
        </Container>
      </JakrooModal>
    )
  }
  handleJoinNow = () => {
    this.setState({ isLoginIn: false })
  }

  setLoadingAction = (loading: boolean) => {
    this.setState({ loading })
  }

  onClosemodal = () => {
    const { requestClose } = this.props
    requestClose()
    this.setState({ isLoginIn: true })
  }

  onSignedUp = (data: any) => {
    const { login } = this.props
    login(data)
    this.onClosemodal()
  }

  showLogin = () => {
    this.setState({
      isLoginIn: true
    })
  }
  validateMail = (mail: string) => {
    return validate(mail)
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value, id }
    } = evt
    evt.persist()
    this.setState({ [id]: value } as any)
  }

  handleCountryChange = (
    value: any,
    countryId: string,
    countryName: string
  ) => {
    this.setState({
      selectedCountry: value,
      selectedCountryId: countryId,
      selectedCountryName: countryName
    })
  }

  handleRegionChange = (
    value: any,
    regionCode: string
  ) => {
    this.setState({
      selectedRegion: value,
      selectedRegionCode: regionCode
    })
  }

  handleMailLogin = async (evt: React.MouseEvent<EventTarget>) => {
    const { password } = this.state
    const email = this.state.email.toLowerCase()
    const { loginWithEmail, requestClose, formatMessage, login } = this.props

    if (!email || !password) {
      message.error('Invalid User or Password!')
      return
    }

    try {
      this.setState({ loading: true })
      const loginData = await loginWithEmail({ variables: { email, password } })
      const data = get(loginData, 'data.login', false)
      if (data) {
        const token = get(data, 'token', '')
        if (!token) {
          const social = get(data, 'user.socialMethod', 'email')
          this.setState({ loginFailed: true, loginFailedReason: social })
          return
        }

        const userData = {
          id: get(data, 'user.shortId', ''),
          token,
          name: get(data, 'user.name', ''),
          lastName: get(data, 'user.lastName'),
          email: get(data, 'user.email'),
          administrator: get(data, 'user.administrator', false)
        }
        message.success(
          formatMessage(messages.welcomeMessage, {
            name: get(data, 'user.name', '')
          }),
          5
        )
        login(userData)
        requestClose()
      }
    } catch (error) {
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
    } finally {
      this.setState({ loading: false })
    }
  }

  handleLoginFailedModal = () => {
    this.setState({ loginFailed: false })
  }
}

const loginEnhance = compose(mailLogin)(Login)
export default loginEnhance
