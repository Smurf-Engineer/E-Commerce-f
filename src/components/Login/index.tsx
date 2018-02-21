/**
 * Login Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import Checkbox from 'antd/lib/checkbox'
import {
  Container,
  LoginLabel,
  FormContainer,
  StyledInput,
  RememberMeRow,
  StyledLoginButton,
  NotAMemberLabel,
  JoinNowLabel
} from './styledComponents'
import JakrooModal from '../Common/JakrooModal'

interface Props {
  open: boolean
  requestClose?: () => void
}

const Login = ({ open, requestClose }: Props) => {
  return (
    <JakrooModal open={open} {...{ requestClose }}>
      <Container>
        <LoginLabel>Log In</LoginLabel>
        <FormContainer>
          <StyledInput placeholder="E-Mail" />
          <StyledInput placeholder="Password" />
          <RememberMeRow>
            <Checkbox>Remember me</Checkbox>
            <div>Forgot Password?</div>
          </RememberMeRow>
          <StyledLoginButton type="danger">LOG IN</StyledLoginButton>
        </FormContainer>
        <NotAMemberLabel>
          Not a member? <JoinNowLabel>JOIN NOW</JoinNowLabel>
        </NotAMemberLabel>
      </Container>
    </JakrooModal>
  )
}

export default Login
