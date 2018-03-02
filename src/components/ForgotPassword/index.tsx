/**
 * ForgotPassword Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import {
  Container,
  ForgotPasswordLabel,
  EnterEmailLabel,
  StyledInput,
  StyledButtonSend,
  ReturnToLogin
} from './styledComponents'
import { forgotPassword } from './data'
import messages from './messages'
import JakrooModal from '../Common/JakrooModal'

interface Props {
  open: boolean
  requestClose?: () => void
  formatMessage?: (messageDescriptor: any) => string
  sendMailForgotPassword: (variables: {}) => void
}

class ForgotPassword extends React.Component<Props, {}> {
  render() {
    const { open, requestClose } = this.props
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
}

const ForgotPasswordEnhance = compose(forgotPassword)(ForgotPassword)
export default ForgotPasswordEnhance
