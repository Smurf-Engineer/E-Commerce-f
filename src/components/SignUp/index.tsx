/**
 * SignUp Component - Created by cazarez on 21/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Checkbox from 'antd/lib/checkbox'
import message from 'antd/lib/message'
import get from 'lodash/get'
import FacebookGmailLogin from '../FacebookGmailLogin'
import { NEW_USER } from '../../constants'
import { createUser } from './data'
import {
  Container,
  Text,
  SignUpLabel,
  DividerRow,
  OrLabel,
  StyledInput,
  LocationContainer,
  FormContainer,
  RightDivider,
  LeftDivider,
  NewsLetterRow,
  NewsLetterText,
  CreateAccountContainer,
  CreateAccountText,
  StyledButton,
  HaveAnAccountRow,
  LogInLabel,
  CountryContainer,
  Label,
} from './styledComponents'
import messages from './messages'
import { validateEmail } from '../../utils/utilsFunctions'
import CountrySelect from '../CountrySelect'
import RegionSelect from '../RegionSelect'
import { countriesQuery } from './data'
import { QueryProps, Country } from '../../types/common'

interface Data extends QueryProps {
  countries: Country[]
}

interface Props {
  data: Data
  closeSignUp: () => void
  signUpUser: (variables: {}) => void
  requestClose: () => void
  setCountryValue: (
    countryId: string,
    countryName: string,
    countryCode: string
  ) => void
  setRegionChange: (name: string, code: string) => void
  formatMessage: (messageDescriptor: any, values?: object) => string
  initialCountryCode: string
  login: (user: object) => void
  countryName: string
  countryCode: string
  regionName: string
  city: string
}
interface StateProps {
  name: string
  lastName: string
  email: string
  password: string
  repeatPassword: string
  newsLetter: boolean
  selectedCountry: string | undefined
  selectedCountryName: string | undefined
  selectedCountryId: string | undefined
  selectedRegion: string | undefined
  selectedRegionCode: string | undefined
}

class SignUp extends React.Component<Props, StateProps> {
  state = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    newsLetter: false,
    selectedCountry: '',
    selectedCountryName: '',
    selectedCountryId: '',
    selectedRegion: '',
    selectedRegionCode: '',
  }
  render() {
    const {
      data,
      closeSignUp,
      requestClose,
      formatMessage,
      login,
      countryName,
      countryCode,
      regionName,
      city = '',
    } = this.props
    const {
      name,
      lastName,
      email,
      password,
      repeatPassword,
      newsLetter,
      selectedCountry = '',
      selectedCountryId = '',
      selectedCountryName = '',
      selectedRegion = '',
    } = this.state

    const countrySelected = selectedCountryName || countryName
    const countryCodeSelected = selectedCountry || countryCode
    const regionSelected = selectedRegion || regionName
    const showCountrySelector =
      !countryName || countryCode === 'US' || countryCode === 'CA'
    const showProvinceSelector =
      ((countryCode === 'US' || countryCode === 'CA') && !selectedCountry) ||
      (selectedCountry === 'US' || selectedCountry === 'CA')
    const showSignupForm =
      !!countrySelected &&
      (!showProvinceSelector || (showProvinceSelector && !!selectedRegion))

    return (
      <Container>
        <LocationContainer>
          <SignUpLabel>
            {formatMessage(messages.createAccountLabel)}
          </SignUpLabel>
          <Text>{formatMessage(messages.saveAndAccessLegend)}</Text>
          {showCountrySelector && (
            <>
              <CountryContainer>
                <Label>{formatMessage(messages.countryLabel)}</Label>
                <CountrySelect
                  {...{ formatMessage }}
                  selectedCountry={
                    selectedCountry
                      ? `${selectedCountry}-${selectedCountryId}`
                      : undefined
                  }
                  loading={data && data.loading}
                  handleCountryChange={this.handleCountryChange}
                  countries={data.countries}
                />
              </CountryContainer>
            </>
          )}
          {showProvinceSelector && (
            <>
              <CountryContainer {...{ countrySelected }}>
                <Label>{formatMessage(messages.regionLabel)}</Label>
                <RegionSelect
                  {...{ formatMessage }}
                  country={selectedCountryId}
                  countryName={selectedCountryName}
                  region={selectedRegion ? `${selectedRegion}` : undefined}
                  handleRegionChange={this.handleRegionChange}
                />
              </CountryContainer>
            </>
          )}
        </LocationContainer>
        {showSignupForm && (
          <>
            <FormContainer>
              <StyledInput
                id="name"
                topText={formatMessage(messages.firtsNameLabel)}
                value={name}
                onChange={this.handleInputChange}
              />
              <StyledInput
                id="lastName"
                topText={formatMessage(messages.lastNameLabel)}
                value={lastName}
                onChange={this.handleInputChange}
              />
              <StyledInput
                id="email"
                topText={'E-mail'}
                value={email}
                onChange={this.handleInputChange}
              />
              <StyledInput
                id="password"
                type="password"
                topText={formatMessage(messages.passwordLabel)}
                value={password}
                onChange={this.handleInputChange}
              />
              <StyledInput
                id="repeatPassword"
                type="password"
                topText={formatMessage(messages.repeatPasswordLabel)}
                value={repeatPassword}
                onChange={this.handleInputChange}
              />
              <NewsLetterRow>
                <Checkbox checked={newsLetter} onChange={this.toggleCheckbox} />
                <NewsLetterText>
                  {formatMessage(messages.newsLetterSignUp)}
                </NewsLetterText>
              </NewsLetterRow>
              <CreateAccountContainer>
                <CreateAccountText>
                  {formatMessage(messages.termsAndPolicyLegend)}
                </CreateAccountText>
                <StyledButton onClick={this.handleCreateAccount}>
                  {formatMessage(messages.createAccountButtonLabel)}
                </StyledButton>
              </CreateAccountContainer>
            </FormContainer>

            <DividerRow>
              <LeftDivider />
              <OrLabel>{formatMessage(messages.orLabel)}</OrLabel>
              <RightDivider />
            </DividerRow>

            <FacebookGmailLogin
              signUpView={true}
              handleLogin={login}
              {...{
                requestClose,
                formatMessage,
              }}
              regionName={regionSelected}
              countryName={countrySelected}
              initialCountryCode={countryCodeSelected}
              countryCode={countryCodeSelected}
              city={regionSelected === regionName ? city : ''}
            />
            <HaveAnAccountRow>
              {formatMessage(messages.haveAccount)}
              <LogInLabel onClick={closeSignUp}>
                {formatMessage(messages.loginLabel)}
              </LogInLabel>
            </HaveAnAccountRow>
          </>
        )}
      </Container>
    )
  }
  clearState = () => {
    this.setState({
      name: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      newsLetter: false,
      selectedCountry: '',
      selectedCountryId: '',
      selectedCountryName: '',
      selectedRegion: '',
      selectedRegionCode: '',
    })
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { id, value },
    } = evt
    this.setState({ [id]: value } as any)
  }

  handleCountryChange = (
    value: any,
    countryId: string,
    countryName: string
  ) => {
    const { setCountryValue } = this.props
    this.setState({
      selectedCountry: value,
      selectedCountryId: countryId,
      selectedCountryName: countryName,
    })
    setCountryValue(value, countryId, countryName)
  }

  handleRegionChange = (value: any, regionCode: string) => {
    const { setRegionChange } = this.props
    this.setState({
      selectedRegion: value,
      selectedRegionCode: regionCode,
    })
    setRegionChange(value, regionCode)
  }

  toggleCheckbox = () => {
    const { newsLetter } = this.state
    this.setState({ newsLetter: !newsLetter })
  }

  handleCreateAccount = async () => {
    const {
      name,
      lastName,
      email,
      password,
      repeatPassword,
      newsLetter,
      selectedCountry = '',
      selectedCountryName = '',
      selectedRegion = '',
    } = this.state
    const {
      signUpUser,
      formatMessage,
      closeSignUp,
      login,
      countryName = '',
      countryCode = '',
      regionName = '',
      city,
    } = this.props

    if (password.length < 8) {
      if (!name || !lastName || !email || !password || !repeatPassword) {
        message.error(formatMessage(messages.requiredFieldsError))
        return
      }
      message.error(formatMessage(messages.passwordLengthError))
      return
    }

    const user = {
      email: email.toLowerCase(),
      first_name: name,
      last_name: lastName,
      password,
      newsletter_subscribed: newsLetter,
      country_code: selectedCountry || countryCode,
      country_name: selectedCountryName || countryName,
      region_name: selectedRegion || regionName,
      city: selectedRegion === regionName && city ? city : '',
    }

    if (!validateEmail(email.toLowerCase())) {
      message.error(formatMessage(messages.badFormat))
      return
    }
    try {
      const response = await signUpUser({ variables: { user } })
      const data = get(response, 'data.signUp', false)
      if (data) {
        const userData = {
          id: get(data, 'user.shortId', ''),
          token: get(data, 'token', ''),
          name: get(data, 'user.name', ''),
          lastName: get(data, 'user.lastName', ''),
          email: get(data, 'user.email', ''),
          administrator: get(data, 'user.administrator', false),
        }
        message.success(
          formatMessage(messages.welcomeMessage, {
            name: get(data, 'user.name', ''),
          })
        )
        window.dataLayer.push({ event: NEW_USER, label: 'Form Sign Up' })
        login(userData)
      }
      closeSignUp()
    } catch (error) {
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
      this.clearState()
    }
  }
}
const SingUpEnchance = compose(
  createUser,
  graphql(countriesQuery, {
    options: {
      fetchPolicy: 'network-only',
    },
  })
)(SignUp)
export default SingUpEnchance
