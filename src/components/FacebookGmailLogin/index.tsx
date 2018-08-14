/**
 * FacebookGmailLogin Component - Created by cazarez on 21/02/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import { compose } from 'react-apollo'
import FacebookLogin from 'react-facebook-login'
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
import config from '../../config/index'

const CHECK_IP_ADDRESS: string = `${config.geoIpUrl}check?access_key=${
  config.geoIpAccesKey
}`
const DEFAULT_COUNTRY_CODE: string = 'us'
interface Props {
  formatMessage: (messageDescriptor: any, values?: object) => string
  loginWithFacebook: (variables: {}) => void
  loginWithGoogle: (variables: {}) => void
  requestClose: () => void
  handleLogin: (user: object) => void
}

class FacebookGmailLogin extends React.Component<Props, {}> {
  render() {
    const { formatMessage } = this.props
    return (
      <Container>
        <GoogleButton
          clientId="32595750537-deiet8319orbo3c54uqin9aqkpnbchbu.apps.googleusercontent.com"
          onSuccess={this.googleLoginSuccess}
          onFailure={this.googleLoginFailure}
        >
          <GoogleIcon />
          <GoogleLabel>{formatMessage(messages.googleLoginLabel)}</GoogleLabel>
        </GoogleButton>
        <FacebookButtonWrapper>
          <FacebookLogin
            appId="1656476814419105"
            autoLoad={false}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            scope="public_profile, email"
          />
        </FacebookButtonWrapper>
      </Container>
    )
  }
  componentClicked = (evt: any) => {}

  geoLocate = async () => {
    let code: string = DEFAULT_COUNTRY_CODE
    try {
      const resultFetch = await fetch(CHECK_IP_ADDRESS)
      const jsonRegion: any = await resultFetch.json()
      code = jsonRegion.country_code
    } catch (error) {
      console.error(error)
    }
    return code
  }

  responseFacebook = async (facebookResp: {}) => {
    const { loginWithFacebook, requestClose, handleLogin } = this.props
    const token = get(facebookResp, 'accessToken')

    try {
      const countryCode = await this.geoLocate()
      const response = await loginWithFacebook({
        variables: { token, countryCode }
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
    const { loginWithGoogle, requestClose, handleLogin } = this.props
    const token = get(resp, 'tokenId', false)

    try {
      const countryCode = await this.geoLocate()
      const response = await loginWithGoogle({
        variables: { token, countryCode }
      })
      const data = get(response, 'data.googleSignIn', false)

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
