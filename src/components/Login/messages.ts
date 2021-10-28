import { defineMessages } from 'react-intl'

export default defineMessages({
  login: {
    id: 'components.login.title',
    defaultMessage: 'Log In'
  },
  rememberMe: {
    id: 'components.login.rememberMe',
    defaultMessage: 'Remember me'
  },
  forgotPassword: {
    id: 'components.login.forgotPassword',
    defaultMessage: 'Forgot Password?'
  },
  loginButtonLabel: {
    id: 'components.login.loginButtonLabel',
    defaultMessage: 'LOGIN'
  },
  notAMember: {
    id: 'components.login.notAMember',
    defaultMessage: 'Not a member?'
  },
  joinNow: {
    id: 'components.login.joinNow',
    defaultMessage: 'JOIN NOW'
  },
  emailLabel: {
    id: 'components.login.emailLabel',
    defaultMessage: 'E-Mail'
  },
  passwordLabel: {
    id: 'components.login.passwordLabel',
    defaultMessage: 'Password'
  },
  welcomeMessage: {
    id: 'components.login.welcomeMessage',
    defaultMessage: 'Hi {name}! Welcome to Jakroo'
  },
  loginError: {
    id: 'components.login.createAccountError',
    defaultMessage: 'Something went wrong. Please try again!'
  },
  msgLoginFailedSocial: {
    id: 'components.login.msgLoginFailedSocial',
    defaultMessage: `
      <p>Our records indicate that you signed up using your <strong>{social}</strong> account.</p>
      <p>Please try logging in again using that method.</p>
      <br><br>
      <p>For further assistance, please contact customer service</p>
      <p>via chat or email during standard business hours</p>
    `
  },
  msgLoginFailed: {
    id: 'components.login.msgLoginFailed',
    defaultMessage: `
      <p>No account exists under that email address.</p>
      <p>Please verify your email and try again.</p>
      <br><br>
      <p>For further assistance, please contact customer service</p>
      <p>via chat or email during standard business hours</p>
    `
  },
  ok: {
    id: 'components.login.ok',
    defaultMessage: 'OK'
  }
})
