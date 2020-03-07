/**
 * MyLocker Component - Created by david on 06/04/18.
 */
import * as React from 'react'
import { withApollo, compose, graphql, QueryProps } from 'react-apollo'
import { connect } from 'react-redux'
import Message from 'antd/lib/message'
import get from 'lodash/get'
import Modal from 'antd/lib/modal'
import Pagination from 'antd/lib/pagination/Pagination'
import Spin from 'antd/lib/spin'
import zenscroll from 'zenscroll'
import * as myLockerActions from './actions'
import messages from './messages'
import {
  desginsQuery,
  designAsPrivateMutation,
  deleteDesignMutation,
  changeNameMutation,
  duplicateDesignMutation
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
  StyledInput,
  TransparentLoader
} from './styledComponents'
import {
  DesignResultType,
  DeleteDesignModal,
  RenameDesignModal,
  UserType,
  MessagePayload,
  DesignCopyResult
} from '../../types/common'
import { designExistsOnCart } from '../../utils/utilsShoppingCart'

interface Props {
  history: any
  client: any
  limit: number
  offset: number
  currentPage: number
  fullCount: string
  deleteModal: DeleteDesignModal
  renameModal: RenameDesignModal
  user: object
  openAddToStoreModal: boolean
  teamStoreId: string
  savedDesignId: string
  admin?: boolean
  userId: string
  userName: string
  data: Data
  loading: boolean
  duplicateDesign: (variables: {}) => Promise<MessagePayload>
  setItemToAddAction: (teamStoreItem: {}, teamStoreId: string) => void
  addItemToStore: () => void
  setDesignSelected?: (shortId: string) => void
  openAddToTeamStoreModalAction: (open: boolean, id: string) => void
  setCurrentShare?: (savedDesignId: string, openShareModal: boolean) => void
  openQuickView: (id: number, yotpoId: string | null) => void
  formatMessage: (messageDescriptor: any, values?: {}) => string
  setPaginationValues: (offset: number, page: number) => void
  setLoadingAction: (loading: boolean) => void
  setErrorAction: (error: boolean) => void
  setDeleteModalDataAction: (payload: DeleteDesignModal) => void
  setRenameModalDataAction: (payload: RenameDesignModal) => void
  setDeleteModalLoadingAction: (loading: boolean) => void
  resetModalDataAction: () => void
  resetRenameDataAction: () => void
  onChangeDesignName: (name: string) => void
  setRenameModalLoadingAction: (loading: boolean) => void
  onGoBack: (id: string) => void
}

interface Data extends QueryProps {
  designsResult: DesignResultType[]
}

