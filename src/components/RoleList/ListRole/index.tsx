/**
 * RoleList Component - Created by Jesús Apodaca on 19/03/20.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import Message from 'antd/lib/message'
import { Container, Header, Row, Table } from './styledComponents'
import ItemOrder from '../ItemOrder'
import EmptyContainer from '../../EmptyContainer'
import { User, UsersResult, QueryProps, Role } from '../../../types/common'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { getUserRolesQuery, changeRoleMutation } from './data'
import Pagination from 'antd/lib/pagination/Pagination'

const ROLES_LIMIT = 12

interface Data extends QueryProps {
  getUsers: UsersResult
}

interface Props {
  data: Data
  formatMessage: (messageDescriptor: any) => string
  currentPage: number
  filter: string
  roles: Role[]
  searchText?: string
  roleChangeMutation: (variables: {}) => Promise<User>
  onChangePage: (page: number) => void
}

class RoleList extends React.Component<Props, {}> {
  handleChangeRole = async (userId: number, roleId: string) => {
    const { roleChangeMutation } = this.props
    try {
      await roleChangeMutation({
        variables: { userId, roleId }
      })
    } catch (e) {
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    }
  }
  render() {
    const {
      formatMessage,
      currentPage,
      roles,
      data: { getUsers },
      onChangePage
    } = this.props
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
                ) => (
                  <ItemOrder
                    key={index}
                    changeRole={this.handleChangeRole}
                    {...{
                      id,
                      roles,
                      firstName,
                      lastName,
                      socialMethod,
                      email,
                      role
                    }}
                  />
                )
              )
            ) : (
              <EmptyContainer message={formatMessage(messages.empty)} />
            )}
          </tbody>
        </Table>
        <Pagination
          current={currentPage}
          pageSize={ROLES_LIMIT}
          total={Number(fullCount)}
          onChange={onChangePage}
        />
      </Container>
    )
  }
}

interface OwnProps {
  currentPage?: number
  orderBy?: string
  customLimit?: number
  filter?: string
  searchText?: string
}

const RoleListEnhance = compose(
  graphql(changeRoleMutation, { name: 'roleChangeMutation' }),
  graphql(getUserRolesQuery, {
    options: ({ currentPage, searchText, filter }: OwnProps) => {
      const offset = currentPage ? (currentPage - 1) * ROLES_LIMIT : 0
      return {
        variables: {
          limit: ROLES_LIMIT,
          offset,
          filter,
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
