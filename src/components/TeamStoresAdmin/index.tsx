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
  setTeamStorePricesMutation
} from './data'
import TeamStoreDetails from './TeamStoreDetails'
import * as TeamStoresActions from './actions'
import * as ThunkActions from './thunkActions'
import { Container, ScreenTitle, SearchInput } from './styledComponents'
import List from './TeamStoresList'
import messages from './messages'
import {
  sorts,
  Message,
  Currency,
  TeamStoreAdminType
} from '../../types/common'
import { TEAM_STORES_LIMIT } from './constants'

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
  loading: boolean
  teamStore: TeamStoreAdminType
  currencies: Currency[]
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
      setPriceAction,
      teamStore,
      currencies,
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
                onSetFeatured={this.handleOnSetFeatured}
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

    const teamStoreItem = teamStore.items[index]
    const prices = Object.keys(teamStoreItem.pricesByCurrency).map(
      currency => ({
        shortName: currency,
        price: teamStoreItem.pricesByCurrency[currency]
      })
    )
    setLoadingItemAction(index, true)
    try {
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
}

const mapStateToProps = (state: any) => state.get('teamStoresAdmin').toJS()

const TeamStoresAdminEnhance = compose(
  setTeamStoreFeaturedMutation,
  setTeamStorePricesMutation,
  withApollo,
  connect(
    mapStateToProps,
    { ...TeamStoresActions, ...ThunkActions }
  )
)(TeamStoresAdmin)

export default TeamStoresAdminEnhance
