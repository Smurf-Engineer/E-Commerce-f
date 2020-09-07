/**
 * ResellerOptions Component - Created by Jesús Apodaca on 26/05/20.
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
  PayIcon,
} from './styledComponents'
import Payday from '../../assets/jakroo_payday.png'
import ResellerDetails from './ResellerDetails'
import AffiliateModal from '../AffiliateModal'
import {
  QueryProps,
  IProfileSettings,
  Message,
  Reseller,
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
  onlyDetails: boolean
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
  linkPaypalAccount: (variables: {}) => Promise<Reseller>
}

class ResellerOptions extends React.Component<Props, {}> {
  componentDidUpdate() {
    const { history } = this.props
    const { location: { search } } = history
    const { code } = queryString.parse(search)
    if (code) {
      this.sendCode(code)
      history.replace('/account?option=resellerAbout')
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
      onlyDetails,
      history,
      openModal,
    } = this.props
    const reseller = get(profileData, 'profileData.reseller', {})
    const { status, currency, region, paypalAccount, comission, file, activatedAt } = reseller
    return (
      <Container {...{ onlyDetails }}>
        {!onlyDetails && <PayIcon src={Payday} />}
        {loading &&
          <LoadingContainer>
            <Spin />
          </LoadingContainer>
        }{status ?
          <ResellerDetails
            {...{
              formatMessage,
              loading,
              comission,
              activatedAt,
              onlyDetails,
              currentPage,
              onChangePage,
              paypalAccount,
              file,
              currency,
              region,
              openAffiliate,
              history,
              status
            }}
          /> :
          <LoadingErrorContainer>
            <ErrorMessage>{formatMessage(messages.notAvailable)}</ErrorMessage>
          </LoadingErrorContainer>
        }
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
    const redirect = encodeURIComponent(`${config.baseUrl}account?option=resellerAbout`)
    const client = `flowEntry=static&client_id=${config.paypalClientIdUS}`
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
        update: (store: any, responseData: Reseller) => {
          const newAccount = get(responseData, 'data.linkPaypalAccount.paypalAccount')
          const profileData = store.readQuery({
            query: profileSettingsQuery
          })
          const resellerData = get(profileData, 'profileData.reseller', {})
          resellerData.paypalAccount = newAccount
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

const mapStateToProps = (state: any) => state.get('resellerOptions').toJS()

const ResellerOptionsEnhance = compose(
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
)(ResellerOptions)

export default ResellerOptionsEnhance
