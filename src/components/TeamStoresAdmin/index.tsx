/**
 * TeamStoresAdmin Component - Created by eduardoquintero on 15/07/19.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import { compose } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import message from 'antd/lib/message'
import { GetTeamStoresQuery } from './TeamStoresList/data'
import { setTeamStoreFeaturedMutation } from './data'
import * as TeamStoresActions from './actions'
import { Container, ScreenTitle, SearchInput } from './styledComponents'
import List from './TeamStoresList'
import messages from './messages'
import { sorts, Message } from '../../types/common'
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
  formatMessage: (messageDescriptor: Message, params?: any) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setSearchTextAction: (searchText: string) => void
  setLoadingAction: (loading: boolean) => void
  setTeamStoreFeatured: (variables: {}) => void
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
    const { currentPage, orderBy, sort, formatMessage, searchText } = this.props

    return (
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
        />
      </Container>
    )
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
      currentPage
    } = this.props
    try {
      const offset = currentPage ? (currentPage - 1) * TEAM_STORES_LIMIT : 0

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
  connect(
    mapStateToProps,
    { ...TeamStoresActions }
  )
)(TeamStoresAdmin)

export default TeamStoresAdminEnhance
