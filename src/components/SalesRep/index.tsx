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
import { addRepUserMutation, getRepUsers } from './RepList/data'
import { User, UserPermissions } from '../../types/common'
import get from 'lodash/get'
import { REPS_LIMIT } from './constants'
import { SALES_REP } from '../AdminLayout/constants'

interface Props {
  history: any
  currentPage: number
  name: string
  open: boolean
  loading: boolean
  lastName: string
  searchText: string
  permissions: UserPermissions
  setLoading: (loading: boolean) => void
  addRepUser: (variables: {}) => Promise<User>
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

  saveUser = async () => {
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
      permissions
    } = this.props
    const access = permissions[SALES_REP] || {}
    if (!access.view) {
      return null
    }
    return (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <HeaderList>
          {access.edit &&
            <AddButton onClick={this.onOpen}>
              {formatMessage(messages.addRep)}
            </AddButton>
          }
          <SearchInput
            value={searchText}
            onChange={this.handleInputChange}
            placeholder={formatMessage(messages.search)}
          />
        </HeaderList>
        <List
          {...{ formatMessage, currentPage, searchText }}
          onChangePage={this.handleOnChangePage}
        />
        <Modal visible={open && access.edit} footer={null} closable={false} width="442px">
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

const mapStateToProps = (state: any) => state.get('salesRep').toJS()

const SalesRepEnhance = compose(
  graphql(addRepUserMutation, { name: 'addRepUser' }),
  connect(mapStateToProps, { ...SalesRepActions })
)(SalesRep)

export default SalesRepEnhance
