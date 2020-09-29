/**
 * ResellerSignup Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
// UNCOMMENT WHEN REMMEBER ME OPTION GETS IMPLEMENTED
// import Checkbox from 'antd/lib/checkbox'
import message from 'antd/lib/message'
import Select from 'antd/lib/select'
import get from 'lodash/get'
import { validate } from 'email-validator'
import { FormattedMessage } from 'react-intl'
import {
  Container,
  LoginLabel,
  FormContainer,
  StyledInput,
  TitleDesc,
  FormTitle,
  InputRow,
  InputDiv,
  Label,
  RequiredSymbol,
  InfoLabel,
  StyledInputPassword,
  BillingSelect,
  Notifications,
  Checkboxes,
  CheckboxStyled,
  Advertisement,
  StyledUpload,
  UploadButton,
  StyledIcon,
  FileLabel,
  Clip,
  FileName, ButtonsContainer, CancelButton, SaveButton, TermsCheckbox
} from './styledComponents'
import JakrooModal from '../Common/JakrooModal'
import { mailLogin } from './data'
import messages from './messages'

const { Option } = Select

const countries = [
  {
    label: 'Canada',
    value: 'CAD'
  },
  {
    label: 'USA',
    value: 'USD'
  }
]

interface Props {
  open: boolean
  initialCountryCode: string
  requestClose: () => void
  loginWithEmail: (variables: {}) => void
  loginWithFacebook: (variables: {}) => void
  loginWithGoogle: (variables: {}) => void
  formatMessage: (messageDescriptor: any, values?: object) => string
  login: (user: object) => void
  handleForgotPassword?: () => void
}

interface StateProps {
  isLoginIn: boolean
  email: string
  password: string
  validEmail: boolean
  validPassword: boolean
}

export class ResellerSignup extends React.Component<Props, StateProps> {
  state = {
    isLoginIn: false,
    email: '',
    password: '',
    validEmail: false,
    validPassword: false
  }
  render() {
    const {
      open,
      requestClose,
      formatMessage,
      handleForgotPassword,
      login,
      initialCountryCode
    } = this.props
    const { isLoginIn, email, password } = this.state
    return (
      <JakrooModal
        open={open}
        width={712}
        requestClose={this.onClosemodal}
        style={{ top: 20 }}
      >
        <Container>
          <LoginLabel>
            <FormattedMessage {...messages.signupTitle} />
          </LoginLabel>
          <TitleDesc
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.titleDesc)
            }}
          />
          <FormTitle>
            <FormattedMessage {...messages.resellerInfo} />
          </FormTitle>
          <FormContainer>
            <InputRow>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.firstName} />
                  <RequiredSymbol>*</RequiredSymbol>
                </Label>
                <StyledInput
                  id="email"
                  placeholder={formatMessage(messages.firstName)}
                  value={email}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.lastName} />
                  <RequiredSymbol>*</RequiredSymbol>
                </Label>
                <StyledInput
                  id="email"
                  placeholder={formatMessage(messages.lastName)}
                  value={email}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
            </InputRow>
            <InputRow>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.email} />
                  <RequiredSymbol>*</RequiredSymbol>
                </Label>
                <StyledInput
                  id="email"
                  placeholder={formatMessage(messages.email)}
                  value={email}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.phone} />
                  <RequiredSymbol>*</RequiredSymbol>
                </Label>
                <StyledInput
                  id="email"
                  placeholder={formatMessage(messages.phone)}
                  value={email}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
            </InputRow>
            <InputRow>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.password} />
                  <RequiredSymbol>*</RequiredSymbol>
                  <InfoLabel><FormattedMessage {...messages.passwordRestriction} /></InfoLabel>
                </Label>
                <StyledInputPassword
                  id="password"
                  type="Password"
                  placeholder={formatMessage(messages.password)}
                  value={email}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.confirmPassword} />
                  <RequiredSymbol>*</RequiredSymbol>
                </Label>
                <StyledInputPassword
                  id="confirmPassword"
                  type="Password"
                  placeholder={formatMessage(messages.confirmPassword)}
                  value={email}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
            </InputRow>
            <InputRow>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.website} />
                  <RequiredSymbol>*</RequiredSymbol>
                </Label>
                <StyledInput
                  id="email"
                  placeholder={formatMessage(messages.website)}
                  value={email}
                  onChange={this.handleInputChange}
                />
              </InputDiv>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.billingCountry} />
                  <RequiredSymbol>*</RequiredSymbol>
                </Label>
                <BillingSelect
                  value={''}
                  onChange={() => { }}
                >
                  {countries.map(({ label, value }, index: Number) =>
                    <Option key={index} {...{ value }}>
                      {label}
                    </Option>
                  )}
                </BillingSelect>
              </InputDiv>
            </InputRow>
            <Notifications>
              <Label>
                <FormattedMessage {...messages.notifyMe} />
              </Label>
              <Checkboxes>
                <CheckboxStyled
                  checked={false}
                  onChange={() => { }}
                >
                  <FormattedMessage {...messages.sendMail} />
                </CheckboxStyled>
                <CheckboxStyled
                  checked={false}
                  onChange={() => { }}
                >
                  <FormattedMessage {...messages.sendSms} />
                </CheckboxStyled>
              </Checkboxes>
            </Notifications>
          </FormContainer>
          <Advertisement>
            <FormattedMessage {...messages.advertisement} />
          </Advertisement>
          <TitleDesc
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.resellerDesc)
            }}
          />
          <StyledUpload
            listType="picture-card"
            className="avatar-uploader"
            customRequest={() => { }}
            showUploadList={false}
            beforeUpload={() => { }}
          >
            <UploadButton>
              <StyledIcon type="upload" />
              <FormattedMessage {...messages.uploadCertificate} />
            </UploadButton>
          </StyledUpload>
          {!!'fileName' &&
            <FileLabel>
              <Clip type="paper-clip" />
              <FileName>
                {'fileName'}
              </FileName>
            </FileLabel>
          }
          <TitleDesc
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.reviewText)
            }}
          />
          <TermsCheckbox
            checked={false}
            onChange={() => { }}
          >
            <FormattedMessage {...messages.termsAndConditions} />
          </TermsCheckbox>
          <ButtonsContainer>
            <SaveButton onClick={() => { }}>
              <FormattedMessage {...messages.create} />
            </SaveButton>
            <CancelButton onClick={() => { }}>
              <FormattedMessage {...messages.cancel} />
            </CancelButton>
          </ButtonsContainer>
        </Container>
      </JakrooModal>
    )
  }
  handleJoinNow = () => {
    this.setState({ isLoginIn: false })
  }
  onClosemodal = () => {
    const { requestClose } = this.props
    requestClose()
    this.setState({ isLoginIn: true })
  }

  onSignedUp = (data: any) => {
    const { login } = this.props
    login(data)
    this.onClosemodal()
  }

  showLogin = () => {
    this.setState({
      isLoginIn: true
    })
  }
  validateMail = (mail: string) => {
    return validate(mail)
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value, id }
    } = evt
    evt.persist()
    this.setState({ [id]: value } as any)
  }

  handleMailLogin = async (evt: React.MouseEvent<EventTarget>) => {
    const { password } = this.state
    const email = this.state.email.toLowerCase()
    const { loginWithEmail, requestClose, formatMessage, login } = this.props

    if (!email || !password) {
      message.error('Invalid User or Password!')
      return
    }

    try {
      const loginData = await loginWithEmail({ variables: { email, password } })
      const data = get(loginData, 'data.login', false)
      if (data) {
        const userData = {
          id: get(data, 'user.shortId', ''),
          token: get(data, 'token', ''),
          name: get(data, 'user.name', ''),
          lastName: get(data, 'user.lastName'),
          email: get(data, 'user.email'),
          administrator: get(data, 'user.administrator', false)
        }
        message.success(
          formatMessage(messages.welcomeMessage, {
            name: get(data, 'user.name', '')
          }),
          5
        )
        login(userData)
        requestClose()
      }
    } catch (error) {
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
    }
  }
}

const loginEnhance = compose(mailLogin)(ResellerSignup)
export default loginEnhance
