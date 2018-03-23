/**
 * ForgotPassword Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { validate } from 'email-validator'
import get from 'lodash/get'
import message from 'antd/lib/message'
import { ReducersObject } from '../../store/rootReducer'
import {
  Container,
  ForgotPasswordLabel,
  EnterEmailLabel,
  StyledInput,
  StyledButtonSend,
  ReturnToLogin
} from './styledComponents'
import { setEmail } from './actions'
import { forgotPassword } from './data'
import messages from './messages'
import JakrooModal from '../Common/JakrooModal'

interface Props {
  open: boolean
  dispatch: any
  email: string
  openLogin: () => void
  requestClose: () => void
  formatMessage: (messageDescriptor: any, values?: object) => string
  sendMailForgotPassword: (variables: {}) => void
}

class ForgotPassword extends React.Component<Props, {}> {
  onSendMail = async (facebookResp: {}) => {
    const {
      sendMailForgotPassword,
      formatMessage,
      requestClose,
      email
    } = this.props

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
    const { dispatch } = this.props
    const { currentTarget: { value } } = evt
    evt.persist()
    dispatch(setEmail(value))
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

  closeForgot = () => {
    const { openLogin, requestClose } = this.props

    requestClose()
    openLogin()
  }

  render() {
    const { open, requestClose, formatMessage, email } = this.props
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
          <ReturnToLogin onClick={this.closeForgot}>
            <FormattedMessage {...messages.returnToLoginLabel} />
          </ReturnToLogin>
        </Container>
      </JakrooModal>
    )
  }
}

const mapStateToProps = ({ forgot }: ReducersObject) => forgot.toJS()

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const ForgotPasswordEnhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  forgotPassword
)(ForgotPassword)
export default ForgotPasswordEnhance
