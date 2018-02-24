/**
 * SignUp Component - Created by cazarez on 21/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Checkbox from 'antd/lib/checkbox'
import message from 'antd/lib/message'
import get from 'lodash/get'
import JakrooModal from '../Common/JakrooModal'
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
  LogInLabel,
  InputRow
} from './styledComponents'

interface Props {
  closeSignUp?: () => void
  signUpUser: (variables: {}) => void
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
    const { closeSignUp } = this.props
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
          <SignUpLabel>{'Create a Jakroo Account'}</SignUpLabel>
          <Text>
            {
              'Save and acess all your customized designs and preferences for a better shopping experience.'
            }
          </Text>
          <FacebookGmailLogin />
        </SocialMediaContainer>
        <DividerRow>
          <LeftDivider />
          <OrLabel>{'OR'}</OrLabel>
          <RightDivider />
        </DividerRow>
        <FormContainer>
          <StyledInput
            id="name"
            topText={'First Name'}
            value={name}
            onChange={this.handleInputChange}
          />
          <StyledInput
            id="lastName"
            topText={'Last Name'}
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
            topText={'Password * Must be at least 8 characters long'}
            value={password}
            onChange={this.handleInputChange}
          />
          <StyledInput
            id="repeatPassword"
            type="password"
            topText={'Re-enter Password'}
            value={repeatPassword}
            onChange={this.handleInputChange}
          />
          <NewsLetterRow>
            <Checkbox checked={newsLetter} onChange={this.toggleCheckbox} />
            <NewsLetterText>
              {'Sign me up for Jackroo’s Newsletter'}
            </NewsLetterText>
          </NewsLetterRow>
          <CreateAccountContainer>
            <CreateAccountText>
              {`'By creating an account, you agree to Jakroo's Privacy Policy and Terms of Use'`}
            </CreateAccountText>
            <StyledButton
              type="danger"
              ghost={true}
              onClick={this.handleCreateAccount}
            >
              {'CREATE ACCOUNT'}
            </StyledButton>
            <HaveAnAccountRow>
              {'Have an account?'}
              <LogInLabel onClick={closeSignUp}>{'LOG IN'}</LogInLabel>
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
    const { currentTarget: { id, value } } = evt
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
    const { signUpUser } = this.props

    if (password.length < 8) {
      if (!name || !lastName || !email || !password || !repeatPassword) {
        message.error('All fields are required!')
        return
      }
      message.error('Password must be at least 8 characters')
      return
    }
    const user = {
      email,
      first_name: name,
      last_name: lastName,
      password,
      newsletter_subscribed: newsLetter
    }
    try {
      const response = await signUpUser({ variables: { user } })
      const data = get(response, 'data.signUp', false)

      if (data) {
        message.info(`Hi ${get(data, 'user.name', '')}! Welcome to Jakroo`)
      }
    } catch (error) {
      message.error('User already exists.')
      console.error('catch: ', error)
      this.clearState()
    }
  }
}
const SingUpEnchance = compose(createUser)(SignUp)
export default SingUpEnchance
