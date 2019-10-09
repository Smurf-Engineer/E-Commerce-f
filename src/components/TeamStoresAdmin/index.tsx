/**
 * TeamStoresAdmin Component - Created by eduardoquintero on 15/07/19.
 */
import * as React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import { compose, withApollo } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import message from 'antd/lib/message'
import { GetTeamStoresQuery } from './TeamStoresList/data'
import {
  setTeamStoreFeaturedMutation,
  setTeamStorePricesMutation,
  setTeamStoreDisplayMutation,
  createStoreMutation
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
  SelectedDesignType
} from '../../types/common'
import { TEAM_STORES_LIMIT } from './constants'
import config from '../../config'

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
  file: Blob
  cutoffDate: string
  deliveryDate: string
  resetForm: () => void
  createStore: (variables: {}) => void
  setSavingAction: (saving: boolean) => void
  setLoading: (loading: boolean) => void
  setImage: (file: Blob, imagePreviewUrl: string, openModal: boolean) => void
  openModal: (opened: boolean) => void
  setFeaturedAction: (featured: boolean) => void
  setNameAction: (name: string) => void
  deleteItemSelectedAction: (index: number) => void
  setItemVisibleAction: (index: number, visible: boolean) => void
  moveRowAction: (index: number, row: any) => void
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
      setItemsAddAction,
      setPaginationData,
      currentPageModal,
      setOpenLockerAction,
      deleteItemSelectedAction,
      setNameAction,
      setImage,
      imagePreviewUrl,
      setItemVisibleAction,
      setFeaturedAction,
      moveRowAction,
      saving,
      userId,
      resetDataAction,
      name,
      onDemand,
      featured,
      openModal,
      limit,
      openLocker,
      offset,
      items,
      loading
    } = this.props

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
              <AddTeamStoreButton onClick={this.handleGoToCreateStore}>
                <FormattedMessage {...messages.addTeamStore} />
              </AddTeamStoreButton>
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
              {...{ formatMessage, history, teamStore, currencies, loading }}
              getTeamStoreData={this.handleGetTeamStoreDetails}
              handleOnSetPrice={setPriceAction}
              handleOnSave={this.handleOnSaveItem}
              onSetFeatured={this.handleOnSetFeatured}
            />
          )}
        />
        <Route
          path="/admin/team-stores/create"
          exact={true}
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
                limit,
                userId,
                saving,
                onDemand,
                featured,
                setNameAction,
                name,
                setImage,
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
                offset,
                teamSizeRange,
                currentCurrency,
                openCropper
              }}
              buildTeamStore={this.buildTeamStore}
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
        currency => ({
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

  buildTeamStore = async () => {
    const {
      setSavingAction,
      items,
      file,
      name,
      onDemand,
      userId,
      history,
      featured,
      createStore,
      cutoffDate,
      deliveryDate
    } = this.props
    try {
      let bannerResp = ''
      const itemsToSave = items.map((item: SelectedDesignType) => ({
        design_id: item.design.shortId,
        visible: item.visible
      }))
      setSavingAction(true)
      if (file) {
        const formData = new FormData()
        formData.append('file', file as any, 'banner.jpeg')
        const user = JSON.parse(localStorage.getItem('user') || '')
        const uploadResp = await fetch(`${config.graphqlUriBase}uploadBanner`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: formData
        })
        const { image } = await uploadResp.json()
        bannerResp = image
      }
      const teamStore = {
        name,
        featured,
        cutoffDate,
        deliveryDate,
        teamsizeId: 1,
        private: false,
        user_id: userId,
        items: itemsToSave,
        banner: bannerResp,
        demandMode: onDemand
      }
      await createStore({
        variables: { teamStore }
      })
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

const mapStateToProps = (state: any) => {
  const teamStoresAdmin = state.get('teamStoresAdmin').toJS()
  const langProps = state.get('languageProvider').toJS()
  return { ...teamStoresAdmin, ...langProps }
}

const TeamStoresAdminEnhance = compose(
  setTeamStoreFeaturedMutation,
  setTeamStorePricesMutation,
  setTeamStoreDisplayMutation,
  createStoreMutation,
  withApollo,
  connect(
    mapStateToProps,
    { ...TeamStoresActions, ...ThunkActions }
  )
)(TeamStoresAdmin)

export default TeamStoresAdminEnhance
