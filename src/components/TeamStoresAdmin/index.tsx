/**
 * TeamStoresAdmin Component - Created by eduardoquintero on 15/07/19.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import { compose } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { setTeamStoreFeaturedMutation } from './data'
import * as TeamStoresActions from './actions'
import { Container, ScreenTitle, SearchInput } from './styledComponents'
import messages from './messages'
import { sorts, Message } from '../../types/common'

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
    const { formatMessage } = this.props

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
