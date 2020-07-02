/**
 * AffiliateAbout Component - Created by Jesús Apodaca on 30/06/20.
 */

import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import MessageBar from 'antd/lib/message'
import Spin from 'antd/lib/spin'
import * as ProfileApiActions from './api'
import * as ProfileSettingsActions from './actions'
import { PENDING } from '../../constants'
import {
  profileSettingsQuery,
  sendAffiliateMutation,
} from './data'
import messages from './messages'
import {
  Container,
  Title,
  LoadingErrorContainer,
  ErrorMessage,
  SwitchWrapper,
  StyledSwitch,
  LoadingContainer,
  StatusLabel,
  AccountLabel,
  HeaderSection,
  PayDayIcon,
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
} from './styledComponents'
import Payday from '../../assets/jakroo_payday.png'
import PaydayJersey from '../../assets/payday_jersey.png'
import PaydayPaypal from '../../assets/payday_paypal.png'
import PaydayShare from '../../assets/payday_share.png'
import PaydayStore from '../../assets/payday_store.png'
import LaptopGuy from '../../assets/laptop_guy.jpg'
import AffiliateModal from '../AffiliateModal'
import {
  QueryProps,
  IProfileSettings,
  UploadFile,
  Affiliate,
  Message,
} from '../../types/common'
import get from 'lodash/get'
import { US_CURRENCY, US_COUNTRY, CA_CURRENCY, CA_COUNTRY } from './constants'

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
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
  sendAffiliateRequest: (variables: {}) => Promise<Affiliate>
}

class AffiliateAbout extends React.Component<Props, {}> {
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
      openModal,
      loading: loadingFile,
      paypalCheck,
      paypalCurrency,
    } = this.props

    const affiliate = get(profileData, 'profileData.affiliate', {})

    const { status, paypalAccount } = affiliate
    return (
      <Container>
        <HeaderSection>
          <PayDayIcon src={Payday} />
          <InfoSection>
            <TextSection>
              <TitlePay>
                {formatMessage(messages.titlePay)}
              </TitlePay>
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
        <SwitchWrapper>
          {formatMessage(messages.makeAffiliate)}
          <StyledSwitch disabled={!!status} checked={openModal || !!status} onChange={openAffiliate} />
        </SwitchWrapper>
        {status === PENDING &&
          <StatusLabel>
            {formatMessage(messages.pending)}
          </StatusLabel>
        }
        {!!paypalAccount &&
          <AccountLabel>
            {formatMessage(messages.linkedTo, { paypalAccount })}
          </AccountLabel>
        }
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
          open={openModal}
        />
        <AboutBody>
          <HowItWorks>
            <Title>
              {formatMessage(messages.howItWorks)}
            </Title>
            <Icons>
              <IconLabel>
                <SmallIcon src={PaydayJersey} />
                <Label>
                  {formatMessage(messages.createDesigns)}
                </Label>
              </IconLabel>
              <IconLabel>
                <SmallIcon src={PaydayStore} />
                <Label>
                  {formatMessage(messages.buildStore)}
                </Label>
              </IconLabel>
              <IconLabel>
                <SmallIcon src={PaydayShare} />
                <Label>
                  {formatMessage(messages.shareStore)}
                </Label>
              </IconLabel>
              <IconLabel>
                <SmallIcon src={PaydayPaypal} />
                <Label>
                  {formatMessage(messages.getPaid)}
                </Label>
              </IconLabel>
            </Icons>
          </HowItWorks>
          <FAQSection>
            <Title>
              {formatMessage(messages.faqTitle)}
            </Title>
            <FAQBody
              dangerouslySetInnerHTML={{
                __html: formatMessage(messages.faqBody)
              }}
            />
          </FAQSection>
        </AboutBody>
      </Container>
    )
  }

  sendRequest = async () => {
    const {
      setUploadingAction,
      initialCountryCode,
      successRequestAction,
      paypalCurrency: currency,
      file,
      formatMessage,
      sendAffiliateRequest
    } = this.props
    try {
      if (
        (currency === US_CURRENCY && initialCountryCode === US_COUNTRY) ||
        (currency === CA_CURRENCY && initialCountryCode === CA_COUNTRY)
      ) {
        setUploadingAction(true)
        await sendAffiliateRequest({
          variables: {
            currency,
            file
          },
          update: (store: any) => {
            const profileDataStore = store.readQuery({
              query: profileSettingsQuery
            })
            const affiliateData = get(profileDataStore, 'profileData.affiliate', {})
            affiliateData.status = PENDING
            store.writeQuery({
              query: profileSettingsQuery,
              data: profileDataStore
            })
          }
        })
        successRequestAction()
        MessageBar.success(formatMessage(messages.success), 4)
      } else {
        MessageBar.error(formatMessage(messages.wrongCurrency), 5)
      }
    } catch (error) {
      setUploadingAction(false)
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      MessageBar.error(errorMessage, 5)
    }
  }
}

const mapStateToProps = (state: any) => {
  const affiliatesAbout = state.get('affiliatesAbout').toJS()
  const app = state.get('app').toJS()
  return {
    ...affiliatesAbout,
    ...app,
  }
}

const AffiliateAboutEnhance = compose(
  graphql(profileSettingsQuery, {
    options: {
      fetchPolicy: 'network-only'
    },
    name: 'profileData'
  }),
  sendAffiliateMutation,
  connect(
    mapStateToProps,
    {
      ...ProfileSettingsActions,
      ...ProfileApiActions
    }
  )
)(AffiliateAbout)

export default AffiliateAboutEnhance
