/**
 * UsersAdmin Component - Created by eduardoquintero on 29/05/19.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { getUsersQuery } from './UsersList/data'
import { Route } from 'react-router-dom'
import get from 'lodash/get'
import {
  setAdminUserMutation,
  createUserMutation,
  assignRepUserMutation,
  setManagerMutation
} from './data'
import { USERS_LIMIT } from './constants'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import * as UsersAdminActions from './actions'
import { Container } from './styledComponents'
import List from './UsersList'
import messages from './messages'
import message from 'antd/lib/message'
import { sorts, User, Message, UserPermissions } from '../../types/common'
import SignupModal from './SignupModal'
import { validateEmail } from '../../utils/utilsFunctions'
import Options from './Options'
import { USERS, ADMIN_ROUTE } from '../AdminLayout/constants'

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
  note: string
  permissions: UserPermissions
  repSearchText: string
  managerSearchText: string
  setSearchManager: (value: string) => void
  setSearchRep: (value: string) => void
  setNoteText: (text: string) => void
  assignRepUser: (variables: {}) => Promise<User>
  assignManager: (variables: {}) => Promise<User>
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
      setLoadingAction,
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
      countryCode: initialCountryCode,
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
              searchText,
            },
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
              searchText,
            },
            data: storedData,
          })
        },
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
      permissions,
      lastName,
      repSearchText,
      managerSearchText,
      setNoteText,
      setLoadingAction,
      note,
      email,
      onInputChangeAction,
      history,
      showLocker,
      onChangeSectionAction,
      setSearchTextAction,
      openModal,
      onToggleModalAction,
      onResetModalAction,
      loading,
    } = this.props
    const access = permissions[USERS] || {}
    if (!access.view) {
      history.replace(ADMIN_ROUTE)
    }
    return (
      <Container>
        <Route
          path="/admin/users"
          exact={true}
          render={() => (
            <List
              {...{
                formatMessage,
                repSearchText,
                managerSearchText,
                currentPage,
                orderBy,
                sort,
                searchText
              }}
              onSortClick={this.handleOnSortClick}
              onChangePage={this.handleOnChangePage}
              canEdit={access.edit}
              onSetAdministrator={this.handleOnSetAdministrator}
              onSelectUser={this.handleOnSelectUser}
              searchReps={this.searchReps}
              searchManager={this.searchManager}
              setUserRep={this.setUserRep}
              setManager={this.setManager}
              setSearchText={setSearchTextAction}
              onAddNewUser={onToggleModalAction}
              withoutPadding={true}
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
                  setNoteText,
                  note,
                  loading,
                  setLoadingAction,
                  setDesignSelected,
                  showLocker,
                }}
                canEdit={access.edit}
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
  userQuery = () => {
    const { orderBy, sort, searchText, currentPage } = this.props
    const offset = currentPage ? (currentPage - 1) * USERS_LIMIT : 0
    return {
      query: getUsersQuery,
      variables: {
        limit: USERS_LIMIT,
        offset,
        order: orderBy,
        orderAs: sort,
        searchText
      },
      options: {
        fetchPolicy: 'network-only'
      }
    }
  }
  handleOnSetAdministrator = async (id: boolean) => {
    const {
      setAdminUser,
      formatMessage,
    } = this.props
    try {
      const query = this.userQuery()
      await setAdminUser({
        variables: { id },
        refetchQueries: [query]
      })
    } catch (e) {
      message.error(formatMessage(messages.unexpectedError))
    }
  }
  setUserRep = async (repUser: string, userId: string) => {
    const { assignRepUser, formatMessage } = this.props
    try {
      const query = this.userQuery()
      await assignRepUser({
        variables: { userId, repUser },
        refetchQueries: [query]
      })
    } catch (e) {
      message.error(formatMessage(messages.unexpectedError))
    }
  }
  setManager = async (manager: string, userId: string) => {
    const { assignManager, formatMessage } = this.props
    try {
      const query = this.userQuery()
      await assignManager({
        variables: { userId, manager },
        refetchQueries: [query]
      })
    } catch (e) {
      message.error(formatMessage(messages.unexpectedError))
    }
  }
  searchManager = (value: string) => {
    const { setSearchManager } = this.props
    setSearchManager(value)
  }
  searchReps = (value: string) => {
    const { setSearchRep } = this.props
    setSearchRep(value)
  }
  handleOnSaveUser = () => { }
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
    ...app,
  }
}

const UsersAdminEnhance = compose(
  setAdminUserMutation,
  assignRepUserMutation,
  setManagerMutation,
  createUserMutation,
  connect(mapStateToProps, { ...UsersAdminActions })
)(UsersAdmin)

export default UsersAdminEnhance
