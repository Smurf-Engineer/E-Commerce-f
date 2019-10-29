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
import { Container } from './styledComponents'
import JakrooModal from '../Common/JakrooModal'
import SignUpTest from '../SignUpTest'
import { mailLogin } from './data'
import messages from './messages'

interface Props {
  open: boolean
  initialCountryCode: string
  loginWithEmail: (variables: {}) => void
  loginWithFacebook: (variables: {}) => void
  loginWithGoogle: (variables: {}) => void
  formatMessage: (messageDescriptor: any, values?: object) => string
  login: (user: object) => void
}

interface StateProps {
  isLoginIn: boolean
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
    const { open, formatMessage, initialCountryCode, login } = this.props
    const renderView = (
      <div>
        <SignUpTest
          closeSignUp={this.showLogin}
          login={this.onSignedUp}
          {...{ formatMessage, initialCountryCode, login }}
        />
      </div>
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
  onClosemodal = () => {}

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
    const { loginWithEmail, formatMessage, login } = this.props

    if (!email || !password) {
      message.error('Invalid User or Password!')
      return
    }

    try {
      const loginData = await loginWithEmail({ variables: { email, password } })
      const data = get(loginData, 'data.login', false)
      if (data) {
        const userData = {
          id: get(data, 'user.shortId', ''),
          token: get(data, 'token', ''),
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
      }
    } catch (error) {
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
    }
  }
}

const loginEnhance = compose(mailLogin)(Login)
export default loginEnhance
