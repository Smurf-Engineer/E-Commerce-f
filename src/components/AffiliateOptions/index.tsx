/**
 * AffiliateOptions Component - Created by Jesús Apodaca on 26/05/20.
 */

import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import MessageBar from 'antd/lib/message'
import Spin from 'antd/lib/spin'
import queryString from 'query-string'
import * as ProfileSettingsActions from './actions'
import {
  profileSettingsQuery,
  linkPaypalAccountMutation
} from './data'
import messages from './messages'
import {
  Container,
  Title,
  LoadingErrorContainer,
  ErrorMessage,
  LoadingContainer,
} from './styledComponents'
import AffiliateDetails from '../UsersAdmin/AffiliateOptions'
import AffiliateModal from '../AffiliateModal'
import {
  QueryProps,
  IProfileSettings,
  Affiliate,
  Message,
} from '../../types/common'
import get from 'lodash/get'
import config from '../../config'

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
}

interface Props {
  profileData: ProfileData
  currentPage: boolean
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  history: History
  loading: boolean
  link: boolean
  openModal: boolean
  file: string
  // redux actions
  successRequestAction: () => void
  onChangePage: (value: number) => void
  setUploadingAction: (value: boolean) => void
  linkAccount: (value: boolean) => void
  openAffiliate: (value: boolean) => void
  setModalLoadingAction: (loading: boolean) => void
  // mutations
  linkPaypalAccount: (variables: {}) => Promise<Affiliate>
}

class AffiliateOptions extends React.Component<Props, {}> {
  componentDidUpdate() {
    const { history } = this.props
    const { location: { search } } = history
    const { code } = queryString.parse(search)
    if (code) {
      this.sendCode(code)
      history.replace('/account?option=affiliate')
    }
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
      currentPage,
      onChangePage,
      openAffiliate,
      link,
      history,
      openModal,
    } = this.props
    const affiliate = get(profileData, 'profileData.affiliate', {})
    const { status, paypalAccount, comission, file, activatedAt } = affiliate
    return (
      <Container>
        {loading &&
          <LoadingContainer>
            <Spin />
          </LoadingContainer>
        }
        <AffiliateDetails
          {...{
            formatMessage,
            loading,
            comission,
            activatedAt,
            currentPage,
            onChangePage,
            paypalAccount,
            file,
            openAffiliate,
            history,
            status
          }}
        />
        <AffiliateModal
          {...{
            history,
            formatMessage,
            link,
            openAffiliate,
          }}
          link={true}
          linkPaypal={this.linkPaypal}
          open={openModal}
        />
      </Container>
    )
  }

  linkPaypal = () => {
    const redirect = encodeURIComponent(`${config.baseUrl}account?option=affiliate`)
    const client = `flowEntry=static&client_id=${config.paypalClientId}`
    const params = `&scope=openid email https://uri.paypal.com/services/paypalattributes&redirect_uri=${redirect}`
    window.location.href = `${config.paypalBaseUrl}${client}${params}`
  }

  sendCode = async (code: string) => {
    const {
      setUploadingAction,
      formatMessage,
      linkPaypalAccount
    } = this.props
    try {
      setUploadingAction(true)
      await linkPaypalAccount({
        variables: {
          code
        },
        update: (store: any, responseData: Affiliate) => {
          const newAccount = get(responseData, 'data.linkPaypalAccount.paypalAccount')
          const profileData = store.readQuery({
            query: profileSettingsQuery
          })
          const affiliateData = get(profileData, 'profileData.affiliate', {})
          affiliateData.paypalAccount = newAccount
          store.writeQuery({
            query: profileSettingsQuery,
            data: profileData
          })
        }
      })
      setUploadingAction(false)
      MessageBar.success(formatMessage(messages.successLink), 4)
    } catch (error) {
      setUploadingAction(false)
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      MessageBar.error(errorMessage, 5)
    }
  }
}

const mapStateToProps = (state: any) => state.get('affiliateOptions').toJS()

const AffiliateOptionsEnhance = compose(
  graphql(profileSettingsQuery, {
    options: {
      fetchPolicy: 'network-only'
    },
    name: 'profileData'
  }),
  linkPaypalAccountMutation,
  connect(
    mapStateToProps,
    {
      ...ProfileSettingsActions,
    }
  )
)(AffiliateOptions)

export default AffiliateOptionsEnhance
