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
  OkButton
} from './styledComponents'
import JakrooModal from '../Common/JakrooModal'
import FacebookGmailLogin from '../FacebookGmailLogin'
import SignUp from '../SignUp'
import { mailLogin } from './data'
import messages from './messages'

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
}

export class Login extends React.Component<Props, StateProps> {
  state = {
    isLoginIn: false,
    email: '',
    password: '',
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
    const { isLoginIn, loginFailed, loginFailedReason, email, password } = this.state
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
              onChange={this.handleInputChange}
            />
            <StyledInput
              id="password"
              type={formatMessage(messages.passwordLabel)}
              placeholder="Password"
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
        requestClose={this.onClosemodal}
        style={{ top: 20 }}
      >
        <Container>{renderView}</Container>
      </JakrooModal>
    )
  }
  handleJoinNow = () => {
    this.setState({ isLoginIn: false })
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

  handleMailLogin = async (evt: React.MouseEvent<EventTarget>) => {
    const { password } = this.state
    const email = this.state.email.toLowerCase()
    const { loginWithEmail, requestClose, formatMessage, login } = this.props

    if (!email || !password) {
      message.error('Invalid User or Password!')
      return
    }

    try {
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
    }
  }

  handleLoginFailedModal = () => {
    this.setState({ loginFailed: false })
  }
}

const loginEnhance = compose(mailLogin)(Login)
export default loginEnhance
