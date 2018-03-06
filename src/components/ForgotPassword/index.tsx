/**
 * ForgotPassword Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import { validate } from 'email-validator'
import get from 'lodash/get'
import message from 'antd/lib/message'
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
  requestClose: () => void
  formatMessage: (messageDescriptor: any, values?: object) => string
  sendMailForgotPassword: (variables: {}) => void
}

interface StateProps {
  email: string
  validEmail: boolean
}

class ForgotPassword extends React.Component<Props, StateProps> {
  state = {
    email: '',
    validEmail: false
  }

  onSendMail = async (facebookResp: {}) => {
    const { sendMailForgotPassword, formatMessage, requestClose } = this.props
    const { email } = this.state

    if (!email || !this.validateMail(email)) {
      this.forgotMessage(formatMessage(messages.invalidEmailLabel), false)
      return
    }

    try {
      const response = await sendMailForgotPassword({
        variables: { email }
      })
      const data = get(response, 'data.forgotPassword', false)

      if (data) {
        this.forgotMessage(data.message, true)
        requestClose()
      }
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      this.forgotMessage(errorMessage, false)
      console.error(error)
    }
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value, id } } = evt
    evt.persist()
    this.setState({ [id]: value } as any)
  }

  validateMail = (mail: string) => {
    return validate(mail)
  }

  forgotMessage = (printMessage: string, success: boolean) => {
    if (success) {
      message.success(printMessage, 5)
    } else {
      message.error(printMessage, 5)
    }
  }

  render() {
    const { open, requestClose, formatMessage } = this.props
    const { email } = this.state
    return (
      <JakrooModal {...{ open, requestClose }}>
        <Container>
          <ForgotPasswordLabel>
            <FormattedMessage {...messages.forgotPasswordLabel} />
          </ForgotPasswordLabel>
          <EnterEmailLabel>
            <FormattedMessage {...messages.enterEmailLabel} />
          </EnterEmailLabel>
          <StyledInput
            id="email"
            value={email}
            onChange={this.handleInputChange}
            placeholder={formatMessage(messages.emailLabel)}
          />
          <StyledButtonSend onClick={this.onSendMail}>
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
