/**
 * ResellerAbout Component - Created by Jesús Apodaca on 30/06/20.
 */

import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import MessageBar from 'antd/lib/message'
import Spin from 'antd/lib/spin'
import * as ProfileApiActions from './api'
import * as ProfileSettingsActions from './actions'
import { PENDING, APPROVED } from '../../constants'
import {
  profileSettingsQuery,
  sendResellerMutation,
} from './data'
import messages from './messages'
import {
  Container,
  Title,
  LoadingErrorContainer,
  ErrorMessage,
  LoadingContainer,
  StatusLabel,
  HeaderSection,
  InfoSection,
  TextSection,
  TitlePay,
  BodyPay,
  Slogan,
  PayDayImage,
  HowItWorks,
  IconLabel,
  SmallIcon,
  Label,
  Icons,
  FAQSection,
  FAQBody,
  AboutBody,
  AffiliateDetailsSection,
  PayDayImageMobile,
  Arrow,
  CarousselDiv,
  DesktopIcons,
} from './styledComponents'
import PaydayJersey from '../../assets/payday_jersey.png'
import PaydayPaypal from '../../assets/payday_paypal.png'
import PaydayShare from '../../assets/payday_share.png'
import PaydayStore from '../../assets/payday_store.png'
import leftArrow from '../../assets/leftarrow.svg'
import rightArrow from '../../assets/arrow.svg'
import LaptopGuy from '../../assets/laptop_guy.jpg'
import LaptopGuyMobile from '../../assets/laptop_guy_mobile.jpg'
import AffiliateModal from '../AffiliateModal'
import ResellerOptions from '../ResellerOptions'
import {
  QueryProps,
  IProfileSettings,
  UploadFile,
  Message,
  Reseller,
} from '../../types/common'
import get from 'lodash/get'
import { US_CURRENCY, US_COUNTRY, CA_CURRENCY, CA_COUNTRY } from './constants'
import ProductInfo from '../ProductInfo'

const arrowLeft = <Arrow src={leftArrow} />
const arrowRight = <Arrow src={rightArrow} />

const settings = {
  dots: false,
  speed: 2000,
  autoplay: true,
  arrows: true,
  draggable: true,
  centerMode: false,
  prevArrow: arrowLeft,
  nextArrow: arrowRight,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const carousel = [
  {
    icon: PaydayJersey,
    label: 'createDesigns'
  },
  {
    icon: PaydayStore,
    label: 'buildStore'
  },
  {
    icon: PaydayShare,
    label: 'shareStore'
  },
  {
    icon: PaydayPaypal,
    label: 'getPaid'
  }
]

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
}

interface StateProps {
  showMuch: boolean
  showWhen: boolean
  showCani: boolean
  showCosts: boolean
  showReturns: boolean
  showEarn: boolean
}

interface Props {
  profileData: ProfileData
  paypalCurrency: string
  paypalCheck: boolean
  loading: boolean
  openModal: boolean
  file: string
  history: History
  initialCountryCode: string
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  // api actions
  uploadFileAction: (file: UploadFile) => void
  // redux actions
  successRequestAction: () => void
  setUploadingAction: (value: boolean) => void
  openAffiliate: (value: boolean) => void
  setPaypalCheck: (value: boolean) => void
  setPaypalCurrency: (value: string) => void
  // mutations
  sendResellerRequest: (variables: {}) => Promise<Reseller>
}

