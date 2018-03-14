/**
 * ResetPassword Component - Created by gustavomedina on 05/03/18.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { InjectedIntl, injectIntl } from 'react-intl'
import { compose } from 'react-apollo'
import * as queryString from 'query-string'
import { ReducersObject } from '../../store/rootReducer'
import message from 'antd/lib/message'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import messages from './messages'
import {
  Container,
  FormContainer,
  StyledInput,
  StyledLoginButton,
  StyledCard
} from './styledComponents'
import { setPassword, setConfirmPassword } from './actions'
import { resetPassword } from './data'

interface Props {
  changeResetPassword: (variables: {}) => void
  history: any
  dispatch: any
  password: string
  confirmPassword: string
  intl: InjectedIntl
}

export class ResetPassword extends React.Component<Props, {}> {
  handleChangePassword = async (evt: React.MouseEvent<EventTarget>) => {
    const {
      changeResetPassword,
      intl,
      history,
      password,
      confirmPassword
    } = this.props

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
          history.replace('/')
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

  handlePasswordChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { dispatch } = this.props
    const { currentTarget: { value } } = evt
    evt.persist()
    dispatch(setPassword(value))
  }

  handleConfirmPasswordChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { dispatch } = this.props
    const { currentTarget: { value } } = evt
    evt.persist()
    dispatch(setConfirmPassword(value))
  }

  changeMessage = (printMessage: string, success: boolean) => {
    if (success) {
      message.success(printMessage, 5)
    } else {
      message.error(printMessage, 5)
    }
  }

  render() {
    const { intl, password, confirmPassword } = this.props
    return (
      <Container>
        <StyledCard title={intl.formatMessage(messages.changePasswordLabel)}>
          <FormContainer>
            <StyledInput
              id="password"
              value={password}
              type="Password"
              placeholder={intl.formatMessage(messages.newPasswordLabel)}
              onChange={this.handlePasswordChange}
            />
            <StyledInput
              id="confirmPassword"
              value={confirmPassword}
              type="Password"
              placeholder={intl.formatMessage(messages.confirmNewPasswordLabel)}
              onChange={this.handleConfirmPasswordChange}
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
