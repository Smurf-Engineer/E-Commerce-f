/**
 * ForgotPassword Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  Container,
  ForgotPasswordLabel,
  EnterEmailLabel,
  StyledInput,
  StyledButtonSend,
  ReturnToLogin
} from './styledComponents'
import messages from './messages'
import JakrooModal from '../Common/JakrooModal'

interface Props {
  open: boolean
  requestClose?: () => void
  formatMessage?: (messageDescriptor: any) => string
}

const ForgotPassword = ({ open, requestClose, formatMessage }: Props) => {
  return (
    <JakrooModal {...{ open, requestClose }}>
      <Container>
        <ForgotPasswordLabel>
          <FormattedMessage {...messages.forgotPasswordLabel} />
        </ForgotPasswordLabel>
        <EnterEmailLabel>
          <FormattedMessage {...messages.enterEmailLabel} />
        </EnterEmailLabel>
        <StyledInput placeholder="Email" />
        <StyledButtonSend>
          <FormattedMessage {...messages.sendButtonLabel} />
        </StyledButtonSend>
        <ReturnToLogin>
          <FormattedMessage {...messages.returnToLoginLabel} />
        </ReturnToLogin>
      </Container>
    </JakrooModal>
  )
}

export default ForgotPassword
