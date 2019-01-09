/**
 * StoreFront Screen - Created by gustavomedina on 11/04/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'
import get from 'lodash/get'
import { getTeamStoreStatus } from './data'
import { DEFAULT_ROUTE } from '../../constants'
import * as storeFrontActions from './actions'
import { QueryProps } from '../../types/common'
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
  showTeamStores: boolean
  teamStoreQuery: (variables: {}) => void
  openShareModalAction: (open: boolean, id?: string) => void
  openQuickViewAction: (id: number, yotpoId: string | null) => void
  openPassCodeDialogAction: (open: boolean) => void
  setPassCodeAction: (passCode: string) => void
  openEmailContactDialogAction: (open: boolean) => void
  setEmailContactAction: (email: string) => void
  setEmailMessageAction: (message: string) => void
  sendMessageLoadingAction: (loading: boolean) => void
  teamStoreStatus: () => Promise<any>
  setTeamStoreStatusAction: (show: boolean) => void
}

export class StoreFront extends React.Component<Props, {}> {
  state = {
    showDetails: true,
    showSpecs: true
  }
  async componentDidMount() {
    const { teamStoreStatus, setTeamStoreStatusAction } = this.props
    const response = await teamStoreStatus()
    setTeamStoreStatusAction(
      get(response, 'data.getTeamStoreStatus.showTeamStores', false)
    )
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

  handleIngressPassCode = async () => {}

  handleOpenPassCode = () => {
    const { openPassCodeDialogAction } = this.props
    openPassCodeDialogAction(true)
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
      setEmailContactAction,
      setEmailMessageAction,
      sendMessageLoading,
      sendMessageLoadingAction,
      openEmailContactDialogAction,
      openShareModalAction,
      openPassCodeDialogAction,
      showTeamStores
    } = this.props

    const {
      location: { search }
    } = this.props
    const queryParams = queryString.parse(search)

    const storeId = queryParams ? queryParams.storeId || '' : ''

    if (showTeamStores === false) {
      return <Redirect to={DEFAULT_ROUTE} />
    }

    return (
      <TeamsLayout teamStoresHeader={true} {...{ intl, history }}>
        <Container>
          <StoreFrontContent
            formatMessage={intl.formatMessage}
            openQuickViewAction={openQuickViewAction}
            openEmailContactDialogAction={openEmailContactDialogAction}
            openShareModalAction={openShareModalAction}
            openShare={openShare}
            teamStoreId={storeId}
            passCode={passCode}
            setOpenPassCodeDialog={openPassCodeDialogAction}
            openEmailContact={openEmailContact}
            emailContact={emailContact}
            emailMessage={emailMessage}
            sendMessageLoading={sendMessageLoading}
            setEmailContactAction={setEmailContactAction}
            setEmailMessageAction={setEmailMessageAction}
            sendMessageLoadingAction={sendMessageLoadingAction}
            setPassCodeAction={setPassCodeAction}
            {...{ history }}
          />
        </Container>
      </TeamsLayout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('storeFront').toJS()

const StoreFrontEnhance = compose(
  injectIntl,
  getTeamStoreStatus,
  connect(
    mapStateToProps,
    { ...storeFrontActions, openQuickViewAction }
  )
)(StoreFront)

export default StoreFrontEnhance
