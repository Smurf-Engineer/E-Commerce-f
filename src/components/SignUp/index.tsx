/**
 * SignUp Component - Created by cazarez on 21/02/18.
 */
import * as React from 'react'
import Checkbox from 'antd/lib/checkbox'
import JakrooModal from '../Common/JakrooModal'
import FacebookGmailLogin from '../FacebookGmailLogin'

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
}

const SignUp = ({ closeSignUp }: Props) => {
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
        <StyledInput topText={'First Name'} />
        <StyledInput topText={'Last Name'} />
        <StyledInput topText={'E-mail'} />
        <StyledInput
          topText={'Password * Must be at least 8 characters long'}
        />
        <StyledInput topText={'Re-enter Password'} />
        <NewsLetterRow>
          <Checkbox />
          <NewsLetterText>
            {'Sign me up for Jackroo’s Newsletter'}
          </NewsLetterText>
        </NewsLetterRow>
        <CreateAccountContainer>
          <CreateAccountText>
            {`'By creating an account, you agree to Jakroo's Privacy Policy and Terms of Use'`}
          </CreateAccountText>
          <StyledButton type="danger" ghost={true}>
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

export default SignUp
