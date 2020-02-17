/**
 * UsersAdmin Component - Created by eduardoquintero on 29/05/19.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { getUsersQuery } from './UsersList/data'
import { Route } from 'react-router-dom'
import get from 'lodash/get'
import { setAdminUserMutation, createUserMutation } from './data'
import { USERS_LIMIT } from './constants'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import * as UsersAdminActions from './actions'
import { Container } from './styledComponents'
import List from './UsersList'
import messages from './messages'
import message from 'antd/lib/message'
import { sorts, User, Message } from '../../types/common'
import SignupModal from './SignupModal'
import { validateEmail } from '../../utils/utilsFunctions'
import Options from './Options'

interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  searchText: string
  name: string
  lastName: string
  email: string
  showLocker: boolean
  initialCountryCode: string
  openModal: boolean
  loading: boolean
  designSelected: string
  setDesignSelected: (designId: string) => void
  formatMessage: (messageDescriptor: Message, params?: object) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setSearchTextAction: (searchText: string) => void
  setAdminUser: (variables: {}) => void
  onInputChangeAction: (id: string, value: string) => void
  onChangeSectionAction: (section: boolean) => void
  addUser: (variables: {}) => void
  onToggleModalAction: () => void
  onResetModalAction: () => void
  setLoadingAction: (loading: boolean) => void
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

  handleCreateAccount = async () => {
    const {
      addUser,
      formatMessage,
      initialCountryCode,
      name,
      lastName,
      email,
      orderBy,
      sort,
      searchText,
      onResetModalAction,
      setLoadingAction
    } = this.props

    if (!name || !lastName || !email) {
      message.error(formatMessage(messages.requiredFieldsError))
      return
    }

    if (!validateEmail(email)) {
      message.error(formatMessage(messages.invalidEmail))
      return
    }

    const user = {
      email: email.toLowerCase(),
      first_name: name,
      last_name: lastName,
      countryCode: initialCountryCode
    }

    try {
      setLoadingAction(true)
      await addUser({
        variables: { user },
        update: (store: any, userData: User) => {
          const newUser = get(userData, 'data.createUserFromAdmin')
          /* if (newUser) {
            message.success(
              formatMessage(messages.userAdded, {
                name
              })
            )
          } */
          const storedData = store.readQuery({
            query: getUsersQuery,
            variables: {
              limit: USERS_LIMIT,
              offset: 0,
              order: orderBy,
              orderAs: sort,
              searchText
            }
          })
          const usersList = get(storedData, 'usersQuery.users')
          usersList.unshift(newUser)
          store.writeQuery({
            query: getUsersQuery,
            variables: {
              limit: USERS_LIMIT,
              offset: 0,
              order: orderBy,
              orderAs: sort,
              searchText
            },
            data: storedData
          })
        }
      })
      onResetModalAction()
    } catch (error) {
      setLoadingAction(false)
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
    }
  }

  render() {
    const {
      currentPage,
      orderBy,
      sort,
      formatMessage,
      searchText,
      designSelected,
      setDesignSelected,
      name,
      lastName,
      email,
      onInputChangeAction,
      history,
      showLocker,
      onChangeSectionAction,
      setSearchTextAction,
      openModal,
      onToggleModalAction,
      onResetModalAction,
      loading
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
              onAddNewUser={onToggleModalAction}
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
                  designSelected,
                  setDesignSelected,
                  showLocker
                }}
                onChangeSection={onChangeSectionAction}
              />
            </div>
          )}
        />
        <SignupModal
          {...{ formatMessage, name, lastName, email, loading }}
          onSaveUser={this.handleCreateAccount}
          handleOnInputChange={onInputChangeAction}
          open={openModal}
          onClose={onResetModalAction}
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
  handleOnSaveUser = () => {}
  handleOnSortClick = (label: string, sort: sorts) => {
    const { setOrderByAction } = this.props
    setOrderByAction(label, sort)
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }
}

const mapStateToProps = (state: any) => {
  const usersAdmin = state.get('usersAdmin').toJS()
  const app = state.get('app').toJS()
  return {
    ...usersAdmin,
    ...app
  }
}

const UsersAdminEnhance = compose(
  setAdminUserMutation,
  createUserMutation,
  connect(mapStateToProps, { ...UsersAdminActions })
)(UsersAdmin)

export default UsersAdminEnhance
