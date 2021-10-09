/**
 * OrdersList Component - Created by miguelcanobbio on 16/07/18.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import { Container, Header, Row, Table } from './styledComponents'
import HeaderTable from '../HeaderOrdersTable'
import ItemOrder from '../ItemOrder'
import EmptyContainer from '../../EmptyContainer'
import {
  OrderHistory,
  sorts,
  QueryProps,
  FulfillmentNetsuite
} from '../../../types/common'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { getOrdersQuery } from './data'
import Pagination from 'antd/lib/pagination/Pagination'

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
  withPagination?: boolean
  withoutPadding?: boolean
  onSortClick: (label: string, sort: sorts) => void
  onOrderClick: (shortId: string, isService?: boolean) => void
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
  onChangePage,
  withPagination = true,
  withoutPadding = false
}: Props) => {
  const orders = get(ordersQuery, 'orders', []) as OrderHistory[]
  const fullCount = get(ordersQuery, 'fullCount', 0)

  if (!orders || !orders.length) {
    return <EmptyContainer message={formatMessage(messages.emptyMessage)} />
  }

  const header = (
    <MediaQuery maxWidth={768}>
      {matches => {
        if (matches) {
          return (
            <Row>
              <Header>{formatMessage(messages.orderNo)}</Header>
              <Header>{formatMessage(messages.date)}</Header>
              <Header>{formatMessage(messages.estimatedDate)}</Header>
              <Header>{formatMessage(messages.tracking)}</Header>
              <Header textAlign={'right'}>
                {formatMessage(messages.status)}
              </Header>
            </Row>
          )
        }
        return (
          <Row>
            <HeaderTable
              id={'id'}
              label={formatMessage(messages.orderNumber)}
              sort={orderBy === 'id' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'created_at'}
              label={formatMessage(messages.date)}
              sort={orderBy === 'created_at' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'estimated_date'}
              label={formatMessage(messages.estimatedDate)}
              sort={orderBy === 'estimated_date' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={''}
              label={formatMessage(messages.trackingNumber)}
              sort={'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'status'}
              label={formatMessage(messages.status)}
              justifyContent={'flex-end'}
              sort={orderBy === 'status' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
          </Row>
        )
      }}
    </MediaQuery>
  )

  const orderItems = orders.map(
    (
      { shortId, date, estimatedDate, status, netsuite, service }: OrderHistory,
      index: number
    ) => {
      const netsuiteObject = get(netsuite, 'orderStatus')
      const netsuiteStatus = netsuiteObject && netsuiteObject.orderStatus
      const fulfillments = get(
        netsuiteObject,
        'fulfillments',
        [] as FulfillmentNetsuite[]
      )
      const packages = get(fulfillments, '[0].packages')
      const trackingNumber = (packages && packages.replace('<BR>', ', ')) || '-'
      return (
        <ItemOrder
          key={index}
          status={netsuiteStatus || status}
          {...{ shortId, date, estimatedDate, onOrderClick, trackingNumber, service }}
        />
      )
    }
  )

  return (
    <Container {...{ withoutPadding }}>
      <Table>
        <thead>{header}</thead>
        <tbody>{orderItems}</tbody>
      </Table>
      {withPagination ? (
        <Pagination
          current={currentPage}
          pageSize={ORDERS_LIMIT}
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
}

const ORDERS_LIMIT = 12

const OrdersListEnhance = compose(
  graphql(getOrdersQuery, {
    options: ({ currentPage, orderBy, sort, customLimit }: OwnProps) => {
      const limit = customLimit !== undefined ? customLimit : ORDERS_LIMIT
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
