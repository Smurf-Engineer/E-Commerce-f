/**
 * TeamStoresAdmin Component - Created by eduardoquintero on 15/07/19.
 */
import * as React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import { compose, withApollo, graphql } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import message from 'antd/lib/message'
import { Moment } from 'moment'
import { GetTeamStoresQuery } from './TeamStoresList/data'
import {
  setTeamStoreFeaturedMutation,
  setTeamStorePricesMutation,
  setTeamStoreDisplayMutation,
  createStoreMutation,
  getUsers,
  updateStoreMutation,
  deleteTeamStoreMutation
} from './data'
import TeamStoreDetails from './TeamStoreDetails'
import CreateStore from './CreateStore'
import * as TeamStoresActions from './actions'
import * as ThunkActions from './thunkActions'
import {
  Container,
  ScreenTitle,
  SearchInput,
  AddTeamStoreButton
} from './styledComponents'
import List from './TeamStoresList'
import messages from './messages'
import {
  sorts,
  Message,
  Currency,
  TeamStoreAdminType,
  SelectedDesignObjectType,
  LockerTableType,
  DesignType,
  SelectedDesignType,
  UserSearchResult,
  QueryProps,
  TeamstoreType,
  UserPermissions,
  AccountManagerName
} from '../../types/common'
import { TEAM_STORES_LIMIT } from './constants'
import { TEAM_STORES, ADMIN_ROUTE } from '../AdminLayout/constants'

interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  client: any
  searchText: string
  productCode: number
  gender: string
  size: string
  fitStyle: string
  color: string
  pocketZipper: string
  frontZipper: string
  binding: string
  bibBrace: string
  collection: string
  id: number
  modalOpen: boolean
  currentCurrency: string
  teamSizeRange: string
  openCropper: boolean
  loading: boolean
  teamStore: TeamStoreAdminType
  currencies: Currency[]
  items: LockerTableType[]
  limit: number
  offset: number
  currentPageModal: number
  selectedItems: SelectedDesignObjectType
  openLocker: boolean
  onDemand: boolean
  name: string
  featured: boolean
  imagePreviewUrl: string
  userId: string
  saving: boolean
  cutoffDate: string
  deliveryDate: string
  users: Data
  userToSearch: string
  storeId: string
  storeShortId: string
  permissions: UserPermissions
  startDateMoment: Moment
  endDateMoment: Moment
  startDate: string
  endDate: string
  accountManager: AccountManagerName
  resetForm: () => void
  setTeamData: (data: TeamstoreType) => void
  setLoadingAction: (loading: boolean) => void
  setUserToSearch: (searchText: string) => void
  setSelectedUser: (user: string) => void
  getEditStore: (query: any, id: string) => void
  updateStore: (variables: {}) => Promise<any>
  deleteStore: (variables: {}) => Promise<any>
  createStore: (variables: {}) => Promise<any>
  setSavingAction: (saving: boolean) => void
  setLoading: (loading: boolean) => void
  uploadBanner: (file: Blob, openModal: boolean) => void
  setImage: (imagePreviewUrl: string, openModal: boolean) => void
  openModal: (opened: boolean) => void
  setFeaturedAction: (featured: boolean) => void
  setNameAction: (name: string) => void
  deleteItemSelectedAction: (index: number) => void
  setItemVisibleAction: (index: number, visible: boolean) => void
  moveRowAction: (
    index: number,
    hoverIndex: number,
    row: LockerTableType
  ) => void
  setItemsAddAction: () => void
  setPaginationData: (offset: number, page: number) => void
  setItemSelectedAction: (item: DesignType, checked: boolean) => void
  onUnselectItemAction: (keyName: string) => void
  setOpenLockerAction: (open: boolean) => void
  formatMessage: (messageDescriptor: Message, params?: any) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setSearchTextAction: (searchText: string) => void
  setTeamStoreFeatured: (variables: {}) => void
  setPriceAction: (value: number, currency: string, itemIndex: number) => void
  getTeamStore: (query: any, teamStoreId: number) => void
  setTeamStorePrices: (variables: {}) => void
  setLoadingItemAction: (itemIndex: string, loading: boolean) => void
  setTeamStoreDisplay: (variables: {}) => void
  updateStartDateAction: (dateMoment: Moment, date: string) => void
  updateEndDateAction: (dateMoment: Moment, date: string) => void
  updateTeamStoreTypeAction: (onDemand: boolean) => void
}

