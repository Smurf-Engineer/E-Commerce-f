/**
 * UsersAdmin Component - Created by eduardoquintero on 29/05/19.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { getUsersQuery } from './UsersList/data'
import { Route } from 'react-router-dom'
import { setAdminUserMutation } from './data'
import { USERS_LIMIT } from './constants'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import * as UsersAdminActions from './actions'
import { Container } from './styledComponents'
import List from './UsersList'
import messages from './messages'
import message from 'antd/lib/message'
import { sorts } from '../../types/common'
import Options from './Options'

interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  searchText: string
  showLocker: boolean
  formatMessage: (messageDescriptor: any) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setOrderIdAction: (orderId: string) => void
  setSearchTextAction: (searchText: string) => void
  setAdminUser: (variables: {}) => void
  onChangeSectionAction: (section: boolean) => void
}
interface StateProps {
  searchValue: string
}
class UsersAdmin extends React.Component<Props, StateProps> {
  async componentDidMount() {
    await LoadScripts(threeDScripts)
  }
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }
  handleOnSelectUser = (id: string) => {
    const { history } = this.props
    history.push(`/admin/users/${id}`)
  }

  render() {
    const {
      currentPage,
      orderBy,
      sort,
      formatMessage,
      searchText,
      history,
      showLocker,
      onChangeSectionAction,
      setSearchTextAction
    } = this.props

    return (
      <Container>
        <Route
          path="/admin/users"
          exact={true}
          render={() => (
            <List
              {...{ formatMessage, currentPage, orderBy, sort, searchText }}
              onSortClick={this.handleOnSortClick}
              onChangePage={this.handleOnChangePage}
              onSetAdministrator={this.handleOnSetAdministrator}
              onSelectUser={this.handleOnSelectUser}
              setSearchText={setSearchTextAction}
            />
          )}
        />
        <Route
          path="/admin/users/:id"
          render={() => (
            <div>
              <Options
                {...{
                  formatMessage,
                  history,
                  showLocker
                }}
                onChangeSection={onChangeSectionAction}
              />
            </div>
          )}
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
}

const mapStateToProps = (state: any) => state.get('usersAdmin').toJS()

const UsersAdminEnhance = compose(
  setAdminUserMutation,
  connect(mapStateToProps, { ...UsersAdminActions })
)(UsersAdmin)

export default UsersAdminEnhance
