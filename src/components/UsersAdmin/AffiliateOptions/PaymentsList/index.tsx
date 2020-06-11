/**
 * PaymentsList Component - Created by Jesús Apodaca on 25/05/20.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import {
  Container,
  Header,
  Row,
  Table,
  ItemContainer,
  Cell,
  TableTitle,
  Clip,
  EmptyContainer
} from './styledComponents'
import { QueryProps, Message, AffiliatePayment } from '../../../../types/common'
import withError from '../../../WithError'
import withLoading from '../../../WithLoading'
import { getAffiliatePaymentsQuery } from './data'
import Pagination from 'antd/lib/pagination/Pagination'
import { NOTE_FORMAT } from '../../constants'
import moment from 'moment'
import { getFileWithExtension } from '../../../../utils/utilsFiles'

const LIST_LIMIT = 10

interface Data extends QueryProps {
  paymentsQuery: {
    fullCount: number
    payments: AffiliatePayment[]
  }
}

interface Props {
  data: Data
  formatMessage: (messageDescriptor: Message) => string
  currentPage: number
  onChangePage: (page: number) => void
  onRowClick: (url: string) => void
}

const PaymentsList = ({
  formatMessage,
  currentPage,
  data,
  onChangePage,
}: Props) => {
  const payments = get(data, 'paymentsQuery.payments', []) as AffiliatePayment[]
  const fullCount = get(data, 'paymentsQuery.fullCount', 0)

  const openReceipt = (receipt: string) => () => {
    if (receipt) {
      window.open(receipt)
    }
  }
  const userItems = payments && payments.length && payments.map(
    (
      { id, createdAt, status, amount, receipt }: any,
      index: number
    ) => {
      const fileName = receipt ? getFileWithExtension(receipt) : ''
      return (
        <ItemContainer id={index} onClick={openReceipt(receipt)} key={index}>
          <Cell>{id}</Cell>
          <Cell>{createdAt ? moment(createdAt).format(NOTE_FORMAT) : ''}</Cell>
          <Cell>{status}</Cell>
          <Cell>{`$${amount.toFixed(2)}`}</Cell>
          <Cell>
            <Clip type="paper-clip" />
            {fileName}
          </Cell>
        </ItemContainer>
      )
    }
  )

  return (
    <Container>
      <TableTitle>
        {formatMessage(messages.title)}
      </TableTitle>
      <Table>
        <thead>
          <Row>
            <Header>
              {formatMessage(messages.number)}
            </Header>
            <Header>
              {formatMessage(messages.date)}
            </Header>
            <Header>
              {formatMessage(messages.status)}
            </Header>
            <Header>
              {formatMessage(messages.amount)}
            </Header>
            <Header>
              {formatMessage(messages.receipt)}
            </Header>
          </Row>
        </thead>
        <tbody>{userItems}</tbody>
      </Table>
      {!userItems &&
        <EmptyContainer>{formatMessage(messages.emptyMessage)}</EmptyContainer>
      }
      <Pagination
        current={currentPage}
        pageSize={LIST_LIMIT}
        total={Number(fullCount)}
        onChange={onChangePage}
      />
    </Container>
  )
}

interface OwnProps {
  currentPage?: number
  customLimit?: number
  isAdmin?: boolean
  userId?: string
}

const PaymentsListEnhance = compose(
  graphql(getAffiliatePaymentsQuery, {
    options: ({
      currentPage,
      customLimit,
      isAdmin,
      userId,
    }: OwnProps) => {
      const limit = customLimit !== undefined ? customLimit : LIST_LIMIT
      const offset = currentPage ? (currentPage - 1) * limit : 0
      return {
        variables: {
          limit,
          offset,
          isAdmin,
          userId
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
  withError,
  withLoading
)(PaymentsList)

export default PaymentsListEnhance
