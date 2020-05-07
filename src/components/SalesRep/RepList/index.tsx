/**
 * SalesRep Component - Created by Jesús Apodaca on 23/03/20.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  Header,
  Row,
  Table,
  RepDiv,
  Cell,
  LoadingContainer,
  DeleteButton
} from './styledComponents'
import EmptyContainer from '../../EmptyContainer'
import { User } from '../../../types/common'
import Pagination from 'antd/lib/pagination/Pagination'
import Spin from 'antd/lib/spin'
import { REPS_LIMIT } from '../constants'

interface Props {
  users: User[]
  loading?: boolean
  fullCount: number
  formatMessage: (messageDescriptor: any) => string
  currentPage: number
  searchText?: string
  roleChangeMutation: (variables: {}) => Promise<User>
  onChangePage: (page: number) => void
  selectUser: (id: number) => void
  deleteUser: (shortId: string) => void
}

class RepList extends React.Component<Props, {}> {
  handleEdit = (event: React.MouseEvent<EventTarget>) => {
    const {
      currentTarget: { id }
    } = event
    const { selectUser } = this.props
    selectUser(id)
  }
  handleDelete = (event: React.MouseEvent<EventTarget>) => {
    const {
      currentTarget: { id }
    } = event
    event.stopPropagation()
    const { deleteUser } = this.props
    deleteUser(id)
  }
  render() {
    const {
      formatMessage,
      currentPage,
      users,
      fullCount,
      loading,
      onChangePage
    } = this.props
    return (
      <Container>
        {loading ? (
          <LoadingContainer>
            <Spin size="large" />
          </LoadingContainer>
        ) : (
            <Table>
              <thead>
                <Row>
                  <Header>{formatMessage(messages.firstName)}</Header>
                  <Header>{formatMessage(messages.lastName)}</Header>
                  <Header />
                </Row>
              </thead>
              <tbody>
                {users.length ? (
                  users.map(({ firstName, lastName, shortId }: User, index: number) => (
                    <RepDiv key={index} id={index} onClick={this.handleEdit}>
                      <Cell width="256px">{firstName}</Cell>
                      <Cell>{lastName}</Cell>
                      <Cell width="100px">
                        <DeleteButton id={shortId} onClick={this.handleDelete}>
                          {formatMessage(messages.delete)}
                        </DeleteButton>
                      </Cell>
                    </RepDiv>
                  ))
                ) : (
                    <EmptyContainer message={formatMessage(messages.empty)} />
                  )}
              </tbody>
            </Table>
          )}
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

export default RepList
