/**
 * FacebookGmailLogin Component - Created by cazarez on 21/02/18.
 */
import * as React from 'react'
import FacebookSignIn from '../FacebookSignIn'
import GoogleLogin from 'react-google-login'
import {
  Container,
  Text,
  FacebookButton,
  GoogleButton
} from './styledComponents'

interface Props {}

const componentClicked = (evt: any) => {
  console.log(evt)
}

const responseFacebook = (evt: any) => {
  console.log(evt)
}

const googleLoginSuccess = (resp: any) => {
  console.log(resp)
}

const googleLoginFailure = (err: any) => {
  console.log(err)
}
const FacebookGmailLogin = (props: Props) => {
  return (
    <Container>
      <GoogleButton
        clientId={
          '32595750537-deiet8319orbo3c54uqin9aqkpnbchbu.apps.googleusercontent.com'
        }
        onSuccess={googleLoginSuccess}
        onFailure={googleLoginFailure}
      >
        <div />
        <span>Login with Google</span>
      </GoogleButton>
      <FacebookButton
        appId="1656476814419105"
        autoLoad={true}
        fields="name,email,picture"
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
        onClick={componentClicked}
        callback={responseFacebook}
        scope="public_profile,user_friends,user_actions.books"
      />
      <FacebookSignIn redirectUrl="/" appId="1656476814419105" />
    </Container>
  )
}

export default FacebookGmailLogin
