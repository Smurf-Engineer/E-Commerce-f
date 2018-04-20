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
import { QueryProps } from '../../types/common'
import { Container } from './styledComponents'
import TeamsLayout from '../../components/MainLayout'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import TeamPassCode from '../../components/TeamPassCode'
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
  teamStoreQuery: (variables: {}) => void
  openShareModalAction: (open: boolean, id?: string) => void
  openQuickViewAction: (id: number, yotpoId: string | null) => void
  openPassCodeDialogAction: (open: boolean) => void
  setPassCodeAction: (passCode: string) => void
  openEmailContactDialogAction: (open: boolean) => void
  setEmailContactAction: (email: string) => void
  setEmailMessageAction: (message: string) => void
  sendMessageLoadingAction: (loading: boolean) => void
}

export class StoreFront extends React.Component<Props, {}> {
  state = {
    showDetails: true,
    showSpecs: true
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
      openPassCode,
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
      openPassCodeDialogAction
    } = this.props
    const { formatMessage } = intl

    const {
      location: { search }
    } = this.props
    const queryParams = queryString.parse(search)

    const storeId = queryParams ? queryParams.storeId || '' : ''

    return (
      <TeamsLayout teamStoresHeader={true} {...{ intl, history }}>
        <Container>
          <StoreFrontContent
            formatMessage={formatMessage}
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
          />
          <TeamPassCode
            open={openPassCode}
            requestClose={this.closePassCodeModal}
            formatMessage={intl.formatMessage}
            setPassCode={setPassCodeAction}
            passCode={passCode}
            handleIngressPassCode={this.handleIngressPassCode}
          />
        </Container>
      </TeamsLayout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('storeFront').toJS()

const StoreFrontEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...storeFrontActions, openQuickViewAction })
)(StoreFront)

export default StoreFrontEnhance
