/**
 * OrdersList Component - Created by miguelcanobbio on 16/07/18.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import { Container, Header, Row, Table, EmptyMessage } from './styledComponents'
import HeaderTable from '../HeaderOrdersTable'
import ItemOrder from '../ItemOrder'
import { OrderHistory, sorts, QueryProps } from '../../../types/common'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { getOrdersQuery } from './data'
import Pagination from 'antd/lib/pagination/Pagination'
import { EmptyContainer } from '../../../screens/ShoppingCartPage/styledComponents'

interface Data extends QueryProps {
  ordersQuery: {
    fullCount: number
    orders: OrderHistory[]
  }
}

interface Props {
  data: Data
  formatMessage: (messageDescriptor: any) => string
  interactiveHeaders: boolean
  currentPage: number
  orderBy: string
  sort: sorts
  onSortClick: (label: string, sort: sorts) => void
  onOrderClick: (shortId: string) => void
  onChangePage: (page: number) => void
}

const OrdersList = ({
  formatMessage,
  interactiveHeaders,
  orderBy,
  sort,
  currentPage,
  data: { ordersQuery },
  onSortClick,
  onOrderClick,
  onChangePage
}: Props) => {
  const orderHeader = interactiveHeaders ? (
    <Header>
      <HeaderTable
        id={'id'}
        label={formatMessage(messages.orderNumber)}
        sort={orderBy === 'id' ? sort : ''}
        {...{ onSortClick }}
      />
    </Header>
  ) : (
    <Header>{formatMessage(messages.orderNumber)}</Header>
  )

  const dateHeader = interactiveHeaders ? (
    <Header>
      <HeaderTable
        id={'updated_at'}
        label={formatMessage(messages.date)}
        sort={orderBy === 'updated_at' ? sort : ''}
        {...{ onSortClick }}
      />
    </Header>
  ) : (
    <Header>{formatMessage(messages.date)}</Header>
  )

  const trackingHeader = interactiveHeaders ? (
    <Header>
      <HeaderTable
        id={''}
        label={formatMessage(messages.trackingNumber)}
        sort={''}
        {...{ onSortClick }}
      />
    </Header>
  ) : (
    <Header>{formatMessage(messages.trackingNumber)}</Header>
  )

  const statusHeader = interactiveHeaders ? (
    <Header>
      <HeaderTable
        id={'status'}
        label={formatMessage(messages.status)}
        justifyContent={'flex-end'}
        sort={orderBy === 'status' ? sort : ''}
        {...{ onSortClick }}
      />
    </Header>
  ) : (
    <Header textAlign={'right'}>{formatMessage(messages.status)}</Header>
  )

  const header = (
    <MediaQuery maxWidth={768}>
      {matches => {
        if (matches) {
          return (
            <Row>
              <Header>{formatMessage(messages.orderNo)}</Header>
              <Header>{formatMessage(messages.date)}</Header>
              <Header>{formatMessage(messages.tracking)}</Header>
              <Header textAlign={'right'}>
                {formatMessage(messages.status)}
              </Header>
            </Row>
          )
        }

        return (
          <Row>
            {orderHeader}
            {dateHeader}
            {trackingHeader}
            {statusHeader}
          </Row>
        )
      }}
    </MediaQuery>
  )

  const orders = get(ordersQuery, 'orders', []) as OrderHistory[]
  const fullCount = get(ordersQuery, 'fullCount', 0)

  const orderItems = orders.map(
    ({ id, shortId, date, status }: OrderHistory, index: number) => (
      <ItemOrder
        key={index}
        orderNumber={id}
        {...{ shortId, date, status, onOrderClick }}
      />
    )
  )

  if (!orderItems.length) {
    return (
      <EmptyContainer>
        <EmptyMessage>{formatMessage(messages.emptyMessage)}</EmptyMessage>
      </EmptyContainer>
    )
  }

  return (
    <Container>
      <Table>
        <thead>{header}</thead>
        <tbody>{orderItems}</tbody>
      </Table>
      <Pagination
        current={currentPage}
        pageSize={limit}
        total={Number(fullCount)}
        onChange={onChangePage}
      />
    </Container>
  )
}

interface OwnProps {
  currentPage?: number
  orderBy?: string
  sort?: string
}

const limit = 12

const OrdersListEnhance = compose(
  graphql(getOrdersQuery, {
    options: ({ currentPage, orderBy, sort }: OwnProps) => {
      const offset = currentPage ? (currentPage - 1) * limit : 0
      return {
        variables: {
          limit,
          offset,
          order: orderBy,
          orderAs: sort
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
  withError,
  withLoading
)(OrdersList)

export default OrdersListEnhance