export class MyLocker extends React.PureComponent<Props, {}> {
  handleOnPressPrivate = async (id: string, isPrivate: boolean) => {
    const {
      client: { mutate },
      data
    } = this.props
    try {
      await mutate({
        mutation: designAsPrivateMutation,
        variables: { designId: id, shared: !isPrivate }
      })
      await data.refetch()
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
      client: { mutate },
      data
    } = this.props
    try {
      setDeleteModalLoadingAction(true)
      await mutate({
        mutation: deleteDesignMutation,
        variables: { designId }
      })
      const { resetModalDataAction } = this.props
      resetModalDataAction()
      await data.refetch()
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

  changePageValues = async (offsetParam?: number, pageParam?: number) => {
    const {
      offset: offsetProp,
      currentPage: pageProp,
      setPaginationValues
    } = this.props
    let offset = offsetParam !== undefined ? offsetParam : offsetProp
    let currentPage = pageParam !== undefined ? pageParam : pageProp

    setPaginationValues(offset, currentPage)
  }

  handleOnChangePage = async (page: number) => {
    const { limit, setErrorAction } = this.props
    const offset = page > 1 ? (page - 1) * limit : 0
    try {
      this.changePageValues(offset, page)
      zenscroll.toY(0, 0)
    } catch (e) {
      setErrorAction(true)
    }
  }

  cancelModal = () => {
    const { openAddToTeamStoreModalAction } = this.props
    if (openAddToTeamStoreModalAction) {
      openAddToTeamStoreModalAction(false, '')
    }
  }

  handleOnOpenQuickView = (id: number, yotpoId: string) => {
    const { openQuickView } = this.props
    openQuickView(id, yotpoId)
  }

  handleMakeCopy = async (designId: string) => {
    const {
      setLoadingAction,
      duplicateDesign,
      offset,
      user,
      admin,
      userId,
      limit
    } = this.props
    try {
      setLoadingAction(true)
      await duplicateDesign({
        variables: { designId },
        update: (store: any, dataInternal: DesignCopyResult) => {
          const design = get(dataInternal, 'data.duplicateDesign.design')
          if (!design) {
            return
          }
          const userShortId = admin ? userId : user.id
          const storedData = store.readQuery({
            query: desginsQuery,
            variables: {
              limit,
              offset,
              userId: userShortId
            }
          })
          const designList = get(storedData, 'designsResults.designs')
          designList.push(design)
          store.writeQuery({
            query: desginsQuery,
            variables: {
              limit,
              offset,
              userId: userShortId
            },
            data: storedData
          })
          Message.success(get(dataInternal, 'data.duplicateDesign.message', ''))
        }
      })
    } catch (e) {
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    } finally {
      setLoadingAction(false)
    }
  }

  handleOnSaveName = async () => {
    const {
      formatMessage,
      user,
      renameModal: { newName, designId },
      setRenameModalLoadingAction,
      resetRenameDataAction,
      client: { mutate },
      data
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
      resetRenameDataAction()
      await data.refetch()
    } catch (error) {
      setRenameModalLoadingAction(false)
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      Message.error(errorMessage)
    }
  }

  handleOnGoBack = () => {
    const { onGoBack } = this.props
    onGoBack('')
  }

  componentWillUnmount() {
    this.cancelModal()
  }

  render() {
    const {
      history,
      formatMessage,
      limit,
      loading,
      currentPage,
      setCurrentShare,
      openAddToStoreModal,
      teamStoreId,
      savedDesignId,
      setItemToAddAction,
      addItemToStore,
      setDesignSelected,
      openAddToTeamStoreModalAction,
      data,
      deleteModal: { modalLoading = false, openDeleteModal, designName },
      renameModal: {
        modalLoading: renameModalLoading = false,
        openRenameModal,
        designName: designToRename,
        newName
      },
      admin = false
    } = this.props

    let alternativeContent = null
    const userName = get(data, 'designsResults.userName', '')
    const designs = get(data, 'designsResults.designs', [])
    const fullCount = get(data, 'designsResults.fullCount', 0)

    if (data.loading) {
      alternativeContent = (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    } else if (data.error) {
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
        {loading && (
          <TransparentLoader>
            <Spin size="large" />
          </TransparentLoader>
        )}
        <MessageText>
          {admin
            ? formatMessage(messages.userLocker, { userName })
            : formatMessage(messages.message)}
        </MessageText>
        {alternativeContent}
        <PaginationRow>
          <ProductList
            {...{
              setCurrentShare,
              formatMessage,
              history,
              withoutPadding,
              openAddToTeamStoreModalAction,
              setDesignSelected,
              designs
            }}
            makeCopy={this.handleMakeCopy}
            onPressPrivate={this.handleOnPressPrivate}
            onPressDelete={this.handleOnPressDelete}
            onPressRename={this.handleOnPressRename}
            openQuickView={this.handleOnOpenQuickView}
            previewOnly={!!admin}
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

type OwnProps = {
  limit?: number
  offset?: number
  admin?: string
  user?: UserType
  userId?: string
  currentPage?: number
}
const MyLockerEnhance = compose(
  withApollo,
  connect(mapStateToProps, { ...myLockerActions }),
  graphql(duplicateDesignMutation, { name: 'duplicateDesign' }),
  graphql<Data>(desginsQuery, {
    options: (ownprops: OwnProps) => {
      const { limit, offset, admin, userId, user } = ownprops
      const userShortId = admin ? userId : user.id

      return {
        fetchPolicy: 'network-only',
        variables: {
          limit,
          offset,
          userId: userShortId
        }
      }
    }
  })
)(MyLocker)

export default MyLockerEnhance
