/**
 * RoleList Component - Created by Jesús Apodaca on 19/03/20.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import { Container, Header, Row, Table } from './styledComponents'
import ItemOrder from '../ItemOrder'
import EmptyContainer from '../../EmptyContainer'
import { User } from '../../../types/common'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { getUserRolesQuery, changeActiveProduct } from './data'
import Pagination from 'antd/lib/pagination/Pagination'

const ROLES_LIMIT = 12

interface Props {
  data: any
  formatMessage: (messageDescriptor: any) => string
  currentPage: number
  orderBy: string
  withPagination?: boolean
  withoutPadding?: boolean
  customLimit?: number
  searchText?: string
  updateActiveProduct: (variables: {}) => Promise<any>
  onChangePage: (page: number) => void
}

const RoleList = ({
  formatMessage,
  currentPage,
  data: { getUsers },
  onChangePage,
  withPagination = true
}: Props) => {
  const users = get(getUsers, 'users', []) as User[]
  const fullCount = get(getUsers, 'fullCount', 0)
  return (
    <Container>
      <Table>
        <thead>
          <Row>
            <Header>{formatMessage(messages.clientId)}</Header>
            <Header>{formatMessage(messages.name)}</Header>
            <Header>{formatMessage(messages.account)}</Header>
            <Header>{formatMessage(messages.email)}</Header>
            <Header>{formatMessage(messages.userRole)}</Header>
          </Row>
        </thead>
        <tbody>
          {users.length ? (
            users.map(
              (
                { id, firstName, lastName, socialMethod, email, role }: User,
                index: number
              ) => {
                return (
                  <ItemOrder
                    key={index}
                    {...{
                      id,
                      firstName,
                      lastName,
                      socialMethod,
                      email,
                      role
                    }}
                  />
                )
              }
            )
          ) : (
            <EmptyContainer message={formatMessage(messages.empty)} />
          )}
        </tbody>
      </Table>
      {withPagination && (
        <Pagination
          current={currentPage}
          pageSize={ROLES_LIMIT}
          total={Number(fullCount)}
          onChange={onChangePage}
        />
      )}
    </Container>
  )
}

interface OwnProps {
  currentPage?: number
  orderBy?: string
  customLimit?: number
  searchText?: string
}

const RoleListEnhance = compose(
  graphql(changeActiveProduct, { name: 'updateActiveProduct' }),
  graphql(getUserRolesQuery, {
    options: ({ currentPage, searchText }: OwnProps) => {
      const offset = currentPage ? (currentPage - 1) * ROLES_LIMIT : 0
      return {
        variables: {
          limit: ROLES_LIMIT,
          offset,
          text: searchText
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
  withError,
  withLoading
)(RoleList)

export default RoleListEnhance
