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
import * as storeFrontActions from './actions'
import { isPhoneNumber } from '../../utils/utilsFiles'
import { QueryProps, UserType, ContactInformation } from '../../types/common'
import { Container } from './styledComponents'
import TeamsLayout from '../../components/MainLayout'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import StoreFrontContent from '../../components/StoreFrontContent'

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
      contactInfo
    } = this.props
    const {
      location: { search }
    } = this.props
    const queryParams = queryString.parse(search)
    const storeId = queryParams ? queryParams.storeId || '' : ''
    let storedCode = ''
    const savedStores = sessionStorage.getItem('savedStores')
    if (savedStores) {
      const storeCodes = JSON.parse(savedStores)
      storedCode = storeCodes[storeId]
    }
    return (
      <TeamsLayout teamStoresHeader={true} {...{ intl, history }}>
        <Container>
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
            {...{ history, currentCurrency, user, contactInfo }}
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
    { ...storeFrontActions, openQuickView: openQuickViewAction }
  )
)(StoreFront)

export default StoreFrontEnhance
