/**
 * ResetPassword Component - Created by gustavomedina on 05/03/18.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { InjectedIntl, injectIntl } from 'react-intl'
import { compose } from 'react-apollo'
import * as queryString from 'query-string'
import message from 'antd/lib/message'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import messages from './messages'
import {
  Container,
  Header,
  ContentHeader,
  LogoIcon,
  Divider,
  FormContainer,
  Title,
  InputTitleContainer,
  Label,
  RequiredSpan,
  StyledInput,
  ButtonsContainer,
  StyledChangePasswordButton,
  StyledCancelButton
} from './styledComponents'
import { setPassword, setConfirmPassword } from './actions'
import { resetPassword } from './data'
import Layout from '../../components/MainLayout'
import logo from '../../assets/jakroo_logo.svg'

interface Props {
  history: any
  dispatch: any
  password: string
  confirmPassword: string
  intl: InjectedIntl
  changeResetPassword: (variables: {}) => void
}

export class ResetPassword extends React.Component<Props, {}> {
  handleChangePassword = async (evt: React.MouseEvent<EventTarget>) => {
    const { changeResetPassword, intl, password, confirmPassword } = this.props

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
          window.location.replace('/')
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
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    dispatch(setPassword(value))
  }

  handleConfirmPasswordChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { dispatch } = this.props
    const {
      currentTarget: { value }
    } = evt
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

  handleCancel = () => {}

  render() {
    const { intl, history, password, confirmPassword } = this.props
    const { formatMessage } = intl

    return (
      <Layout hideFooter={true} hideBottomHeader={true} {...{ history, intl }}>
        <Header>
          <ContentHeader>
            <LogoIcon src={logo} />
          </ContentHeader>
        </Header>
        <Divider />
        <Container>
          <FormContainer>
            <Title>{formatMessage(messages.changePasswordLabel)}</Title>
            <InputTitleContainer>
              <Label>{formatMessage(messages.newPasswordLabel)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="password"
              value={password}
              type="Password"
              onChange={this.handlePasswordChange}
            />
            <InputTitleContainer>
              <Label>{formatMessage(messages.confirmNewPasswordLabel)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="confirmPassword"
              value={confirmPassword}
              type="Password"
              onChange={this.handleConfirmPasswordChange}
            />
            <ButtonsContainer>
              <StyledChangePasswordButton
                type="danger"
                onClick={this.handleChangePassword}
              >
                {formatMessage(messages.changePasswordLabel)}
              </StyledChangePasswordButton>
              <StyledCancelButton onClick={this.handleCancel}>
                {formatMessage(messages.cancel)}
              </StyledCancelButton>
            </ButtonsContainer>
          </FormContainer>
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('reset').toJS()

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const ResetPasswordEnhance = compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  resetPassword
)(ResetPassword)
export default ResetPasswordEnhance
