/**
 * SignUp Component - Created by cazarez on 21/02/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import Checkbox from 'antd/lib/checkbox'
import message from 'antd/lib/message'
import get from 'lodash/get'
import FacebookGmailLogin from '../FacebookGmailLogin'
import { createUser } from './data'
import {
  Container,
  Text,
  SignUpLabel,
  DividerRow,
  OrLabel,
  StyledInput,
  SocialMediaContainer,
  FormContainer,
  RightDivider,
  LeftDivider,
  NewsLetterRow,
  NewsLetterText,
  CreateAccountContainer,
  CreateAccountText,
  StyledButton,
  HaveAnAccountRow,
  LogInLabel
} from './styledComponents'
import messages from './messages'
import config from '../../config/index'

const CHECK_IP_ADDRESS: string = `${config.geoIpUrl}check?access_key=${
  config.geoIpAccesKey
}`
const DEFAULT_COUNTRY_CODE: string = 'us'

interface Props {
  closeSignUp: () => void
  signUpUser: (variables: {}) => void
  requestClose: () => void
  formatMessage: (messageDescriptor: any, values?: object) => string
}
interface StateProps {
  name: string
  lastName: string
  email: string
  password: string
  repeatPassword: string
  newsLetter: boolean
}

class SignUp extends React.Component<Props, StateProps> {
  state = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    newsLetter: false
  }
  render() {
    const { closeSignUp, requestClose, formatMessage } = this.props
    const {
      name,
      lastName,
      email,
      password,
      repeatPassword,
      newsLetter
    } = this.state

    return (
      <Container>
        <SocialMediaContainer>
          <SignUpLabel>
            {formatMessage(messages.createAccountLabel)}
          </SignUpLabel>
          <Text>{formatMessage(messages.saveAndAccessLegend)}</Text>
          <FacebookGmailLogin {...{ requestClose, formatMessage }} />
        </SocialMediaContainer>
        <DividerRow>
          <LeftDivider />
          <OrLabel>{formatMessage(messages.orLabel)}</OrLabel>
          <RightDivider />
        </DividerRow>
        <FormContainer>
          <StyledInput
            id="name"
            topText={formatMessage(messages.firtsNameLabel)}
            value={name}
            onChange={this.handleInputChange}
          />
          <StyledInput
            id="lastName"
            topText={formatMessage(messages.lastNameLabel)}
            value={lastName}
            onChange={this.handleInputChange}
          />
          <StyledInput
            id="email"
            topText={'E-mail'}
            value={email}
            onChange={this.handleInputChange}
          />
          <StyledInput
            id="password"
            type="password"
            topText={formatMessage(messages.passwordLabel)}
            value={password}
            onChange={this.handleInputChange}
          />
          <StyledInput
            id="repeatPassword"
            type="password"
            topText={formatMessage(messages.repeatPasswordLabel)}
            value={repeatPassword}
            onChange={this.handleInputChange}
          />
          <NewsLetterRow>
            <Checkbox checked={newsLetter} onChange={this.toggleCheckbox} />
            <NewsLetterText>
              {formatMessage(messages.newsLetterSignUp)}
            </NewsLetterText>
          </NewsLetterRow>
          <CreateAccountContainer>
            <CreateAccountText>
              {formatMessage(messages.termsAndPolicyLegend)}
            </CreateAccountText>
            <StyledButton
              type="danger"
              ghost={true}
              onClick={this.handleCreateAccount}
            >
              {formatMessage(messages.createAccountButtonLabel)}
            </StyledButton>
            <HaveAnAccountRow>
              {formatMessage(messages.haveAccount)}
              <LogInLabel onClick={closeSignUp}>
                {formatMessage(messages.loginLabel)}
              </LogInLabel>
            </HaveAnAccountRow>
          </CreateAccountContainer>
        </FormContainer>
      </Container>
    )
  }
  clearState = () => {
    this.setState({
      name: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      newsLetter: false
    })
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { id, value }
    } = evt
    this.setState({ [id]: value } as any)
  }

  toggleCheckbox = () => {
    const { newsLetter } = this.state
    this.setState({ newsLetter: !newsLetter })
  }

  handleCreateAccount = async () => {
    const {
      name,
      lastName,
      email,
      password,
      repeatPassword,
      newsLetter
    } = this.state
    const { signUpUser, formatMessage, closeSignUp } = this.props

    if (password.length < 8) {
      if (!name || !lastName || !email || !password || !repeatPassword) {
        message.error(formatMessage(messages.requiredFieldsError))
        return
      }
      message.error(formatMessage(messages.passwordLengthError))
      return
    }

    let code: string = DEFAULT_COUNTRY_CODE
    try {
      const resultFetch = await fetch(CHECK_IP_ADDRESS)
      const jsonRegion: any = await resultFetch.json()
      code = jsonRegion.country_code
    } catch (error) {
      console.error(error)
    }

    const user = {
      email: email.toLowerCase(),
      first_name: name,
      last_name: lastName,
      password,
      newsletter_subscribed: newsLetter,
      countryCode: code
    }

    try {
      const response = await signUpUser({ variables: { user } })
      const data = get(response, 'data.signUp', false)
      if (data) {
        message.info(
          formatMessage(messages.welcomeMessage, {
            name: get(data, 'user.name', '')
          })
        )
      }
      closeSignUp()
    } catch (error) {
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
      this.clearState()
    }
  }
}
const SingUpEnchance = compose(createUser)(SignUp)
export default SingUpEnchance
