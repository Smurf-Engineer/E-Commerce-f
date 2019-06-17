/**
 * UsersAdmin Component - Created by eduardoquintero on 29/05/19.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import { getUsersQuery } from './UsersList/data'
import { FormattedMessage } from 'react-intl'
import { setAdminUserMutation } from './data'
import { USERS_LIMIT } from './constants'
import * as UsersAdminActions from './actions'
import { Container, ScreenTitle, SearchInput } from './styledComponents'
import List from './UsersList'
import messages from './messages'
import message from 'antd/lib/message'
import { sorts } from '../../types/common'

interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  searchText: string
  formatMessage: (messageDescriptor: any) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setOrderIdAction: (orderId: string) => void
  setSearchTextAction: (searchText: string) => void
  setAdminUser: (variables: {}) => void
}
interface StateProps {
  searchValue: string
}
class UsersAdmin extends React.Component<Props, StateProps> {
  raiseSearchWhenUserStopsTyping = debounce(
    () => this.props.setSearchTextAction(this.state.searchValue),
    600
  )
  constructor(props: Props) {
    super(props)
    this.state = {
      searchValue: ''
    }
  }
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
          onSetAdministrator={this.handleOnSetAdministrator}
        />
      </Container>
    )
  }
  handleOnSetAdministrator = async (id: boolean) => {
    const {
      setAdminUser,
      orderBy,
      sort,
      searchText,
      formatMessage
    } = this.props
    try {
      await setAdminUser({
        variables: { id },
        refetchQueries: [
          {
            query: getUsersQuery,
            variables: {
              limit: USERS_LIMIT,
              offset: 0,
              order: orderBy,
              orderAs: sort,
              searchText
            },
            options: {
              fetchPolicy: 'network-only'
            }
          }
        ]
      })
    } catch (e) {
      message.error(formatMessage(messages.unexpectedError))
    }
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
    this.setState({ searchValue: value }, () => {
      this.raiseSearchWhenUserStopsTyping()
    })
  }
}

const mapStateToProps = (state: any) => state.get('usersAdmin').toJS()

const UsersAdminEnhance = compose(
  setAdminUserMutation,
  connect(
    mapStateToProps,
    { ...UsersAdminActions }
  )
)(UsersAdmin)

export default UsersAdminEnhance
