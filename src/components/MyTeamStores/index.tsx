/**
 * MyTeamStores Component - Created by cazarez on 14/05/18.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import get from 'lodash/get'
import Modal from 'antd/lib/modal'
import message from 'antd/lib/message'
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
import { QueryProps, TeamstoreResult } from '../../types/common'
import config from '../../config/index'
import TeamStore from '../../components/TeamStoreItem'
import ShareTeamStore from '../../components/ShareDesignModal'
import ModalTitle from '../ModalTitle'
import ModalFooter from '../ModalFooter'

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
  setIdStoreAction: (storeId: string) => void
}

export class MyTeamStores extends React.PureComponent<Props, {}> {
  render() {
    const {
      storeId,
      deleteLoading,
      openShare,
      openDeleteModal,
      formatMessage,
      data: { myTeamstores }
    } = this.props

    const shareStoreUrl = `${config.baseUrl}store-front?storeId=${storeId}`
    const teamStores = get(myTeamstores, 'teamStores', false)
    let myTeamstoresList
    if (teamStores) {
      myTeamstoresList = teamStores.map((teamstore, key) => {
        const { shortId } = teamstore
        return (
          <TeamStore
            name={teamstore.name}
            showNameStore={true}
            image={teamstore.banner || ''}
            withEditButton={true}
            withShareButton={true}
            withDeleteButton={true}
            onEditClick={this.editTeamStore(shortId)}
            onDeleteClick={this.openDeleteModal(shortId)}
            openShareModalAction={this.handleOpenShareModal(shortId)}
            onItemClick={this.gotoTeamStore(shortId)}
            {...{ key, formatMessage }}
          />
        )
      })
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
          visible={openDeleteModal}
          title={
            <ModalTitle title={formatMessage(messages.titleDeleteModal)} />
          }
          footer={
            <ModalFooter
              onCancel={this.closeDeleteModal}
              confirmLoading={deleteLoading}
              okText={formatMessage(messages.deleteModalLabel)}
              onOk={this.handleDeleteTeamStore}
              {...{ formatMessage }}
            />
          }
          maskClosable={false}
          closable={false}
          destroyOnClose={true}
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
          messageForShare={formatMessage(messages.shareTeamStoreMessage)}
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
      data: { refetch }
    } = this.props
    deleteLoadingAction(true)
    try {
      await deleteTeamStore({ variables: { id: storeId } })
      refetch()
    } catch (err) {
      const errorMessage =
        err.graphQLErrors.map((x: any) => x.message) || err.message
      message.error(errorMessage, 5)
    }
  }

  editTeamStore = (storeId: string) => () => {
    const { history } = this.props
    history.push(`/create-store?storeId=${storeId}`)
  }

  gotoTeamStore = (storeId: string) => () => {
    const { history } = this.props
    history.push(`/store-front?storeId=${storeId}`)
  }

  openDeleteModal = (storeId: string) => () => {
    const { openDeleteModalAction, setIdStoreAction } = this.props
    setIdStoreAction(storeId)
    openDeleteModalAction(true)
  }

  closeDeleteModal = () => {
    const { openDeleteModalAction } = this.props
    openDeleteModalAction(false)
  }

  handleOpenShareModal = (id?: string) => () => {
    const { openShare, openShareModalAction } = this.props
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
  connect(
    mapstateToProps,
    { ...MyTeamStoresActions }
  )
)(MyTeamStores)

export default MyTeamStoresEnhanced