interface Data extends QueryProps {
  userSearch: UserSearchResult[]
}

interface StateProps {
  searchValue: string
}
class TeamStoresAdmin extends React.Component<Props, StateProps> {
  state = {
    searchValue: ''
  }
  raiseSearchWhenUserStopsTyping = debounce(
    () => this.props.setSearchTextAction(this.state.searchValue),
    600
  )

  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  render() {
    const {
      currentPage,
      orderBy,
      sort,
      formatMessage,
      searchText,
      history,
      teamSizeRange,
      currentCurrency,
      openCropper,
      setPriceAction,
      teamStore,
      currencies,
      setItemSelectedAction,
      onUnselectItemAction,
      selectedItems,
      setLoadingAction,
      setTeamData,
      setItemsAddAction,
      setPaginationData,
      currentPageModal,
      setOpenLockerAction,
      deleteItemSelectedAction,
      setNameAction,
      userToSearch,
      uploadBanner,
      imagePreviewUrl,
      setItemVisibleAction,
      setFeaturedAction,
      storeShortId,
      moveRowAction,
      saving,
      userId,
      users,
      resetDataAction,
      name,
      onDemand,
      featured,
      openModal,
      limit,
      permissions,
      setUserToSearch,
      setSelectedUser,
      openLocker,
      offset,
      items,
      loading,
      updateStartDateAction,
      startDateMoment,
      endDateMoment,
      updateEndDateAction,
      updateTeamStoreTypeAction,
      accountManager
    } = this.props
    const access = permissions[TEAM_STORES] || {}
    if (!access.view) {
      history.replace(ADMIN_ROUTE)
    }
    return (
      <div>
        <Route
          path="/admin/team-stores"
          exact={true}
          render={() => (
            <Container>
              <ScreenTitle>
                <FormattedMessage {...messages.title} />
              </ScreenTitle>
              {access.edit && (
                <AddTeamStoreButton onClick={this.handleGoToCreateStore}>
                  <FormattedMessage {...messages.addTeamStore} />
                </AddTeamStoreButton>
              )}
              <SearchInput
                value={this.state.searchValue}
                onChange={this.handleInputChange}
                placeholder={formatMessage(messages.search)}
              />
              <List
                {...{ formatMessage, currentPage, orderBy, sort, searchText }}
                onSortClick={this.handleOnSortClick}
                onChangePage={this.handleOnChangePage}
                interactiveHeaders={true}
                canEdit={access.edit}
                onChangeSwitch={this.onChangeSwitch}
                onClickRow={this.handleGoToTeamStore}
              />
            </Container>
          )}
        />
        <Route
          path="/admin/team-stores/details/:id"
          exact={true}
          render={() => (
            <TeamStoreDetails
              {...{
                formatMessage,
                resetDataAction,
                history,
                teamStore,
                currencies,
                loading
              }}
              canEdit={access.edit}
              handleDeleteStore={this.handleDeleteStore}
              getTeamStoreData={this.handleGetTeamStoreDetails}
              handleOnSetPrice={setPriceAction}
              handleOnSave={this.handleOnSaveItem}
              onSetFeatured={this.handleOnSetFeatured}
            />
          )}
        />
        <Route
          path={['/admin/team-stores/create', '/admin/team-stores/edit/:id']}
          render={() => (
            <CreateStore
              {...{
                formatMessage,
                history,
                setOpenLockerAction,
                selectedItems,
                currentPageModal,
                setPaginationData,
                openLocker,
                resetDataAction,
                setLoadingAction,
                setTeamData,
                loading,
                limit,
                userId,
                saving,
                onDemand,
                featured,
                setNameAction,
                name,
                setUserToSearch,
                setSelectedUser,
                openModal,
                setItemsAddAction,
                imagePreviewUrl,
                setItemSelectedAction,
                onUnselectItemAction,
                deleteItemSelectedAction,
                setItemVisibleAction,
                setFeaturedAction,
                moveRowAction,
                items,
                userToSearch,
                storeShortId,
                users,
                offset,
                teamSizeRange,
                currentCurrency,
                openCropper,
                accountManager
              }}
              setImage={uploadBanner}
              canEdit={access.edit}
              getEditStore={this.handleGetEditStore}
              buildTeamStore={this.buildTeamStore}
              onSelectStartDate={updateStartDateAction}
              startDate={startDateMoment}
              endDate={endDateMoment}
              onSelectEndDate={updateEndDateAction}
              onChangeTeamStoreType={updateTeamStoreTypeAction}
            />
          )}
        />
      </div>
    )
  }
  handleOnSaveItem = async (event: React.MouseEvent<HTMLElement>) => {
    const { id: index } = event.currentTarget
    const {
      teamStore,
      setTeamStorePrices,
      setLoadingItemAction,
      formatMessage
    } = this.props

    setLoadingItemAction(index, true)
    try {
      const teamStoreItem = teamStore.items[index]
      const prices = Object.keys(teamStoreItem.pricesByCurrency).map(
        (currency) => ({
          shortName: currency,
          price: teamStoreItem.pricesByCurrency[currency]
        })
      )
      await setTeamStorePrices({
        variables: {
          itemId: teamStoreItem.id,
          prices
        }
      })
      message.success(formatMessage(messages.itemSaved))
    } catch (e) {
      message.error(formatMessage(messages.unexpectedError))
    }
    setLoadingItemAction(index, false)
  }
  handleGetTeamStoreDetails = (teamStoreId: number) => {
    const {
      getTeamStore,
      client: { query }
    } = this.props
    getTeamStore(query, teamStoreId)
  }
  handleGoToCreateStore = () => {
    const { history } = this.props
    history.push('/admin/team-stores/create')
  }
  handleGoToTeamStore = (id: string) => {
    const { history } = this.props
    history.push(`/admin/team-stores/details/${id}`)
  }
  handleGetEditStore = (id: string) => {
    const {
      getEditStore,
      client: { query }
    } = this.props
    getEditStore(query, id)
  }
  handleOnSortClick = (label: string, sort: sorts) => {
    const { setOrderByAction } = this.props
    setOrderByAction(label, sort)
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    this.setState({ searchValue: value }, () => {
      this.raiseSearchWhenUserStopsTyping()
    })
  }
  onChangeSwitch = (id: number, fieldId: string) => {
    fieldId === 'featured'
      ? this.handleOnSetFeatured(id)
      : this.handleOnSetDisplay(id)
  }
  handleOnSetFeatured = async (id: number) => {
    const {
      setTeamStoreFeatured,
      orderBy,
      sort,
      searchText,
      formatMessage,
      currentPage = 0
    } = this.props
    try {
      const offset = (currentPage - 1) * TEAM_STORES_LIMIT

      await setTeamStoreFeatured({
        variables: { id },
        update: (store: any) => {
          const storedData = store.readQuery({
            query: GetTeamStoresQuery,
            variables: {
              limit: TEAM_STORES_LIMIT,
              offset,
              order: orderBy,
              orderAs: sort,
              searchText
            }
          })
          store.writeQuery({
            query: GetTeamStoresQuery,
            variables: {
              limit: TEAM_STORES_LIMIT,
              offset,
              order: orderBy,
              orderAs: sort,
              searchText
            },
            data: storedData
          })
        }
      })
    } catch (e) {
      message.error(formatMessage(messages.unexpectedError))
    }
  }

