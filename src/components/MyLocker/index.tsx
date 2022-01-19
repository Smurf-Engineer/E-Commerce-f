/**
 * MyLocker Component - Created by david on 06/04/18.
 */
import * as React from 'react'
import { withApollo, compose, graphql, QueryProps } from 'react-apollo'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import Message from 'antd/lib/message'
import { Moment } from 'moment'
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
import FlagDescription from './FlagDescription'
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
  TransparentLoader,
  MessagePrevent,
  Filters,
  FilterTitle,
  Options,
  StyledSelect,
  StyledDatePicker,
  ButtonWrapper,
  StyledButton,
  SearchInput,
  SubOptions,
  HelpLink,
  HelpMessage,
  HelpWrapper
} from './styledComponents'
import {
  DesignResultType,
  DeleteDesignModal,
  RenameDesignModal,
  UserType,
  MessagePayload,
  DesignCopyResult,
  User
} from '../../types/common'
import {
  FILTER_TYPE_OPTIONS,
  FILTER_DATE_OPTIONS
} from './constants'
import {
  DATE_FORMAT_STARTING_YEAR
} from '../../constants'
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
  user: User
  openAddToStoreModal: boolean
  teamStoreId: string
  savedDesignId: string
  admin?: boolean
  userId: string
  userName: string
  data: Data
  loading: boolean
  searchText: string
  filterType: string
  filterDate: string
  startDate: Moment
  endDate: Moment
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
  setSearchTextAction: (searchText: string) => void
  setFiltersAction: (
    filterType: string,
    filterDate: string,
    startDate: Moment,
    endDate: Moment
  ) => void
  resetFiltersAction: () => void
}

interface Data extends QueryProps {
  designsResult: DesignResultType[]
}

export class MyLocker extends React.PureComponent<Props, {}> {
  state = {
    searchValue: '',
    filterType: '',
    filterDate: '',
    startDateFilter: null,
    endDateFilter: null,
  }
  raiseSearchWhenUserStopsTyping = debounce(
    () => this.props.setSearchTextAction(this.state.searchValue),
    600
  )

  onSelectTypeFilter = (value: string) => {
    this.setState({ filterType: value })
  }

  onSelectDateFilter = (value: string) => {
    this.setState({ filterDate: value })
  }

  handleOnSelectStart = (date: Moment) => {
    this.setState({ startDateFilter: date })
  }

  handleOnSelectEnd = (date: Moment) => {
    this.setState({ endDateFilter: date })
  }

  onSaveFilters = () => {
    const { setFiltersAction } = this.props
    const { filterType, filterDate, startDateFilter, endDateFilter } = this.state
    setFiltersAction(filterType, filterDate, startDateFilter, endDateFilter)
  }

  handleSearchInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    this.setState({ searchValue: value }, () => {
      this.raiseSearchWhenUserStopsTyping()
    })
  }

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
    const { resetFiltersAction } = this.props
    resetFiltersAction()
    this.cancelModal()
  }

  render() {
    const {
      history,
      formatMessage,
      limit,
      loading,
      currentPage,
      user,
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
    const {
      searchValue,
      filterType: stateFilterType,
      filterDate: stateFilterDate,
      startDateFilter,
      endDateFilter
    } = this.state

    let alternativeContent = null
    const userName = get(data, 'designsResults.userName', '')
    const designs = get(data, 'designsResults.designs', [])
    const fullCount = get(data, 'designsResults.fullCount', 0)
    const selectTypeOptions = FILTER_TYPE_OPTIONS.map(
      ({ name: filterName, field }, index) => (
        <Option key={index} value={field}>
          {formatMessage(messages[filterName])}
        </Option>
      )
    )
    const selectDateOptions = FILTER_DATE_OPTIONS.map(
      ({ name: filterName, field }, index) => (
        <Option key={index} value={field}>
          {formatMessage(messages[filterName])}
        </Option>
      )
    )

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
        <HelpWrapper>
          <HelpMessage>{formatMessage(messages.helpMessage)}</HelpMessage>
          <HelpLink>{formatMessage(messages.helpLink)}</HelpLink>
        </HelpWrapper>
        <MessageText {...{ admin }}>
          {admin
            ? formatMessage(messages.userLocker, { userName })
            : formatMessage(messages.message)}
        </MessageText>
        {!admin && <MessagePrevent>{formatMessage(messages.messagePrevent)}</MessagePrevent>}
        <Filters>
          <FilterTitle>{formatMessage(messages.filters)}</FilterTitle>
          <Options>
            <StyledSelect
              onChange={this.onSelectTypeFilter}
              showSearch={false}
              value={stateFilterType}
              placeholder={formatMessage(messages.selectDesignType)}
            >
              {selectTypeOptions}
            </StyledSelect>
            <StyledSelect
              onChange={this.onSelectDateFilter}
              showSearch={false}
              value={stateFilterDate}
              placeholder={formatMessage(messages.selectDateType)}
            >
              {selectDateOptions}
            </StyledSelect>
            <StyledDatePicker
              value={startDateFilter}
              onChange={this.handleOnSelectStart}
              format={DATE_FORMAT_STARTING_YEAR}
              size="large"
              disabled={!stateFilterDate}
              placeholder={formatMessage(messages.from)}
            />
            <StyledDatePicker
              value={endDateFilter}
              onChange={this.handleOnSelectEnd}
              format={DATE_FORMAT_STARTING_YEAR}
              size="large"
              disabled={!stateFilterDate}
              placeholder={formatMessage(messages.to)}
            />
            <ButtonWrapper disabled={false}>
              <StyledButton type="primary" onClick={this.onSaveFilters}>
                {formatMessage(messages.show)}
              </StyledButton>
            </ButtonWrapper>
          </Options>
        </Filters>
        <SubOptions>
          <SearchInput
            value={searchValue}
            onChange={this.handleSearchInputChange}
            placeholder={formatMessage(messages.search)}
          />
          <FlagDescription {...{ formatMessage }} />
        </SubOptions>
        {alternativeContent}
        <PaginationRow>
          <ProductList
            {...{
              setCurrentShare,
              formatMessage,
              history,
              user,
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
              maxLength={18}
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
  searchText?: string
  filterType?: string
  filterDate?: string
  startDate?: Moment
  endDate?: Moment
}
const MyLockerEnhance = compose(
  withApollo,
  connect(mapStateToProps, { ...myLockerActions }),
  graphql(duplicateDesignMutation, { name: 'duplicateDesign' }),
  graphql<Data>(desginsQuery, {
    options: (ownprops: OwnProps) => {
      const {
        limit,
        offset,
        admin,
        userId,
        user,
        searchText,
        filterType,
        filterDate,
        startDate,
        endDate
      } = ownprops
      const personalId = user ? user.id : ''
      const userShortId = admin ? userId : personalId

      return {
        fetchPolicy: 'network-only',
        variables: {
          limit,
          offset,
          userId: userShortId,
          searchText,
          filterType,
          filterDate,
          startDate,
          endDate
        }
      }
    }
  })
)(MyLocker)

export default MyLockerEnhance
