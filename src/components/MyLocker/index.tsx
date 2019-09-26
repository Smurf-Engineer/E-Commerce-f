/**
 * MyLocker Component - Created by david on 06/04/18.
 */
import * as React from 'react'
import { withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'
import Message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import Pagination from 'antd/lib/pagination/Pagination'
import Spin from 'antd/lib/spin'

import * as myLockerActions from './actions'
import messages from './messages'
import {
  desginsQuery,
  designAsPrivateMutation,
  deleteDesignMutation,
  changeNameMutation
} from './data'
import ProductList from '../../components/ProductCatalogueThumbnailsList'
import ModalFooter from '../ModalFooter'
import ModalTitle from '../ModalTitle'
import AddToTeamStore from '../AddToTeamStore'
import EmptyContainer from '../EmptyContainer'
import {
  Container,
  PaginationRow,
  LoadingContainer,
  TitleError,
  MessageError,
  MessageText,
  ConfirmMessage,
  InputWrapper,
  StyledInput
} from './styledComponents'
import {
  DesignResultType,
  DesignType,
  DeleteDesignModal,
  RenameDesignModal
} from '../../types/common'
import { designExistsOnCart } from '../../utils/utilsShoppingCart'

interface Props {
  history: any
  client: any
  limit: number
  offset: number
  currentPage: number
  fullCount: string
  designs: DesignType[]
  loading: boolean
  error: boolean
  deleteModal: DeleteDesignModal
  renameModal: RenameDesignModal
  user: object
  openAddToStoreModal: boolean
  teamStoreId: string
  savedDesignId: string
  setItemToAddAction: (teamStoreItem: {}, teamStoreId: string) => void
  addItemToStore: () => void
  openAddToTeamStoreModalAction: (open: boolean, id: string) => void
  setCurrentShare?: (savedDesignId: string, openShareModal: boolean) => void
  openQuickView: (id: number, yotpoId: string | null) => void
  formatMessage: (messageDescriptor: any, values?: {}) => string
  setDesignsData: (data: DesignResultType, offset: number, page: number) => void
  setLoadingAction: (loading: boolean) => void
  setErrorAction: (error: boolean) => void
  setDeleteModalDataAction: (payload: DeleteDesignModal) => void
  setRenameModalDataAction: (payload: RenameDesignModal) => void
  setDeleteModalLoadingAction: (loading: boolean) => void
  resetModalDataAction: () => void
  resetRenameDataAction: () => void
  onChangeDesignName: (name: string) => void
  setRenameModalLoadingAction: (loading: boolean) => void
}

export class MyLocker extends React.PureComponent<Props, {}> {
  handleOnPressPrivate = async (id: string, isPrivate: boolean) => {
    const {
      client: { mutate }
    } = this.props
    try {
      await mutate({
        mutation: designAsPrivateMutation,
        variables: { designId: id, shared: !isPrivate }
      })
      this.fetchDesigns()
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    }
  }

  handleOnPressDelete = (id: string, name: string) => {
    if (designExistsOnCart(id)) {
      const { formatMessage } = this.props
      Message.error(formatMessage(messages.designOnCartError))
      return
    }
    const { setDeleteModalDataAction } = this.props
    const modalData: DeleteDesignModal = {
      openDeleteModal: true,
      designId: id,
      designName: name,
      modalLoading: false
    }
    setDeleteModalDataAction(modalData)
  }

  handleOnPressRename = (id: string, name: string) => {
    if (designExistsOnCart(id)) {
      const { formatMessage } = this.props
      Message.error(formatMessage(messages.designOnCartError))
      return
    }
    const { setRenameModalDataAction } = this.props
    const modalData: RenameDesignModal = {
      openRenameModal: true,
      designId: id,
      designName: name,
      modalLoading: false,
      newName: name
    }
    setRenameModalDataAction(modalData)
  }

  handleOnDeleteDesign = async () => {
    const {
      setDeleteModalLoadingAction,
      deleteModal: { designId },
      client: { mutate }
    } = this.props
    try {
      setDeleteModalLoadingAction(true)
      await mutate({
        mutation: deleteDesignMutation,
        variables: { designId }
      })
      const { resetModalDataAction } = this.props
      resetModalDataAction()
      this.fetchDesigns()
    } catch (e) {
      setDeleteModalLoadingAction(false)
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    }
  }

  handleOnHideDeleteModal = () => {
    const { resetModalDataAction } = this.props
    resetModalDataAction()
  }
  handleOnHideRenameModal = () => {
    const { resetRenameDataAction } = this.props
    resetRenameDataAction()
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { onChangeDesignName } = this.props
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    onChangeDesignName(value)
  }

  fetchDesigns = async (offsetParam?: number, pageParam?: number) => {
    const {
      client: { query },
      offset: offsetProp,
      currentPage: pageProp,
      limit,
      setDesignsData
    } = this.props
    let offset = offsetParam !== undefined ? offsetParam : offsetProp
    let currentPage = pageParam !== undefined ? pageParam : pageProp

    if (!offsetParam && !pageParam) {
      const fullPage = !(offset % limit)
      const maxPageNumber = offset / limit

      if (fullPage && currentPage > maxPageNumber) {
        currentPage--
        offset = currentPage > 1 ? (currentPage - 1) * limit : 0
      }
    }

    try {
      const data = await query({
        query: desginsQuery,
        variables: { limit, offset },
        fetchPolicy: 'network-only'
      })
      setDesignsData(data, offset, currentPage)
    } catch (e) {
      throw e
    }
  }

  handleOnChangePage = async (page: number) => {
    const { setLoadingAction, limit, setErrorAction } = this.props
    const offset = page > 1 ? (page - 1) * limit : 0
    setLoadingAction(true)
    try {
      this.fetchDesigns(offset, page)
    } catch (e) {
      setErrorAction(true)
    }
  }

  cancelModal = () => {
    const { openAddToTeamStoreModalAction } = this.props
    openAddToTeamStoreModalAction(false, '')
  }

  handleOnOpenQuickView = (id: number, yotpoId: string) => {
    const { openQuickView } = this.props
    openQuickView(id, yotpoId)
  }

  handleOnSaveName = async () => {
    const {
      formatMessage,
      user,
      renameModal: { newName, designId },
      setRenameModalLoadingAction,
      resetRenameDataAction,
      client: { mutate }
    } = this.props
    const isUserAuthenticated = !!user
    if (!newName) {
      Message.error(formatMessage(messages.invalidNameMessage))
      return
    }
    if (!isUserAuthenticated) {
      Message.error(formatMessage(messages.invalidUser))
      return
    }
    try {
      setRenameModalLoadingAction(true)
      await mutate({
        mutation: changeNameMutation,
        variables: { designId, name: newName }
      })
      this.fetchDesigns()
      resetRenameDataAction()
    } catch (error) {
      setRenameModalLoadingAction(false)
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      Message.error(errorMessage)
    }
  }

  async componentDidMount() {
    const { setErrorAction } = this.props
    try {
      await this.fetchDesigns(0, 1)
    } catch (e) {
      setErrorAction(true)
    }
  }

  componentWillUnmount() {
    this.cancelModal()
  }

  render() {
    const {
      history,
      loading,
      error,
      formatMessage,
      designs,
      limit,
      currentPage,
      setCurrentShare,
      fullCount,
      openAddToStoreModal,
      teamStoreId,
      savedDesignId,
      setItemToAddAction,
      addItemToStore,
      openAddToTeamStoreModalAction,
      deleteModal: { modalLoading, openDeleteModal, designName },
      renameModal: {
        modalLoading: renameModalLoading,
        openRenameModal,
        designName: designToRename,
        newName
      }
    } = this.props

    let alternativeContent = null
    if (loading) {
      alternativeContent = (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    } else if (error) {
      alternativeContent = (
        <LoadingContainer>
          <TitleError>{formatMessage(messages.titleError)}</TitleError>
          <MessageError>{formatMessage(messages.messageError)}</MessageError>
        </LoadingContainer>
      )
    } else if (!designs.length) {
      alternativeContent = (
        <EmptyContainer message={formatMessage(messages.messageEmpty)} />
      )
    }

    let withoutPadding = true
    if (typeof window !== 'undefined') {
      withoutPadding = !window.matchMedia('(max-width: 768px)').matches
    }

    return (
      <Container>
        <MessageText>{formatMessage(messages.message)}</MessageText>
        {alternativeContent}
        <PaginationRow>
          <ProductList
            {...{
              setCurrentShare,
              formatMessage,
              history,
              withoutPadding,
              openAddToTeamStoreModalAction
            }}
            onPressPrivate={this.handleOnPressPrivate}
            onPressDelete={this.handleOnPressDelete}
            onPressRename={this.handleOnPressRename}
            openQuickView={this.handleOnOpenQuickView}
            designs={designs}
          />
          <Pagination
            current={currentPage}
            pageSize={limit}
            total={Number(fullCount)}
            onChange={this.handleOnChangePage}
          />
        </PaginationRow>
        <Modal
          visible={openDeleteModal}
          title={
            <ModalTitle title={formatMessage(messages.titleDeleteModal)} />
          }
          footer={
            <ModalFooter
              okText={formatMessage(messages.deleteDesign)}
              onOk={this.handleOnDeleteDesign}
              onCancel={this.handleOnHideDeleteModal}
              confirmLoading={modalLoading}
              {...{ formatMessage }}
            />
          }
          destroyOnClose={false}
          maskClosable={false}
          closable={false}
        >
          <ConfirmMessage>
            {formatMessage(messages.messageDeleteModal, { designName })}
          </ConfirmMessage>
        </Modal>
        <Modal
          visible={openRenameModal}
          title={
            <ModalTitle title={formatMessage(messages.titleRenameModal)} />
          }
          footer={
            <ModalFooter
              okText={formatMessage(messages.renameDesign)}
              onOk={this.handleOnSaveName}
              onCancel={this.handleOnHideRenameModal}
              confirmLoading={renameModalLoading}
              {...{ formatMessage }}
            />
          }
          destroyOnClose={false}
          maskClosable={false}
          closable={false}
        >
          <ConfirmMessage>{formatMessage(messages.renameText)}</ConfirmMessage>
          <InputWrapper>
            <StyledInput
              value={newName}
              placeholder={formatMessage(messages.renamePlaceholder, {
                designName: designToRename
              })}
              onChange={this.handleInputChange}
              maxLength={15}
            />
          </InputWrapper>
        </Modal>
        <Modal
          visible={openAddToStoreModal}
          footer={null}
          maskClosable={true}
          onCancel={this.cancelModal}
        >
          <AddToTeamStore
            {...{
              history,
              savedDesignId,
              openAddToTeamStoreModalAction,
              setItemToAddAction,
              teamStoreId,
              addItemToStore
            }}
          />
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => {
  const myLocker = state.get('myLocker').toJS()
  const app = state.get('app').toJS()
  return { ...myLocker, ...app }
}

const MyLockerEnhance = compose(
  withApollo,
  connect(
    mapStateToProps,
    { ...myLockerActions }
  )
)(MyLocker)

export default MyLockerEnhance