  handleDeleteStore = async () => {
    const {
      history,
      deleteStore,
      setLoadingAction,
      teamStore: { shortId }
    } = this.props
    try {
      setLoadingAction(true)
      const response = await deleteStore({
        variables: { shortId }
      })
      const {
        data: {
          deleteTeamStore: { message: messageResp }
        }
      } = response
      message.success(messageResp)
      history.push('/admin/team-stores')
    } catch (err) {
      const errorMessage =
        err.graphQLErrors.map((x: any) => x.message) || err.message
      message.error(errorMessage, 5)
      setLoadingAction(false)
    }
  }

  buildTeamStore = async () => {
    const {
      setSavingAction,
      items,
      imagePreviewUrl,
      name,
      onDemand,
      userId,
      history,
      featured,
      storeId,
      storeShortId,
      updateStore,
      createStore,
      startDate,
      endDate
    } = this.props
    try {
      const itemsToSave = items.map((item: SelectedDesignType) => ({
        design_id: item.design.shortId,
        visible: item.visible
      }))
      setSavingAction(true)

      const teamStore = {
        id: storeId,
        short_id: storeShortId,
        name,
        featured,
        cutoffDate: startDate,
        deliveryDate: endDate,
        teamsizeId: 1,
        private: false,
        user_id: userId,
        items: itemsToSave,
        banner: imagePreviewUrl,
        demandMode: onDemand
      }
      if (storeShortId) {
        const response = await updateStore({
          variables: { teamStore }
        })
        const {
          data: {
            store: { message: messageResp }
          }
        } = response
        if (messageResp) {
          message.success(messageResp)
        }
      } else {
        await createStore({
          variables: { teamStore }
        })
      }
      history.push('/admin/team-stores')
    } catch (error) {
      message.error(
        `Something wrong happened. Please try again! ${error.message}`
      )
      setSavingAction(false)
    }
  }

