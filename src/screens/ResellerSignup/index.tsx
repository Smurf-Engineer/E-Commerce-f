/**
 * ResellerSignup Component - Created by cazarez on 20/02/18.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { compose, withApollo } from 'react-apollo'
// UNCOMMENT WHEN REMMEBER ME OPTION GETS IMPLEMENTED
// import Checkbox from 'antd/lib/checkbox'
import message from 'antd/lib/message'
import Select from 'antd/lib/select'
import get from 'lodash/get'
import AntdMessage from 'antd/lib/message'
import PhoneInput from 'react-phone-input-2'
import * as mainLayoutActions from '../../components/MainLayout/api'
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl'
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
  SavingContainer,
  Clip,
  FileName,
  ButtonsContainer,
  CancelButton,
  SaveButton,
  TermsCheckbox,
  LoadingContainer,
  layoutStyle,
  GSTInput,
  ModalTitle,
  okButtonStyles,
  InfoText,
  Signup,
  TopSection,
  TopDiv,
  Title,
  FeatureBox,
  FeatureTitle,
  FeatureImage,
  FeatureDesc,
  LearnMore,
  ImageTitle,
  BannerSection,
  BannerBack,
  BannerLogo,
  BannerLogos,
  BannerDescription,
  BannerTitle,
  HalfDiv,
  HalfImage,
  BannerFooter,
  FullDiv,
  BigTitle,
  BannerCheckList,
  MiddleText
} from './styledComponents'
import { createUser } from './data'
import messages from './messages'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { uploadFileAction } from './api'
import Modal from 'antd/lib/modal'
import { UploadChangeParam } from 'antd/lib/upload'
import Spin from 'antd/lib/spin'
import { getFileWithExtension } from '../../utils/utilsFiles'
import { validateEmail } from '../../utils/utilsFunctions'
import Layout from '../../components/MainLayout'
import RegionSelect from '../../components/RegionSelect'
import yourKitImage from '../../assets/your_kit_graphic.png'
import directShip from '../../assets/directship_dark.png'
import directShipSteps from '../../assets/directship_3steps.png'
import onDemandLogo from '../../assets/on_demand_red.png'
import onDemandLogoMain from '../../assets/on_demand_logo_main.jpg'
import onDemandDelivery from '../../assets/on_demand_delivery.png'
import designLabWhite from '../../assets/design_lab_white.png'
import proDesignWhite from '../../assets/pro_design_white.png'
import directShipWhite from '../../assets/directship_white.png'
import resellerGuy from '../../assets/reseller-banner-image.jpg'
import { NEW_USER } from '../../constants'
import { User, UserType } from '../../types/common'
import { CA_COUNTRY, CA_CURRENCY, US_COUNTRY, US_CURRENCY } from '../../components/ResellerAbout/constants'
import { connect } from 'react-redux'

const { Option } = Select
const { confirm } = Modal

const shopImage = 'https://storage.googleapis.com/jakroo/screens/YourShop-YourBrand-photo.jpg'

const countries = [
  {
    label: 'Canada',
    value: 'cad'
  },
  {
    label: 'USA',
    value: 'usd'
  }
]

const countryNames = {
  [US_CURRENCY]: 'United States',
  [CA_CURRENCY]: 'Canada'
}

const countryCodes = {
  [US_CURRENCY]: '6252001',
  [CA_CURRENCY]: '6251999'
}

interface Props {
  intl: InjectedIntl
  client: any
  initialCountryCode: string
  history: History
  user: User
  signUpUser: (variables: {}) => Promise<User>
  saveUserSession: (user: UserType, client: any) => void
}

interface StateProps {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  gst: string,
  saving: boolean,
  password: string,
  confirmPassword: string,
  website: string,
  currency: string,
  sendSms: boolean,
  sendMail: boolean,
  terms: boolean,
  loading: boolean,
  visible: boolean,
  selectedRegion: string,
  bannerSelected: number,
  changedBanner: boolean,
  selectedRegionCode: string,
  businessName: string,
  fileName: string
}

export class ResellerSignup extends React.Component<Props, StateProps> {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    saving: false,
    password: '',
    confirmPassword: '',
    website: '',
    currency: '',
    gst: '',
    businessName: '',
    selectedRegion: '',
    selectedRegionCode: '',
    sendSms: false,
    sendMail: false,
    terms: false,
    loading: false,
    visible: false,
    bannerSelected: 0,
    changedBanner: false,
    fileName: ''
  }
  componentDidMount() {
    if (window) {
      window.scrollTo(0, 0)
    }
  }
  handleInputChange = (evt: any) => {
    const {
      currentTarget: { value, id }
    } = evt
    evt.persist()
    this.setState({ [id]: value } as any)
  }
  handleChangeCurrency = (value: string) => {
    if (value) {
      this.setState({
        currency: value,
        selectedRegion: '',
        selectedRegionCode: '',
      })
    }
  }
  login = (user: UserType) => {
    const { saveUserSession, client } = this.props
    saveUserSession(user, client)
  }
  handleCheckChange = ({ target: { name, checked } }: CheckboxChangeEvent) => {
    if (!!name) {
      this.setState({ [name]: checked } as any)
    }
  }
  handleRegionChange = (value: any, regionCode: string) => {
    this.setState({
      selectedRegion: value,
      selectedRegionCode: regionCode
    })
  }
  uploadFile = (event: UploadChangeParam) => {
    const { file } = event
    this.setState({ loading: true })
    uploadFileAction(file).then((fileName) => {
      this.setState({ loading: false, fileName })
    })
  }
  handleSetBanner = (event: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { id }
    } = event
    this.setState({ bannerSelected: Number(id), changedBanner: true })
  }
  handlePromptCurrency = () => {
    const { intl: { formatMessage } } = this.props
    confirm({
      title: (
        <ModalTitle>
          {formatMessage(messages.advertisement)}
        </ModalTitle>
      ),
      icon: ' ',
      width: 512,
      okText: formatMessage(messages.yes),
      okButtonProps: {
        style: okButtonStyles
      },
      cancelText: formatMessage(messages.changeSelection),
      onOk: () => {
        this.handleSignUp(null, true)
      },
      content: (
        <InfoText
          dangerouslySetInnerHTML={{
            __html: formatMessage(messages.currencyDesc)
          }} />
      )
    })
  }
  setFormVisible = () => {
    this.setState({ visible: true })
  }
  requestClose = () => {
    this.setState({ visible: false })
  }
  beforeUpload = (file: any) => {
    const { intl: { formatMessage } } = this.props
    const isLt2M = file.size / 1024 / 1024 < 20
    if (!isLt2M) {
      AntdMessage.error(formatMessage(messages.sizeError))
    }
    return isLt2M
  }
  render() {
    const {
      history,
      intl,
      user
    } = this.props
    const {
      loading,
      firstName,
      lastName,
      gst,
      bannerSelected,
      changedBanner,
      phone,
      businessName,
      selectedRegion,
      selectedRegionCode,
      saving,
      email,
      password,
      confirmPassword,
      website,
      currency,
      visible,
      // sendSms,
      sendMail,
      terms,
      fileName
    } = this.state
    const { formatMessage } = intl
    const file = fileName ? getFileWithExtension(fileName) : ''
    return (
      <Layout {...{ intl, history }} style={layoutStyle}>
        <TopSection>
          <TopDiv>
            <Title>
              {formatMessage(messages.title)}
            </Title>
          </TopDiv>
          <TopDiv>
            <FeatureBox>
              <FeatureTitle dangerouslySetInnerHTML={{
                __html: formatMessage(messages.yourKit)
              }} />
              <FeatureImage src={yourKitImage} />
              <FeatureDesc dangerouslySetInnerHTML={{
                __html: formatMessage(messages.yourKitDesc)
              }} />
              <LearnMore id="0" onClick={this.handleSetBanner}>{formatMessage(messages.learnMore)}</LearnMore>
            </FeatureBox>
            <MediaQuery maxWidth={767}>
              {(matches) => matches && bannerSelected === 0 && changedBanner &&
                <BannerBack>
                  <HalfImage src={shopImage} />
                  <HalfDiv>
                    <BannerTitle dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.yourKit)
                    }} />
                    <BannerDescription dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.kitFeatures)
                    }} />
                    <BannerLogos>
                      <BannerLogo src={designLabWhite} />
                      <BannerLogo src={proDesignWhite} />
                    </BannerLogos>
                  </HalfDiv>
                </BannerBack>
              }
            </MediaQuery>
            <FeatureBox>
              <ImageTitle src={directShip} />
              <FeatureImage large={true} src={directShipSteps} />
              <FeatureDesc dangerouslySetInnerHTML={{
                __html: formatMessage(messages.directDesc)
              }} />
              <LearnMore id="1" onClick={this.handleSetBanner}>{formatMessage(messages.learnMore)}</LearnMore>
            </FeatureBox>
            <MediaQuery maxWidth={767}>
              {(matches) => matches && bannerSelected === 1 &&
                <BannerBack>
                  <HalfDiv>
                    <BannerLogo large={true} src={directShipWhite} />
                    <BannerDescription dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.directFeatures)
                    }} />
                    <BannerLogos>
                      <BannerFooter dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.easyConvenient)
                      }} />
                    </BannerLogos>
                  </HalfDiv>
                  <HalfImage src={resellerGuy} />
                </BannerBack>
              }
            </MediaQuery>
            <FeatureBox>
              <ImageTitle src={onDemandLogo} />
              <FeatureImage src={onDemandDelivery} />
              <FeatureDesc dangerouslySetInnerHTML={{
                __html: formatMessage(messages.onDemandDesc)
              }} />
              <LearnMore id="2" onClick={this.handleSetBanner}>{formatMessage(messages.learnMore)}</LearnMore>
            </FeatureBox>
            <MediaQuery maxWidth={767}>
              {(matches) => matches && bannerSelected === 2 &&
                <BannerBack>
                  <FullDiv>
                    <BigTitle>{formatMessage(messages.justWhatYouNeed)}</BigTitle>
                    <FeatureImage large={true} src={onDemandLogoMain} />
                    <MiddleText dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.buildingDesc)
                    }} />
                    <BannerCheckList dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.buldingCheckList)
                    }} />
                  </FullDiv>
                </BannerBack>
              }
            </MediaQuery>
          </TopDiv>
          <MediaQuery minWidth={768}>
            {(matches) => matches &&
              <BannerSection>
                {bannerSelected === 0 &&
                  <BannerBack>
                    <HalfImage src={shopImage} />
                    <HalfDiv>
                      <BannerTitle dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.yourKit)
                      }} />
                      <BannerDescription dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.kitFeatures)
                      }} />
                      <BannerLogos>
                        <BannerLogo src={designLabWhite} />
                        <BannerLogo src={proDesignWhite} />
                      </BannerLogos>
                    </HalfDiv>
                  </BannerBack>
                }
                {bannerSelected === 1 &&
                  <BannerBack>
                    <HalfDiv>
                      <BannerLogo large={true} src={directShipWhite} />
                      <BannerDescription dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.directFeatures)
                      }} />
                      <BannerLogos>
                        <BannerFooter dangerouslySetInnerHTML={{
                          __html: formatMessage(messages.easyConvenient)
                        }} />
                      </BannerLogos>
                    </HalfDiv>
                    <HalfImage src={resellerGuy} />
                  </BannerBack>
                }
                {bannerSelected === 2 &&
                  <BannerBack>
                    <FullDiv>
                      <BigTitle>{formatMessage(messages.justWhatYouNeed)}</BigTitle>
                      <FeatureImage large={true} src={onDemandLogoMain} />
                      <MiddleText dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.buildingDesc)
                      }} />
                      <BannerCheckList dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.buldingCheckList)
                      }} />
                    </FullDiv>
                  </BannerBack>
                }
              </BannerSection>
            }
          </MediaQuery>
        </TopSection>
        {!user && <Container>
          {saving &&
            <SavingContainer>
              <Spin />
            </SavingContainer>
          }
          <LoginLabel onClick={this.setFormVisible}>
            <FormattedMessage {...messages.signupTitle} />
          </LoginLabel>
          <Signup {...{ visible }}>
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
                    id="firstName"
                    placeholder={formatMessage(messages.firstName)}
                    value={firstName}
                    onChange={this.handleInputChange}
                  />
                </InputDiv>
                <InputDiv>
                  <Label>
                    <FormattedMessage {...messages.lastName} />
                    <RequiredSymbol>*</RequiredSymbol>
                  </Label>
                  <StyledInput
                    id="lastName"
                    placeholder={formatMessage(messages.lastName)}
                    value={lastName}
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
                  <PhoneInput
                    country={'us'}
                    value={phone}
                    onChange={value => {
                      this.handleInputChange({ currentTarget: { id: 'phone', value } })
                    }}
                    inputProps={{ autoComplete: 'jv2' }}
                    inputStyle={{ borderRadius: 0 }}
                    copyNumbersOnly={false}
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
                    value={password}
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
                    value={confirmPassword}
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
                    id="website"
                    placeholder={formatMessage(messages.website)}
                    value={website}
                    onChange={this.handleInputChange}
                  />
                </InputDiv>
                <InputDiv>
                  <Label>
                    <FormattedMessage {...messages.businessName} />
                    <RequiredSymbol>*</RequiredSymbol>
                  </Label>
                  <StyledInput
                    id="businessName"
                    placeholder={formatMessage(messages.businessName)}
                    value={businessName}
                    onChange={this.handleInputChange}
                  />
                </InputDiv>
              </InputRow>
              <InputRow>
                <InputDiv>
                  <Label>
                    <FormattedMessage {...messages.stateProvince} />
                    <RequiredSymbol>*</RequiredSymbol>
                  </Label>
                  <RegionSelect
                    {...{ formatMessage }}
                    disabled={!currency}
                    reseller={true}
                    country={currency ? countryCodes[currency] : ''}
                    countryName={currency ? countryNames[currency] : ''}
                    region={
                      selectedRegion
                        ? `${selectedRegion}-${selectedRegionCode}`
                        : undefined
                    }
                    handleRegionChange={this.handleRegionChange}
                  />
                </InputDiv>
                <InputDiv>
                  <Label>
                    <FormattedMessage {...messages.billingCountry} />
                    <RequiredSymbol>*</RequiredSymbol>
                  </Label>
                  <BillingSelect
                    value={currency}
                    onChange={this.handleChangeCurrency}
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
                    checked={sendMail}
                    name="sendMail"
                    onChange={this.handleCheckChange}
                  >
                    <FormattedMessage {...messages.sendMail} />
                  </CheckboxStyled>
                  {/* <CheckboxStyled
                    checked={sendSms}
                    name="sendSms"
                    onChange={this.handleCheckChange}
                  >
                    <FormattedMessage {...messages.sendSms} />
                  </CheckboxStyled> */}
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
            {currency === US_CURRENCY &&
              <StyledUpload
                listType="picture-card"
                className="avatar-uploader"
                customRequest={this.uploadFile}
                disabled={loading}
                showUploadList={false}
                beforeUpload={this.beforeUpload}
              >
                <UploadButton>
                  {loading ?
                    <LoadingContainer>
                      <Spin size="small" />
                    </LoadingContainer> :
                    <>
                      <StyledIcon type="upload" />
                      <FormattedMessage {...messages.uploadCertificate} />
                    </>
                  }
                </UploadButton>
              </StyledUpload>
            }
            {currency === CA_CURRENCY &&
              <GSTInput>
                <Label>
                  <FormattedMessage {...messages.gstLabel} />
                </Label>
                <StyledInput
                  id="gst"
                  placeholder={formatMessage(messages.gstLabel)}
                  value={gst}
                  onChange={this.handleInputChange}
                />
              </GSTInput>
            }
            {!!file &&
              <FileLabel>
                <Clip type="paper-clip" />
                <FileName>
                  {file}
                </FileName>
              </FileLabel>
            }
            {!!currency &&
              <TitleDesc
                dangerouslySetInnerHTML={{
                  __html: formatMessage(messages.reviewText)
                }}
              />
            }
            <TermsCheckbox
              checked={terms}
              name="terms"
              onChange={this.handleCheckChange}
            >
              <FormattedMessage {...messages.termsAndConditions} />
            </TermsCheckbox>
            <ButtonsContainer>
              <SaveButton disabled={!terms} onClick={this.handleSignUp}>
                <FormattedMessage {...messages.create} />
              </SaveButton>
              <CancelButton onClick={this.requestClose}>
                <FormattedMessage {...messages.cancel} />
              </CancelButton>
            </ButtonsContainer>
          </Signup>
        </Container>}
      </Layout>
    )
  }
  clearState = () => {
    this.setState({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      saving: false,
      confirmPassword: '',
      website: '',
      currency: '',
      sendSms: false,
      sendMail: false,
      gst: '',
      businessName: '',
      selectedRegion: '',
      selectedRegionCode: '',
      terms: false,
      loading: false,
      fileName: ''
    })
  }
  handleSignUp = async (evt: React.FormEvent<HTMLInputElement>, ignoreCurrency?: boolean) => {
    const {
      firstName,
      lastName,
      email,
      fileName,
      password,
      website,
      sendSms,
      gst,
      businessName,
      selectedRegion,
      sendMail,
      phone,
      currency,
      confirmPassword
    } = this.state
    const {
      signUpUser,
      history,
      intl: { formatMessage },
      initialCountryCode = ''
    } = this.props
    if (password.length < 8) {
      message.error(formatMessage(messages.passwordLengthError))
      return
    }
    if (password !== confirmPassword) {
      message.error(formatMessage(messages.passwordLengthError))
    }
    if (!firstName || !lastName || !email || !password || !confirmPassword || !phone || !currency
      || !website || !businessName || !selectedRegion
      || (currency === US_CURRENCY && !fileName) || (currency === CA_CURRENCY && !gst)
    ) {
      message.error(formatMessage(messages.requiredFieldsError))
      return
    }
    if ((
      (currency === US_CURRENCY && initialCountryCode.toUpperCase() !== US_COUNTRY) ||
      (currency === CA_CURRENCY && initialCountryCode.toUpperCase() !== CA_COUNTRY)
    ) && !ignoreCurrency
    ) {
      this.handlePromptCurrency()
      return
    }
    if (!validateEmail(email.toLowerCase())) {
      message.error(formatMessage(messages.badFormat))
      return
    }
    this.setState({ saving: true })
    const user = {
      email: email.toLowerCase(),
      first_name: firstName,
      last_name: lastName,
      password,
      newsletter_subscribed: false,
      countryCode: initialCountryCode
    }
    const reseller = {
      website,
      currency,
      gst,
      sendSms,
      businessName,
      selectedRegion,
      sendMail,
      fileName,
      phone
    }

    try {
      const response = await signUpUser({ variables: { user, reseller } })
      const data = get(response, 'data.signUp', false)
      if (data) {
        const { user: userResponse, token } = data || {}
        const { shortId, name, lastName: lastNameResponse, email: emailResponse, administrator } = userResponse || {}
        const userData = {
          id: shortId,
          token,
          name,
          lastName: lastNameResponse,
          email: emailResponse,
          administrator
        }
        message.success(formatMessage(messages.welcomeMessage, { name }))
        window.dataLayer.push({ event: NEW_USER, label: 'Form Sign Up' })
        this.login(userData)
      }
      history.replace('/account?option=resellerAbout')
    } catch (error) {
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
    } finally {
      this.clearState()
    }
  }
}

const mapStateToProps = (state: any) => {
  const langProps = state.get('languageProvider').toJS()
  const app = state.get('app').toJS()
  return {
    ...langProps,
    ...app,
  }
}

const loginEnhance = compose(
  injectIntl,
  withApollo,
  connect(mapStateToProps, { ...mainLayoutActions }),
  createUser
)(ResellerSignup)
export default loginEnhance
