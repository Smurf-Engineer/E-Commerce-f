/**
 * ForgotPassword Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import {
  Container,
  ForgotPasswordLabel,
  EnterEmailLabel,
  StyledInput,
  StyledButtonSend,
  ReturnToLogin
} from './styledComponents'
import JakrooModal from '../Common/JakrooModal'

interface Props {
  open: boolean
  requestClose?: () => void
}

const ForgotPassword = ({ open, requestClose }: Props) => {
  return (
    <JakrooModal open={open} {...{ requestClose }}>
      <Container>
        <ForgotPasswordLabel>Forgot your password?</ForgotPasswordLabel>
        <EnterEmailLabel>
          Enter your email to receive instructions on how to reset your
          password.
        </EnterEmailLabel>
        <StyledInput placeholder="Email" />
        <div>
          <StyledButtonSend>SEND</StyledButtonSend>
        </div>
        <div>
          <ReturnToLogin>Or return to LOG IN</ReturnToLogin>
        </div>
      </Container>
    </JakrooModal>
  )
}

export default ForgotPassword