class ResellerAbout extends React.Component<Props, StateProps> {
  state = {
    showMuch: false,
    showCani: false,
    showWhen: false,
    showCosts: false,
    showReturns: false,
    showEarn: false
  }
  render() {
    const {
      formatMessage,
      profileData: { loading, error }
    } = this.props
    if (loading) {
      return (
        <LoadingErrorContainer>
          <Spin />
        </LoadingErrorContainer>
      )
    }
    if (error) {
      return (
        <LoadingErrorContainer>
          <Title>{formatMessage(messages.errorTitle)}</Title>
          <ErrorMessage>{formatMessage(messages.errorMessage)}</ErrorMessage>
        </LoadingErrorContainer>
      )
    }
    const {
      profileData,
      setPaypalCurrency,
      setPaypalCheck,
      openAffiliate,
      uploadFileAction,
      file,
      history,
      loading: loadingFile,
      paypalCheck,
      paypalCurrency,
    } = this.props

    const {
      showMuch,
      showCani,
      showCosts,
      showEarn,
      showReturns,
      showWhen,
    } = this.state

    const { status } = get(profileData, 'profileData.reseller', {})
    const carouselElements = carousel.map(({ icon, label }, index) =>
      <div key={index}>
        <IconLabel>
          <SmallIcon src={icon} />
          <Label>
            {formatMessage(messages[label])}
          </Label>
        </IconLabel>
      </div>
    )
    return (
      <Container>
        <HeaderSection>
          <InfoSection>
            <TextSection>
              <TitlePay>
                {formatMessage(messages.titlePay)}
              </TitlePay>
              <PayDayImageMobile src={LaptopGuyMobile} />
              <BodyPay
                dangerouslySetInnerHTML={{
                  __html: formatMessage(messages.bodyPay)
                }}
              />
              <Slogan>
                {formatMessage(messages.slogan)}
              </Slogan>
            </TextSection>
            <PayDayImage src={LaptopGuy} />
          </InfoSection>
        </HeaderSection>
        {loadingFile &&
          <LoadingContainer>
            <Spin />
          </LoadingContainer>
        }
        {status === PENDING &&
          <StatusLabel>
            {formatMessage(messages.pending)}
          </StatusLabel>
        }
        {!status &&
          <AffiliateModal
            {...{
              history,
              paypalCheck,
              setPaypalCheck,
              formatMessage,
              file,
              openAffiliate,
              uploadFileAction,
              paypalCurrency,
              setPaypalCurrency
            }}
            sendRequest={this.sendRequest}
            open={true}
          />
        }
        {status === APPROVED &&
          <AffiliateDetailsSection>
            <ResellerOptions {...{ history, formatMessage }} onlyDetails={true} />
          </AffiliateDetailsSection>
        }
        <AboutBody>
          <HowItWorks>
            <Title>
              {formatMessage(messages.howItWorks)}
            </Title>
            <Icons>
              <CarousselDiv {...settings}>
                {carouselElements}
              </CarousselDiv>
              <DesktopIcons>
                {carouselElements}
              </DesktopIcons>
            </Icons>
          </HowItWorks>
          <FAQSection>
            <Title>
              {formatMessage(messages.faqTitle)}
            </Title>
            <FAQBody>
              <ProductInfo
                id="Earn"
                titleWidth="705px"
                title={formatMessage(messages.howEarn)}
                showContent={showEarn}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.howEarnDesc)
                  }}
                />
              </ProductInfo>
              <ProductInfo
                id="Much"
                title={formatMessage(messages.howMuch)}
                showContent={showMuch}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.howMuchDesc)
                  }}
                />
              </ProductInfo>
              <ProductInfo
                id="When"
                title={formatMessage(messages.whenPaid)}
                showContent={showWhen}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.whenPaidDesc)
                  }}
                />
              </ProductInfo>
              <ProductInfo
                id="Cani"
                title={formatMessage(messages.howGetPaid)}
                showContent={showCani}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.howGetPaidDesc)
                  }}
                />
              </ProductInfo>
              <ProductInfo
                id="Costs"
                title={formatMessage(messages.costsInfo)}
                showContent={showCosts}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.costsInfoDesc)
                  }}
                />
              </ProductInfo>
              <ProductInfo
                id="Returns"
                title={formatMessage(messages.returns)}
                showContent={showReturns}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.returnsDesc)
                  }}
                />
              </ProductInfo>
            </FAQBody>
          </FAQSection>
        </AboutBody>
      </Container>
    )
  }

  toggleProductInfo = (id: string) => {
    const stateValue = this.state[`show${id}`]
    this.setState({ [`show${id}`]: !stateValue } as any)
  }

  sendRequest = async () => {
    const {
      setUploadingAction,
      initialCountryCode = '',
      successRequestAction,
      paypalCurrency: currency,
      file,
      formatMessage,
      sendResellerRequest
    } = this.props
    try {
      if (
        (currency === US_CURRENCY && initialCountryCode.toUpperCase() === US_COUNTRY) ||
        (currency === CA_CURRENCY && initialCountryCode.toUpperCase() === CA_COUNTRY)
      ) {
        setUploadingAction(true)
        await sendResellerRequest({
          variables: {
            currency,
            file
          },
          update: (store: any) => {
            const profileDataStore = store.readQuery({
              query: profileSettingsQuery
            })
            const resellerData = get(profileDataStore, 'profileData.reseller', {})
            resellerData.status = PENDING
            store.writeQuery({
              query: profileSettingsQuery,
              data: profileDataStore
            })
          }
        })
        successRequestAction()
        MessageBar.success(formatMessage(messages.success), 4)
      } else {
        MessageBar.error(formatMessage(messages.wrongCurrency, { initialCountryCode }), 5)
      }
    } catch (error) {
      setUploadingAction(false)
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      MessageBar.error(errorMessage, 5)
    }
  }
}

const mapStateToProps = (state: any) => {
  const resellerAbout = state.get('resellerAbout').toJS()
  const app = state.get('app').toJS()
  return {
    ...resellerAbout,
    ...app,
  }
}

const ResellerAboutEnhance = compose(
  graphql(profileSettingsQuery, {
    options: {
      fetchPolicy: 'network-only'
    },
    name: 'profileData'
  }),
  sendResellerMutation,
  connect(
    mapStateToProps,
    {
      ...ProfileSettingsActions,
      ...ProfileApiActions
    }
  )
)(ResellerAbout)

export default ResellerAboutEnhance
