/**
 * ResetPassword Component - Created by gustavomedina on 05/03/18.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import * as queryString from 'query-string'
import { ReducersObject } from '../../store/rootReducer'
import message from 'antd/lib/message'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import messages from './messages'
import {
  Container,
  LoginLabel,
  FormContainer,
  StyledInput,
  RememberMeRow,
  StyledLoginButton,
  NotAMemberLabel,
  JoinNowLabel,
  ForgotPasswordLabel,
  StyledCard
} from './styledComponents'
import { resetPassword } from './data'

interface Props {
  // formatMessage: (messageDescriptor: any, values?: object) => string
  changeResetPassword: (variables: {}) => void
  intl: InjectedIntl
}

interface StateProps {
  password: string
  confirmPassword: string
  validPass: boolean
}

export class ResetPassword extends React.Component<Props, StateProps> {
  state = {
    password: '',
    confirmPassword: '',
    validPass: false
  }

  handleChangePassword = async (evt: React.MouseEvent<EventTarget>) => {
    const { password, confirmPassword } = this.state
    const { changeResetPassword, intl } = this.props

    if (!password || !confirmPassword) {
      this.changeMessage(
        intl.formatMessage(messages.invalidPasswordMessage),
        false
      )
      return
    }

    if (isEqual(password, confirmPassword)) {
      try {
        const params = queryString.parse(location.search)
        if (!params || !params.resetToken) {
          this.changeMessage(
            intl.formatMessage(messages.resetTokenMessage),
            false
          )
          return
        }
        const response = await changeResetPassword({
          variables: { resetToken: params.resetToken, password }
        })
        const data = get(response, 'data.resetPassword', false)

        if (data) {
          this.changeMessage(data.message, true)
          // TODO: redirect to home
        }
      } catch (error) {
        const errorMessage = error.graphQLErrors.map((x: any) => x.message)
        this.changeMessage(errorMessage, false)
        console.error(error)
      }
    } else {
      this.changeMessage(intl.formatMessage(messages.noMatchingMessage), false)
    }
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value, id } } = evt
    evt.persist()
    this.setState({ [id]: value } as any)
  }

  changeMessage = (printMessage: string, success: boolean) => {
    if (success) {
      message.success(printMessage, 5)
    } else {
      message.error(printMessage, 5)
    }
  }

  render() {
    const { intl } = this.props
    const { password, confirmPassword } = this.state
    return (
      <Container>
        <StyledCard title={intl.formatMessage(messages.changePasswordLabel)}>
          <FormContainer>
            <StyledInput
              id="password"
              value={password}
              type="Password"
              placeholder={intl.formatMessage(messages.newPasswordLabel)}
              onChange={this.handleInputChange}
            />
            <StyledInput
              id="confirmPassword"
              value={confirmPassword}
              type="Password"
              placeholder={intl.formatMessage(messages.confirmNewPasswordLabel)}
              onChange={this.handleInputChange}
            />
            <StyledLoginButton
              type="danger"
              onClick={this.handleChangePassword}
            >
              {intl.formatMessage(messages.changePasswordLabel)}
            </StyledLoginButton>
          </FormContainer>
        </StyledCard>
      </Container>
    )
  }
}

const mapStateToProps = ({ reset }: ReducersObject) => reset.toJS()

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const ResetPasswordEnhance = compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
  resetPassword
)(ResetPassword)
export default ResetPasswordEnhance
