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
} from './styledComponents'
import AffiliateModal from '../AffiliateModal'
import {
  QueryProps,
  IProfileSettings,
  UploadFile,
  Affiliate,
  Message,
} from '../../types/common'
import get from 'lodash/get'

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
      </Container>
    )
  }

  sendRequest = async () => {
    const {
      setUploadingAction,
      successRequestAction,
      paypalCurrency: currency,
      file,
      formatMessage,
      sendAffiliateRequest
    } = this.props
    try {
      setUploadingAction(true)
      await sendAffiliateRequest({
        variables: {
          currency,
          file
        },
        update: (store: any) => {
          const profileData = store.readQuery({
            query: profileSettingsQuery
          })
          const affiliateData = get(profileData, 'profileData.affiliate', {})
          affiliateData.status = PENDING
          store.writeQuery({
            query: profileSettingsQuery,
            data: profileData
          })
        }
      })
      successRequestAction()
      MessageBar.success(formatMessage(messages.success), 4)
    } catch (error) {
      setUploadingAction(false)
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      MessageBar.error(errorMessage, 5)
    }
  }
}

const mapStateToProps = (state: any) => state.get('affiliatesAbout').toJS()

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
