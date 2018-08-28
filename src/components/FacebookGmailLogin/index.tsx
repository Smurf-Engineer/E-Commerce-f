/**
 * FacebookGmailLogin Component - Created by cazarez on 21/02/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import { compose } from 'react-apollo'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import message from 'antd/lib/message'
import {
  Container,
  FacebookButtonWrapper,
  GoogleButton,
  GoogleIcon,
  GoogleLabel
} from './styledComponents'
import messages from './messages'
import { facebooklLogin, googleLogin } from './data'

interface Props {
  formatMessage: (messageDescriptor: any, values?: object) => string
  loginWithFacebook: (variables: {}) => void
  loginWithGoogle: (variables: {}) => void
  requestClose: () => void
  handleLogin: (user: object) => void
  initialCountryCode: string
  signUpView: boolean
}

class FacebookGmailLogin extends React.Component<Props, {}> {
  render() {
    const { formatMessage, signUpView } = this.props
    const googleLabel = signUpView
      ? formatMessage(messages.googleSignUpLabel)
      : formatMessage(messages.googleLoginLabel)

    const facebookLabel = signUpView
      ? formatMessage(messages.facebookSignUpLabel)
      : formatMessage(messages.facebookLoginLabel)

    return (
      <Container>
        <GoogleButton
          clientId="32595750537-deiet8319orbo3c54uqin9aqkpnbchbu.apps.googleusercontent.com"
          onSuccess={this.googleLoginSuccess}
          onFailure={this.googleLoginFailure}
        >
          <GoogleIcon />
          <GoogleLabel>{googleLabel}</GoogleLabel>
        </GoogleButton>
        <FacebookButtonWrapper>
          <FacebookLogin
            appId="1656476814419105"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.responseFacebook}
            scope="public_profile, email"
            render={(renderProps: any) => (
              <button className="login-facebook" onClick={renderProps.onClick}>
                {facebookLabel}
              </button>
            )}
          >
            {facebookLabel}
          </FacebookLogin>
        </FacebookButtonWrapper>
      </Container>
    )
  }
  componentClicked = (evt: any) => {}

  responseFacebook = async (facebookResp: {}) => {
    const {
      loginWithFacebook,
      requestClose,
      handleLogin,
      initialCountryCode
    } = this.props
    const token = get(facebookResp, 'accessToken')

    try {
      const response = await loginWithFacebook({
        variables: { token, countryCode: initialCountryCode }
      })
      const data = get(response, 'data.facebookSignIn', false)

      if (data) {
        const user = this.createUserObject(data)
        handleLogin(user)
        this.welcomeMessage(get(user, 'name'))
        requestClose()
      }
    } catch (error) {
      console.error(error)
    }
  }

  googleLoginSuccess = async (resp: {}) => {
    const {
      loginWithGoogle,
      requestClose,
      handleLogin,
      initialCountryCode
    } = this.props
    const token = get(resp, 'tokenId', false)

    try {
      const response = await loginWithGoogle({
        variables: { token, countryCode: initialCountryCode }
      })
      const data = get(response, 'data.googleSignIn', false)

      if (data) {
        const user = this.createUserObject(data)
        handleLogin(user)
        this.welcomeMessage(get(user, 'name'))
        requestClose()
      }
    } catch (error) {
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
    }
  }

  createUserObject = (data: {}) => {
    const userData = {
      id: get(data, 'user.shortId', ''),
      token: get(data, 'token', ''),
      name: get(data, 'user.name', ''),
      lastName: get(data, 'user.lastName'),
      email: get(data, 'user.email')
    }

    return userData
  }
  googleLoginFailure = (err: any) => {
    console.error('ERROR GOOGLE ', err)
  }

  welcomeMessage = (name: string) => {
    const { formatMessage } = this.props
    message.success(
      formatMessage(messages.welcomeMessage, {
        name
      }),
      5
    )
  }
}

const FacebookGmailLoginEnhance = compose(
  facebooklLogin,
  googleLogin
)(FacebookGmailLogin)
export default FacebookGmailLoginEnhance
