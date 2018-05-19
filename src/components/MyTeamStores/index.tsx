/**
 * MyTeamStores Component - Created by cazarez on 14/05/18.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import Modal from 'antd/lib/modal'
import messages from './messages'
import * as MyTeamStoresActions from './actions'
import { GetTeamMyStoresQuery, DeleteTeamStoreMutation } from './data'
import {
  Container,
  AddTeamStoreButton,
  CreateTeamStoreLegend,
  DeleteConfirmMessage
} from './styledComponents'
import withError from '../../components/WithError'
import withLoading from '../../components/WithLoading'
import {
  QueryProps,
  TeamstoreType,
  TeamstoreResult,
  TeamStoreResultType
} from '../../types/common'
import config from '../../config/index'
import TeamStore from '../../components/TeamStoreItem'
import ShareTeamStore from '../../components/ShareDesignModal'

interface Data extends QueryProps {
  myTeamstores: TeamstoreResult
}

interface Props {
  data: Data
  history: any
  openDeleteModal: boolean
  openShare: boolean
  deleteLoading: boolean
  storeId: string
  formatMessage: (messageDescriptor: any) => string
  deleteTeamStore: (variables: {}) => void
  openDeleteModalAction: (open: boolean, storeId?: string) => void
  deleteLoadingAction: (loading: boolean) => void
  openShareModalAction: (open: boolean, id?: string) => void
  clearReducerAction: () => void
}

export class MyTeamStores extends React.PureComponent<Props, {}> {
  render() {
    const {
      storeId,
      deleteLoading,
      openShare,
      openDeleteModal,
      formatMessage,
      data: {
        myTeamstores: { teamStores }
      }
    } = this.props

    const shareStoreUrl = `${config.baseUrl}store-front?storeId=${storeId}`

    let myTeamstoresList
    if (teamStores) {
      myTeamstoresList = teamStores.map((teamstore, key) => (
        <TeamStore
          name={teamstore.name}
          showNameStore={true}
          image={teamstore.banner || ''}
          withEditButton={true}
          withShareButton={true}
          withDeleteButton={true}
          onEditClick={this.editTeamStore(teamstore.shortId)}
          onDeleteClick={this.toggleDeleteModal(teamstore.shortId)}
          openShareModalAction={this.handleOpenShareModal(teamstore.shortId)}
          {...{ key, formatMessage }}
        />
      ))
    }

    return (
      <Container>
        <AddTeamStoreButton onClick={this.addNewTeamStore}>
          {formatMessage(messages.addTeamstoreLabel)}
        </AddTeamStoreButton>
        <CreateTeamStoreLegend>
          {formatMessage(messages.createTeamStoreText)}
        </CreateTeamStoreLegend>
        <div>{myTeamstoresList}</div>
        <Modal
          title={formatMessage(messages.titleDeleteModal)}
          visible={openDeleteModal}
          maskClosable={false}
          closable={false}
          destroyOnClose={true}
          onCancel={this.toggleDeleteModal()}
          confirmLoading={deleteLoading}
          okText={'Delete'}
          onOk={this.handleDeleteTeamStore}
        >
          <DeleteConfirmMessage>
            {formatMessage(messages.messageDeleteModal)}
          </DeleteConfirmMessage>
        </Modal>
        <ShareTeamStore
          open={openShare}
          modalTitle={formatMessage(messages.shareModalTitle)}
          requestClose={this.handleOpenShareModal()}
          url={shareStoreUrl}
          {...{ formatMessage }}
        />
      </Container>
    )
  }

  addNewTeamStore = () => {
    const { history } = this.props
    history.push('/create-store')
  }

  handleDeleteTeamStore = async () => {
    const {
      storeId,
      deleteTeamStore,
      deleteLoadingAction,
      clearReducerAction,
      data: { refetch }
    } = this.props
    console.log(storeId)
    deleteLoadingAction(true)
    const response = await deleteTeamStore({
      variables: { id: storeId }
    })

    refetch()

    console.log('DELETE STORE RESP ', response)
  }

  editTeamStore = (storeId: string) => () => {
    const { history } = this.props
    history.push(`/create-store?storeId=${storeId}`)
  }

  toggleDeleteModal = (storeId?: string) => () => {
    const { openDeleteModal, openDeleteModalAction } = this.props
    openDeleteModalAction(!openDeleteModal, storeId)
  }

  handleOpenShareModal = (id?: string) => () => {
    const { openShare, openShareModalAction } = this.props
    console.log('openshar modal')
    openShareModalAction(!openShare, id)
  }
}

const mapstateToProps = (state: any) => state.get('myTeamStores').toJS()

const MyTeamStoresEnhanced = compose(
  graphql(GetTeamMyStoresQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  withLoading,
  withError,
  DeleteTeamStoreMutation,
  connect(mapstateToProps, { ...MyTeamStoresActions })
)(MyTeamStores)

export default MyTeamStoresEnhanced
