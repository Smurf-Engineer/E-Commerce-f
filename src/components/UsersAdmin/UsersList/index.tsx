/**
 * UsersList Component - Created by eduardoquintero on 29/05/19.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import { Container, Header, Row, Table } from './styledComponents'
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
  interactiveHeaders: boolean
  currentPage: number
  orderBy: string
  sort: sorts
  withPagination?: boolean
  withoutPadding?: boolean
  searchText: string
  onSortClick: (label: string, sort: sorts) => void
  onChangePage: (page: number) => void
  onSetAdministrator: (id: number) => void
}

const UsersList = ({
  formatMessage,
  interactiveHeaders,
  orderBy,
  sort,
  currentPage,
  data: { usersQuery },
  onSortClick,
  onChangePage,
  withPagination = true,
  withoutPadding = false,
  onSetAdministrator
}: Props) => {
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
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'first_name'}
              label={formatMessage(messages.name)}
              sort={orderBy === 'first_name' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'social_method'}
              label={formatMessage(messages.accountType)}
              sort={orderBy === 'social_method' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'administrator'}
              label={formatMessage(messages.admin)}
              sort={orderBy === 'administrator' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'email'}
              label={formatMessage(messages.email)}
              sort={orderBy === 'email' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'netsuite_internal'}
              label={formatMessage(messages.netsuiteId)}
              sort={orderBy === 'netsuite_internal' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
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
        netsuiteId = ''
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
            netsuiteId
          }}
        />
      )
    }
  )

  return (
    <Container {...{ withoutPadding }}>
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
