/**
 * UsersList Component - Created by eduardoquintero on 29/05/19.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import {
  Container,
  Header,
  Row,
  Table,
  ScreenTitle,
  SearchInput
} from './styledComponents'
import debounce from 'lodash/debounce'
import HeaderTable from '../HeaderOrdersTable'
import ItemOrder from '../ItemOrder'
import { USERS_LIMIT } from '../constants'
import EmptyContainer from '../../EmptyContainer'
import { sorts, QueryProps, User } from '../../../types/common'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { getUsersQuery } from './data'
import Pagination from 'antd/lib/pagination/Pagination'

interface Data extends QueryProps {
  usersQuery: {
    fullCount: number
    users: User[]
  }
}

interface Props {
  data: Data
  formatMessage: (messageDescriptor: any) => string
  currentPage: number
  orderBy: string
  sort: sorts
  withPagination?: boolean
  withoutPadding?: boolean
  searchText: string
  onSortClick: (label: string, sort: sorts) => void
  onChangePage: (page: number) => void
  onSetAdministrator: (id: number) => void
  onSelectUser: (id: string, name: string) => void
  setSearchText: (searchText: string) => void
}
interface StateProps {
  searchValue: string
}

class UsersList extends React.Component<Props, StateProps> {
  state = {
    searchValue: ''
  }
  raiseSearchWhenUserStopsTyping = debounce(
    () => this.props.setSearchText(this.state.searchValue),
    600
  )
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    this.setState({ searchValue: value }, () => {
      this.raiseSearchWhenUserStopsTyping()
    })
  }
  render() {
    const {
      formatMessage,
      orderBy,
      sort,
      currentPage,
      data: { usersQuery },
      onSortClick,
      onChangePage,
      withPagination = true,
      withoutPadding = false,
      onSetAdministrator,
      onSelectUser,
      searchText
    } = this.props

    const users = get(usersQuery, 'users', []) as User[]
    const fullCount = get(usersQuery, 'fullCount', 0)

    if (!users || !users.length) {
      return <EmptyContainer message={formatMessage(messages.emptyMessage)} />
    }

    const header = (
      <MediaQuery maxWidth={768}>
        {matches => {
          if (matches) {
            return (
              <Row>
                <Header>{formatMessage(messages.clientID)}</Header>
                <Header>{formatMessage(messages.name)}</Header>
                <Header>{formatMessage(messages.accountType)}</Header>
                <Header>{formatMessage(messages.admin)}</Header>
                <Header>{formatMessage(messages.email)}</Header>
                <Header>{formatMessage(messages.netsuiteId)}</Header>
              </Row>
            )
          }
          return (
            <Row>
              <HeaderTable
                id={'id'}
                label={formatMessage(messages.clientID)}
                sort={orderBy === 'id' ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={'first_name'}
                label={formatMessage(messages.name)}
                sort={orderBy === 'first_name' ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={'social_method'}
                label={formatMessage(messages.accountType)}
                sort={orderBy === 'social_method' ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={'administrator'}
                label={formatMessage(messages.admin)}
                sort={orderBy === 'administrator' ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={'email'}
                label={formatMessage(messages.email)}
                sort={orderBy === 'email' ? sort : 'none'}
                {...{ onSortClick }}
              />
              <HeaderTable
                id={'netsuite_internal'}
                label={formatMessage(messages.netsuiteId)}
                sort={orderBy === 'netsuite_internal' ? sort : 'none'}
                {...{ onSortClick }}
              />
            </Row>
          )
        }}
      </MediaQuery>
    )
    const userItems = users.map(
      (
        {
          id,
          email,
          firstName,
          lastName,
          socialMethod,
          administrator,
          netsuiteId = '',
          shortId
        }: User,
        index: number
      ) => {
        return (
          <ItemOrder
            key={index}
            {...{
              id,
              email,
              firstName,
              lastName,
              socialMethod,
              administrator,
              onSetAdministrator,
              onSelectUser,
              netsuiteId,
              shortId
            }}
          />
        )
      }
    )

    return (
      <Container {...{ withoutPadding }}>
        <ScreenTitle>{formatMessage(messages.title)}</ScreenTitle>
        <SearchInput
          value={this.state.searchValue || searchText}
          onChange={this.handleInputChange}
          placeholder={formatMessage(messages.search)}
          autoFocus={true}
        />
        <Table>
          <thead>{header}</thead>
          <tbody>{userItems}</tbody>
        </Table>
        {withPagination ? (
          <Pagination
            current={currentPage}
            pageSize={USERS_LIMIT}
            total={Number(fullCount)}
            onChange={onChangePage}
          />
        ) : null}
      </Container>
    )
  }
}

interface OwnProps {
  currentPage?: number
  orderBy?: string
  sort?: string
  customLimit?: number
  searchText?: string
}

const UsersListEnhance = compose(
  graphql(getUsersQuery, {
    options: ({
      currentPage,
      orderBy,
      sort,
      customLimit,
      searchText
    }: OwnProps) => {
      const limit = customLimit !== undefined ? customLimit : USERS_LIMIT
      const offset = currentPage ? (currentPage - 1) * limit : 0
      return {
        variables: {
          limit,
          offset,
          order: orderBy,
          orderAs: sort,
          searchText
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
  withError,
  withLoading
)(UsersList)

export default UsersListEnhance
