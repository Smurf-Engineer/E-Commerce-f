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
import Icon from 'antd/lib/icon'
import zenscroll from 'zenscroll'
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
  StyledInput,
  BackLabel,
  BackText
} from './styledComponents'
import {
  DesignResultType,
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
  setItemToAddAction: (teamStoreItem: {}, teamStoreId: string) => void
  addItemToStore: () => void
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
      data.refetch()
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
      data.refetch()
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
      data.refetch()
      resetRenameDataAction()
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

  async componentDidMount() {
    const { setErrorAction, data } = this.props
    try {
      data.refetch()
    } catch (e) {
      setErrorAction(true)
    }
  }

  async componentDidUpdate(prevProps: Props) {
    const { userId, setErrorAction, data } = this.props
    if (prevProps.userId !== userId) {
      try {
        data.refetch()
      } catch (e) {
        setErrorAction(true)
      }
    }
  }

  componentWillUnmount() {
    this.cancelModal()
  }

  render() {
    const {
      history,
      formatMessage,
      limit,
      currentPage,
      setCurrentShare,
      openAddToStoreModal,
      teamStoreId,
      savedDesignId,
      setItemToAddAction,
      addItemToStore,
      openAddToTeamStoreModalAction,
      data,
      deleteModal: { modalLoading = false, openDeleteModal, designName },
      renameModal: {
        modalLoading: renameModalLoading = false,
        openRenameModal,
        designName: designToRename,
        newName
      },
      admin = false,
      userName
    } = this.props

    let alternativeContent = null
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
        {admin && (
          <BackLabel onClick={this.handleOnGoBack}>
            <Icon type="left" />
            <BackText>{formatMessage(messages.backToList)}</BackText>
          </BackLabel>
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
              designs
            }}
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
  user?: object
  userId?: string
  currentPage?: number
}
const MyLockerEnhance = compose(
  withApollo,
  connect(mapStateToProps, { ...myLockerActions }),
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
