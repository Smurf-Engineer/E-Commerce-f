/**
 * Login - Created by eduardoquintero on 29/03/19.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import message from 'antd/lib/message'
import { validate } from 'email-validator'
import { FormattedMessage } from 'react-intl'
import {
  Container,
  LoginLabel,
  FormContainer,
  StyledInput,
  RememberMeRow,
  StyledLoginButton,
  ForgotPasswordLabel,
  LoginContainer,
  JakrooLogo
} from './styledComponents'
import FacebookGmailLogin from '../../../components/FacebookGmailLogin'
import jakrooLogo from '../../../assets/Jackroologo.svg'
import { mailLogin } from './data'
import messages from './messages'

interface Props {
  login: (user: object) => void
  loginWithEmail: (email: string, password: string) => void
  formatMessage: (messageDescriptor: any, values?: object | undefined) => string
  handleForgotPassword?: () => void
}

interface StateProps {
  email: string
  password: string
  validEmail: boolean
  validPassword: boolean
}

export class Login extends React.Component<Props, StateProps> {
  state = {
    isLoginIn: false,
    email: '',
    password: '',
    validEmail: false,
    validPassword: false
  }
  render() {
    const { formatMessage, handleForgotPassword, login } = this.props
    const { email, password } = this.state
    const renderView = (
      <LoginContainer>
        <JakrooLogo src={jakrooLogo} />
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
            <ForgotPasswordLabel onClick={handleForgotPassword}>
              {formatMessage(messages.forgotPassword)}
            </ForgotPasswordLabel>
          </RememberMeRow>
          <StyledLoginButton type="danger" onClick={this.handleMailLogin}>
            {formatMessage(messages.loginButtonLabel)}
          </StyledLoginButton>
          <FacebookGmailLogin
            handleLogin={login}
            adminLogin={true}
            {...{
              formatMessage,
              initialCountryCode: 'mx'
            }}
          />
        </FormContainer>
      </LoginContainer>
    )
    return <Container>{renderView}</Container>
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
    const { loginWithEmail } = this.props

    if (!email || !password) {
      message.error('Invalid User or Password!')
      return
    }

    loginWithEmail(email, password)
  }
}

const loginEnhance = compose(mailLogin)(Login)
export default loginEnhance
