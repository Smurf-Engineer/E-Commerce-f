/**
 * Login Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Checkbox from 'antd/lib/checkbox'
import message from 'antd/lib/message'
import get from 'lodash/get'
import { validate } from 'email-validator'
import { FormattedMessage, InjectedIntl } from 'react-intl'
import {
  Container,
  LoginLabel,
  FormContainer,
  StyledInput,
  RememberMeRow,
  StyledLoginButton,
  NotAMemberLabel,
  JoinNowLabel,
  ForgotPasswordLabel
} from './styledComponents'
import JakrooModal from '../Common/JakrooModal'
import FacebookGmailLogin from '../FacebookGmailLogin'
import SignUp from '../SignUp'
import { mailLogin } from './data'
import messages from './messages'

interface Props {
  open: boolean
  requestClose: () => void
  loginWithEmail: (variables: {}) => void
  loginWithFacebook: (variables: {}) => void
  loginWithGoogle: (variables: {}) => void
}

interface StateProps {
  isLoginIn: boolean
  email: string
  password: string
  validEmail: boolean
  validPassword: boolean
}

class Login extends React.Component<Props, StateProps> {
  state = {
    isLoginIn: true,
    email: '',
    password: '',
    validEmail: false,
    validPassword: false
  }
  render() {
    const {
      open,
      requestClose,
      loginWithFacebook,
      loginWithGoogle
    } = this.props
    const { isLoginIn, email, password } = this.state
    const renderView = isLoginIn ? (
      <div>
        <LoginLabel>
          <FormattedMessage {...messages.title} />
        </LoginLabel>
        <FormContainer>
          <StyledInput
            id="email"
            placeholder="E-Mail"
            value={email}
            onChange={this.handleInputChange}
          />
          <StyledInput
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.handleInputChange}
          />
          <RememberMeRow>
            <Checkbox>{'Remember me'}</Checkbox>
            <ForgotPasswordLabel>{'Forgot Password?'}</ForgotPasswordLabel>
          </RememberMeRow>
          <StyledLoginButton type="danger" onClick={this.handleMailLogin}>
            {'LOG IN'}
          </StyledLoginButton>
          <FacebookGmailLogin {...{ requestClose }} />
        </FormContainer>
        <NotAMemberLabel>
          {'Not a member?'}
          <JoinNowLabel onClick={this.handleJoinNow}>{'JOIN NOW'}</JoinNowLabel>
        </NotAMemberLabel>
      </div>
    ) : (
      <SignUp closeSignUp={this.showLogin} {...{ requestClose }} />
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

  showLogin = () => {
    this.setState({
      isLoginIn: true
    })
  }
  validateMail = (mail: string) => {
    return validate(mail)
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value, id } } = evt
    evt.persist()
    this.setState({ [id]: value } as any)
  }

  handleMailLogin = async (evt: React.MouseEvent<EventTarget>) => {
    const { email, password } = this.state
    const { loginWithEmail, requestClose } = this.props

    if (!email || !password) {
      message.error('Invalid User or Password!')
      return
    }

    try {
      const loginData = await loginWithEmail({ variables: { email, password } })
      const data = get(loginData, 'data.login', false)

      if (data) {
        const userData = {
          token: get(data, 'token', ''),
          name: get(data, 'user.name', ''),
          lastName: get(data, 'user.lastName')
        }
        message.success(
          `Hi ${get(data, 'user.name', '')}! Welcome to Jakroo`,
          5
        )
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(userData))
        }
        requestClose()
      }
    } catch (error) {
      message.error('Something happened, please try again!')
      console.error(error)
    }
  }
}

const loginEnhance = compose(mailLogin)(Login)
export default loginEnhance
