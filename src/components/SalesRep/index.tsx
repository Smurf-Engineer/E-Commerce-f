/**
 * SalesRep Component - Created by Jesús Apodaca on 23/03/20.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as SalesRepActions from './actions'
import {
  Container,
  ScreenTitle,
  SearchInput,
  HeaderList,
  FormContainer,
  StyledInput,
  SaveButton,
  CancelButton,
  Buttons,
  Title,
  AddButton,
  SpinLoader
} from './styledComponents'
import List from './RepList'
import messages from './messages'
import Message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import { addRepUserMutation, getRepUsers, editRepUserMutation, deleteRepUserMutation } from './data'
import { User, UsersResult, QueryProps } from '../../types/common'
import get from 'lodash/get'
import { REPS_LIMIT } from './constants'

interface Data extends QueryProps {
  repUsers: UsersResult
}

interface Props {
  history: any
  currentPage: number
  name: string
  data: Data
  shortId: string
  open: boolean
  loading: boolean
  lastName: string
  searchText: string
  selectUser: (user: User) => void
  setLoading: (loading: boolean) => void
  addRepUser: (variables: {}) => Promise<User>
  editRepUser: (variables: {}) => Promise<User>
  setOpenModal: (open: boolean) => void
  setNameAction: (field: string, value: string) => void
  formatMessage: (messageDescriptor: any) => string
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setSearchTextAction: (searchText: string) => void
}

class SalesRep extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }
  handleNameChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { setNameAction } = this.props
    const {
      currentTarget: { value, id }
    } = evt
    evt.persist()
    setNameAction(id, value)
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { setSearchTextAction } = this.props
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    setSearchTextAction(value)
  }

  onOpen = () => {
    const { setOpenModal } = this.props
    setOpenModal(true)
  }

  onClose = () => {
    const { setOpenModal } = this.props
    setOpenModal(false)
  }

  handleSelectUser = (id: number) => {
    const { data: { repUsers }, selectUser } = this.props
    const user = get(repUsers, ['users', id], {})
    if (user) {
      selectUser(user)
    }
  }

  saveUser = async () => {
    const { shortId } = this.props
    if (shortId) {
      await this.editUser()
    } else {
      await this.addUser()
    }
  }

  handleDeleteUser = async (shortId: string) => {
    const {
      setLoading,
      formatMessage,
    } = this.props
    try {
      console.log('shortId:', shortId)
      setLoading(true)
      // await deleteRepUser({
      //   variables: { shortId }
      // })
      Message.success(formatMessage(messages.updated))
    } catch (e) {
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    } finally {
      setLoading(false)
    }
  }

  editUser = async () => {
    const {
      setLoading,
      formatMessage,
      name: firstName,
      lastName,
      shortId,
      editRepUser,
      setOpenModal
    } = this.props
    try {
      setLoading(true)
      await editRepUser({
        variables: { firstName, lastName, shortId }
      })
      setOpenModal(false)
      Message.success(formatMessage(messages.updated))
    } catch (e) {
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    } finally {
      setLoading(false)
    }
  }

  addUser = async () => {
    const {
      name: firstName,
      lastName,
      setLoading,
      addRepUser,
      currentPage,
      searchText,
      formatMessage,
      setOpenModal
    } = this.props
    try {
      setLoading(true)
      await addRepUser({
        variables: { firstName, lastName },
        update: (store: any, dataInternal: User) => {
          const user = get(dataInternal, 'data.userResult', {})
          if (user) {
            const offset = currentPage ? (currentPage - 1) * REPS_LIMIT : 0
            const storedData = store.readQuery({
              query: getRepUsers,
              variables: {
                limit: REPS_LIMIT,
                offset,
                text: searchText
              }
            })
            const users = get(storedData, 'repUsers.users', []) as User[]
            users.unshift(user)
            store.writeQuery({
              query: getRepUsers,
              variables: {
                limit: REPS_LIMIT,
                offset,
                text: searchText
              },
              data: storedData
            })
            setOpenModal(false)
            Message.success(formatMessage(messages.added))
          }
        }
      })
    } catch (e) {
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    } finally {
      setLoading(false)
    }
  }

  render() {
    const {
      currentPage,
      formatMessage,
      open,
      loading,
      searchText,
      name,
      lastName,
      data: { repUsers, loading: loadingList }
    } = this.props
    const users = get(repUsers, 'users', []) as User[]
    const fullCount = get(repUsers, 'fullCount', 0)
    return (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <HeaderList>
          <AddButton onClick={this.onOpen}>
            {formatMessage(messages.addRep)}
          </AddButton>
          <SearchInput
            value={searchText}
            onChange={this.handleInputChange}
            placeholder={formatMessage(messages.search)}
          />
        </HeaderList>
        <List
          {...{ formatMessage, currentPage, searchText, users, fullCount }}
          loading={loadingList}
          deleteUser={this.handleDeleteUser}
          selectUser={this.handleSelectUser}
          onChangePage={this.handleOnChangePage}
        />
        <Modal visible={open} footer={null} closable={false} width="442px">
          <Title>{formatMessage(messages.addSalesRep)}</Title>
          <FormContainer>
            <StyledInput
              id="name"
              topText={formatMessage(messages.firstNameLabel)}
              value={name}
              onChange={this.handleNameChange}
            />
            <StyledInput
              id="lastName"
              topText={formatMessage(messages.lastNameLabel)}
              value={lastName}
              onChange={this.handleNameChange}
            />
          </FormContainer>
          {loading ? (
            <SpinLoader />
          ) : (
              <Buttons>
                <SaveButton disabled={!name || !lastName} onClick={this.saveUser}>
                  {formatMessage(messages.save)}
                </SaveButton>
                <CancelButton onClick={this.onClose}>
                  {formatMessage(messages.cancel)}
                </CancelButton>
              </Buttons>
            )}
        </Modal>
      </Container>
    )
  }
}

interface OwnProps {
  currentPage?: number
  searchText?: string
}

const mapStateToProps = (state: any) => state.get('salesRep').toJS()

const SalesRepEnhance = compose(
  connect(mapStateToProps, { ...SalesRepActions }),
  graphql(addRepUserMutation, { name: 'addRepUser' }),
  graphql(editRepUserMutation, { name: 'editRepUser' }),
  graphql(deleteRepUserMutation, { name: 'deleteRepUser' }),
  graphql(getRepUsers, {
    options: ({ currentPage, searchText }: OwnProps) => {
      const offset = currentPage ? (currentPage - 1) * REPS_LIMIT : 0
      return {
        variables: {
          limit: REPS_LIMIT,
          offset,
          text: searchText
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
)(SalesRep)

export default SalesRepEnhance
