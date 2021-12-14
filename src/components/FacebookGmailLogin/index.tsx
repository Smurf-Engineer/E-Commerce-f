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
  SocialIcon,
  GoogleLabel,
  GoogleRenderButton
} from './styledComponents'
import { NEW_USER } from '../../constants'
import config from '../../config'
import messages from './messages'
import { facebooklLogin, googleLogin } from './data'
import googleIcon from '../../assets/google.svg'
import fbIcon from '../../assets/fb-icon.svg'
const unauthorizedExp = /\balready an account\b/

interface Props {
  formatMessage: (messageDescriptor: any, values?: object) => string
  loginWithFacebook: (variables: {}) => void
  loginWithGoogle: (variables: {}) => void
  requestClose?: () => void
  handleJoinNow?: () => void
  handleLogin: (user: object) => void
  initialCountryCode: string
  signUpView: boolean
  adminLogin?: boolean
  countryName: string
  countryCode: string
  regionName: string
  city: string
}

class FacebookGmailLogin extends React.Component<Props, {}> {
  render() {
    const { formatMessage, signUpView, adminLogin, countryCode, handleJoinNow } = this.props
    const googleLabel = signUpView
      ? formatMessage(messages.googleSignUpLabel)
      : formatMessage(messages.googleLoginLabel)

    const facebookLabel = signUpView
      ? formatMessage(messages.facebookSignUpLabel)
      : formatMessage(messages.facebookLoginLabel)

    return (
      <Container>
        <GoogleButton
          clientId={config.googleId || ''}
          onSuccess={this.googleLoginSuccess}
          onFailure={this.googleLoginFailure}
          render={({ onClick }) => 
            <GoogleRenderButton onClick={countryCode ? onClick : handleJoinNow}>
              <SocialIcon>
                <img src={googleIcon} />
              </SocialIcon>
              <GoogleLabel>{googleLabel}</GoogleLabel>
            </GoogleRenderButton>
          }
        >
          <SocialIcon>
            <img src={googleIcon} />
          </SocialIcon>
          <GoogleLabel>{googleLabel}</GoogleLabel>
        </GoogleButton>
        {!adminLogin && (
          <FacebookButtonWrapper>
            <SocialIcon>
              <img src={fbIcon} />
            </SocialIcon>
            <FacebookLogin
              appId={config.facebookId || ''}
              autoLoad={false}
              fields="name,email,picture"
              callback={this.responseFacebook}
              scope="public_profile, email"
              render={({ onClick }) => (
                <button className="login-facebook" onClick={countryCode ? onClick : handleJoinNow}>
                  {facebookLabel}
                </button>
              )}
            >
              {facebookLabel}
            </FacebookLogin>
          </FacebookButtonWrapper>
        )}
      </Container>
    )
  }
  componentClicked = (evt: any) => { }

  responseFacebook = async (facebookResp: {}) => {
    const {
      loginWithFacebook,
      requestClose,
      handleLogin,
      formatMessage,
      countryName,
      countryCode,
      regionName,
      city
    } = this.props
    const token = get(facebookResp, 'accessToken')

    try {
      const response = await loginWithFacebook({
        variables: {
          token,
          countryCode,
          countryName,
          regionName,
          city
        }
      })
      const data = get(response, 'data.facebookSignIn', false)

      if (data) {
        const user = this.createUserObject(data)
        handleLogin(user)
        this.welcomeMessage(get(user, 'name'))
        if (data.newUser) {
          window.dataLayer.push({ event: NEW_USER, label: 'Facebook' })
        }
        if (requestClose) {
          requestClose()
        }
      }
    } catch (error) {
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message

      if (unauthorizedExp.test(errorMessage)) {
        message.error(formatMessage(messages.userExistsError))
      }
      console.error(error)
    }
  }

  googleLoginSuccess = async (resp: {}) => {
    const {
      loginWithGoogle,
      requestClose,
      handleLogin,
      formatMessage,
      adminLogin = false,
      countryName,
      countryCode,
      regionName,
      city
    } = this.props
    const token = get(resp, 'tokenId', false)

    try {
      const response = await loginWithGoogle({
        variables: {
          token,
          countryCode,
          isAdmin: adminLogin,
          countryName,
          regionName,
          city
        }
      })
      const data = get(response, 'data.googleSignIn', false)

      if (data) {
        const user = this.createUserObject(data)
        handleLogin(user)
        this.welcomeMessage(get(user, 'name'))
        if (data.newUser) {
          window.dataLayer.push({ event: NEW_USER, label: 'Google' })
        }
        if (!adminLogin && requestClose) {
          requestClose()
        }
      }
    } catch (error) {
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message

      if (unauthorizedExp.test(errorMessage)) {
        message.error(formatMessage(messages.userExistsError))
      } else {
        message.error(errorMessage)
      }
    }
  }

  createUserObject = (data: {}) => {
    const userData = {
      id: get(data, 'user.shortId', ''),
      token: get(data, 'token', ''),
      name: get(data, 'user.name', ''),
      lastName: get(data, 'user.lastName'),
      email: get(data, 'user.email'),
      administrator: get(data, 'user.administrator', false)
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
