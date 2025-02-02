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
  userId: string
  sort: sorts
  onBehalf: boolean
  withPagination?: boolean
  withoutPadding?: boolean
  editOrder: (orderId: string) => void
  deleteOrder: (orderId: string) => void
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
  deleteOrder,
  editOrder,
  userId,
  onBehalf,
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
              <Header>{formatMessage(messages.amount)}</Header>
              <Header textAlign={'right'}>
                {formatMessage(messages.status)}
              </Header>
            </Row>
          )
        }
        return (
          <Row>
            <HeaderTable
              id={'short_id'}
              label={formatMessage(messages.orderNumber)}
              sort={orderBy === 'short_id' ? sort : 'none'}
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
              id={'is_delivered'}
              label={formatMessage(messages.deliveryStatus)}
              sort={orderBy === 'is_delivered' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'delivered_date'}
              label={formatMessage(messages.actualScheduled)}
              sort={orderBy === 'delivered_date' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'total_amount'}
              label={formatMessage(messages.amount)}
              sort={orderBy === 'total_amount' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'status'}
              label={formatMessage(messages.status)}
              justifyContent={'flex-end'}
              sort={orderBy === 'status' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'status'}
              label={''}
              justifyContent={'flex-end'}
              sort={'none'}
            />
            <HeaderTable
              id={'status'}
              label={''}
              justifyContent={'flex-end'}
              sort={'none'}
            />
          </Row>
        )
      }}
    </MediaQuery>
  )

  const orderItems = orders.map(
    (
      {
        shortId,
        date,
        userId: authorId,
        teamStoreId,
        canUpdatePayment,
        estimatedDate,
        inProductionTimestamp,
        status,
        netsuite,
        trackingNumber: trackingNumberOrder,
        deliveredDate,
        isDelivered,
        paymentLink,
        service,
        paymentMethod,
        totalAmount,
        currency
      }: OrderHistory,
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
      const trackingNumber = (packages && packages.replace('<BR>', ', ')) || trackingNumberOrder
      return (
        <ItemOrder
          key={index}
          status={netsuiteStatus || status}
          owner={userId === authorId}
          currency={currency && currency.shortName ? currency.shortName.toUpperCase() : ''}
          {...{
            editOrder,
            onBehalf,
            paymentMethod,
            isDelivered,
            deliveredDate,
            paymentLink,
            inProductionTimestamp,
            deleteOrder,
            formatMessage,
            shortId,
            teamStoreId,
            canUpdatePayment,
            date,
            estimatedDate,
            onOrderClick,
            trackingNumber,
            service,
            totalAmount
          }}
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