  handleOnSetDisplay = async (id: number) => {
    const {
      setTeamStoreDisplay,
      orderBy,
      sort,
      searchText,
      formatMessage,
      currentPage = 0
    } = this.props
    try {
      const offset = (currentPage - 1) * TEAM_STORES_LIMIT

      await setTeamStoreDisplay({
        variables: { id },
        update: (store: any) => {
          const storedData = store.readQuery({
            query: GetTeamStoresQuery,
            variables: {
              limit: TEAM_STORES_LIMIT,
              offset,
              order: orderBy,
              orderAs: sort,
              searchText
            }
          })
          store.writeQuery({
            query: GetTeamStoresQuery,
            variables: {
              limit: TEAM_STORES_LIMIT,
              offset,
              order: orderBy,
              orderAs: sort,
              searchText
            },
            data: storedData
          })
        }
      })
    } catch (e) {
      message.error(formatMessage(messages.unexpectedError))
    }
  }
}

type OwnProps = {
  userToSearch?: string
}

const mapStateToProps = (state: any) => {
  const teamStoresAdmin = state.get('teamStoresAdmin').toJS()
  const langProps = state.get('languageProvider').toJS()
  return { ...teamStoresAdmin, ...langProps }
}

const TeamStoresAdminEnhance = compose(
  setTeamStoreFeaturedMutation,
  setTeamStorePricesMutation,
  setTeamStoreDisplayMutation,
  deleteTeamStoreMutation,
  createStoreMutation,
  updateStoreMutation,
  withApollo,
  connect(
    mapStateToProps,
    { ...TeamStoresActions, ...ThunkActions }
  ),
  graphql<Data>(getUsers, {
    options: (ownprops: OwnProps) => {
      const { userToSearch } = ownprops
      return {
        variables: {
          pattern: userToSearch
        },
        skip: !userToSearch,
        fetchPolicy: 'network-only'
      }
    },
    name: 'users'
  })
)(TeamStoresAdmin)

export default TeamStoresAdminEnhance
