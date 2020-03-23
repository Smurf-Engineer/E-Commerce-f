/**
 * SalesRep Component - Created by Jesús Apodaca on 23/03/20.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import { Container, Header, Row, Table, RepDiv, Cell } from './styledComponents'
import EmptyContainer from '../../EmptyContainer'
import { User, UsersResult, QueryProps } from '../../../types/common'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { getRepUsers, changeRoleMutation } from './data'
import Pagination from 'antd/lib/pagination/Pagination'

const REPS_LIMIT = 12

interface Data extends QueryProps {
  repUsers: UsersResult
}

interface Props {
  data: Data
  formatMessage: (messageDescriptor: any) => string
  currentPage: number
  searchText?: string
  roleChangeMutation: (variables: {}) => Promise<User>
  onChangePage: (page: number) => void
}

class RepList extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      currentPage,
      data: { repUsers },
      onChangePage
    } = this.props
    const users = get(repUsers, 'users', []) as User[]
    const fullCount = get(repUsers, 'fullCount', 0)
    return (
      <Container>
        <Table>
          <thead>
            <Row>
              <Header>{formatMessage(messages.firstName)}</Header>
              <Header>{formatMessage(messages.lastName)}</Header>
            </Row>
          </thead>
          <tbody>
            {users.length ? (
              users.map(({ firstName, lastName }: User, index: number) => (
                <RepDiv key={index}>
                  <Cell width="256px">{firstName}</Cell>
                  <Cell>{lastName}</Cell>
                </RepDiv>
              ))
            ) : (
              <EmptyContainer message={formatMessage(messages.empty)} />
            )}
          </tbody>
        </Table>
        <Pagination
          current={currentPage}
          pageSize={REPS_LIMIT}
          total={Number(fullCount)}
          onChange={onChangePage}
        />
      </Container>
    )
  }
}

interface OwnProps {
  currentPage?: number
  searchText?: string
}

const RepListEnhance = compose(
  graphql(changeRoleMutation, { name: 'roleChangeMutation' }),
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
  withError,
  withLoading
)(RepList)

export default RepListEnhance
