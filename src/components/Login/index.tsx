/**
 * Login Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Checkbox from 'antd/lib/checkbox'
import get from 'lodash/get'
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
import { mailLogin, googleLogin, facebooklLogin } from './data'

interface Props {
  open: boolean
  requestClose: () => void
  loginWithEmail: (variables: {}) => void
}

interface StateProps {
  isLoginIn: boolean
  email: string
  password: string
}

class Login extends React.Component<Props, StateProps> {
  state = {
    isLoginIn: true,
    email: '',
    password: ''
  }
  render() {
    const { open, requestClose } = this.props
    const { isLoginIn, email, password } = this.state
    const renderView = isLoginIn ? (
      <div>
        <LoginLabel>{'Log In'}</LoginLabel>
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
          <FacebookGmailLogin />
        </FormContainer>
        <NotAMemberLabel>
          {'Not a member?'}
          <JoinNowLabel onClick={this.handleJoinNow}>{'JOIN NOW'}</JoinNowLabel>
        </NotAMemberLabel>
      </div>
    ) : (
      <SignUp closeSignUp={this.showLogin} />
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

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value, id } } = evt
    evt.persist()
    this.setState({ [id]: value } as any)
  }

  handleMailLogin = async (evt: React.MouseEvent<EventTarget>) => {
    const { email, password } = this.state
    const { loginWithEmail } = this.props
    if (!email && !password) {
      return
    }
    let loginData
    try {
      loginData = await loginWithEmail({ variables: { email, password } })
      const data = get(loginData, 'data', false)
      if (data) {
        console.log(data)
        const userData = {
          token: get(data, 'login.token', ''),
          name: get(data, 'login.user.name', ''),
          lastName: get(data, 'login.user.lastName')
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(userData))
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  handleFacebookLogin = () => {
    // TODO: ADD facebook mutation call
  }
}

const loginEnhance = compose(mailLogin, facebooklLogin, googleLogin)(Login)
export default loginEnhance
