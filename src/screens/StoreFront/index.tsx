/**
 * StoreFront Screen - Created by gustavomedina on 11/04/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'
import get from 'lodash/get'
import * as thunkActions from './thunkActions'
import * as storeFrontActions from './actions'
import { isPhoneNumber } from '../../utils/utilsFiles'
import { QueryProps, UserType, ContactInformation } from '../../types/common'
import { Container } from './styledComponents'
import TeamsLayout from '../../components/MainLayout'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import StoreFrontContent from '../../components/StoreFrontContent'
import { getSessionCode } from './thunkActions'
import Helmet from 'react-helmet'

interface Params extends QueryProps {
  teamStoreId: String
  passCode: String
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  openShare: boolean
  history: any
  openPassCode: boolean
  openEmailContact: boolean
  passCode: string
  emailContact: string
  emailMessage: string
  sendMessageLoading: boolean
  currentCurrency: string
  user: UserType
  contactInfo: ContactInformation
  skip: number
  pageNumber: number
  teamStoreQuery: (variables: {}) => void
  openShareModalAction: (open: boolean, id?: string) => void
  openQuickView: (id: number, yotpoId: string | null) => void
  openPassCodeDialogAction: (open: boolean) => void
  setPassCodeAction: (passCode: string) => void
  openEmailContactDialogAction: (open: boolean) => void
  setEmailContactAction: (email: string) => void
  setEmailMessageAction: (message: string) => void
  sendMessageLoadingAction: (loading: boolean) => void
  setContactFieldAction: (field: string, value: string) => void
  setPageAction: (skip: number, pageNumber: number) => void
}

export class StoreFront extends React.Component<Props, {}> {
  state = {
    showDetails: true,
    showSpecs: true
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  getData = async (params: Params) => {
    const { teamStoreQuery } = this.props
    const response = await teamStoreQuery({
      variables: { teamStoreId: params.teamStoreId, passCode: params.passCode }
    })
    const data = get(response, 'data.getTeamStore', false)

    if (data) {
      return data
    }

    return {}
  }

  closePassCodeModal = () => {
    const { openPassCodeDialogAction } = this.props
    openPassCodeDialogAction(false)
  }

  handleOpenPassCode = () => {
    const { openPassCodeDialogAction } = this.props
    openPassCodeDialogAction(true)
  }
  handleOnContactFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setContactFieldAction } = this.props
    const {
      currentTarget: { id, value }
    } = event

    if (id === 'phone' && !isPhoneNumber(value) && value !== '') {
      return
    }
    setContactFieldAction(id, value)
  }

  render() {
    const {
      intl,
      openShare,
      history,
      setPassCodeAction,
      passCode,
      openEmailContact,
      emailContact,
      emailMessage,
      openQuickView,
      setEmailContactAction,
      setEmailMessageAction,
      sendMessageLoading,
      sendMessageLoadingAction,
      openEmailContactDialogAction,
      openShareModalAction,
      openPassCodeDialogAction,
      currentCurrency,
      user,
      contactInfo,
      skip,
      pageNumber,
      setPageAction
    } = this.props
    const {
      location: { search }
    } = this.props
    const queryParams = queryString.parse(search)
    const storeId = queryParams ? queryParams.storeId || '' : ''
    const titleProp = queryParams ? queryParams.titleProp : ''
    const bannerProp = queryParams ? queryParams.bannerProp : ''
    const storedCode = getSessionCode(storeId)
    // tslint:disable-next-line: max-line-length
    const shareStoreUrl = `https://designlab.jakroo.com/store-front?storeId=${storeId}&titleProp=${titleProp}&bannerProp=${bannerProp}`
    return (
      <TeamsLayout teamStoresHeader={true} {...{ intl, history }}>
        <Container>
          <Helmet
            meta={[
              { property: 'og:title', content: titleProp ? decodeURIComponent(titleProp) : 'My Team Store' },
              { property: 'og:description', content: 'Visit my Team Store on Jakroo'},
              { property: 'og:url', content: shareStoreUrl },
              { property: 'og:type', content: 'article' },
              {
                property: 'og:image',
                content: bannerProp ? bannerProp 
                : 'https://designlab.jakroo.com/static/media/teamStoreSearch.9279d162.jpg'
              }
            ]}
            title={titleProp}
          />
          <StoreFrontContent
            formatMessage={intl.formatMessage}
            openQuickViewAction={openQuickView}
            openEmailContactDialogAction={openEmailContactDialogAction}
            openShareModalAction={openShareModalAction}
            openShare={openShare}
            teamStoreId={storeId}
            passCode={passCode || storedCode}
            setOpenPassCodeDialog={openPassCodeDialogAction}
            openEmailContact={openEmailContact}
            emailContact={emailContact}
            emailMessage={emailMessage}
            sendMessageLoading={sendMessageLoading}
            setEmailContactAction={setEmailContactAction}
            setEmailMessageAction={setEmailMessageAction}
            sendMessageLoadingAction={sendMessageLoadingAction}
            setPassCodeAction={setPassCodeAction}
            handleInputChange={this.handleOnContactFieldChange}
            setPage={setPageAction}
            {...{
              history,
              currentCurrency,
              user,
              contactInfo,
              pageNumber,
              skip
            }}
          />
        </Container>
      </TeamsLayout>
    )
  }
}

const mapStateToProps = (state: any) => {
  const storeFrontPops = state.get('storeFront').toJS()
  const langProps = state.get('languageProvider').toJS()
  return { ...storeFrontPops, ...langProps, user: state.get('app').get('user') }
}

const StoreFrontEnhance = compose(
  injectIntl,
  connect(
    mapStateToProps,
    {
      ...storeFrontActions,
      ...thunkActions,
      openQuickView: openQuickViewAction
    }
  )
)(StoreFront)

export default StoreFrontEnhance
