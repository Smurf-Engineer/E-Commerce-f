/**
 * OrdersList Component - Created by miguelcanobbio on 16/07/18.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { graphql, compose } from 'react-apollo'
import { Moment } from 'moment'
import get from 'lodash/get'
import find from 'lodash/find'
import messages from './messages'
import Modal from 'antd/lib/modal'
import message from 'antd/lib/message'
import { Container, Header, Row, Table } from './styledComponents'
import HeaderTable from '../HeaderOrdersTable'
import ItemOrder from '../ItemOrder'
import EmptyContainer from '../../EmptyContainer'
import {
  OrderHistory,
  sorts,
  QueryProps,
  FulfillmentNetsuite,
  Message,
  OrderPreflight
} from '../../../types/common'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import {
  getOrdersQuery,
  updateStatusMutation,
  getOrdersPreflight
} from './data'
import Pagination from 'antd/lib/pagination/Pagination'
import { PAID_STATUS, ERROR_STATUS, PAYMENT_ISSUE } from '../../../constants'
import findIndex from 'lodash/findIndex'

interface Data extends QueryProps {
  ordersQuery: {
    fullCount: number
    orders: OrderHistory[]
  }
}

interface PreflightData extends QueryProps {
  preflight: {
    id: number
    orders: OrderPreflight[]
  }
}

const { confirm } = Modal

const ORDERS_LIMIT = 12

interface Props {
  data: Data
  formatMessage: (messageDescriptor: Message, params?: any) => string
  interactiveHeaders: boolean
  currentPage: number
  orderBy: string
  sort: sorts
  withPagination?: boolean
  withoutPadding?: boolean
  searchText: string
  canEdit: boolean
  startDate: Moment
  endDate: Moment
  preflightData: PreflightData
  onSortClick: (label: string, sort: sorts) => void
  onOrderClick: (shortId: string) => void
  onChangePage: (page: number) => void
  updateStatus: (variables: {}) => Promise<any>
}

const OrdersList = ({
  formatMessage,
  interactiveHeaders,
  orderBy,
  sort,
  currentPage,
  data: { ordersQuery },
  onSortClick,
  canEdit,
  onOrderClick,
  onChangePage,
  withPagination = true,
  withoutPadding = false,
  updateStatus,
  searchText,
  preflightData
}: Props) => {
  const orders = get(ordersQuery, 'orders', []) as OrderHistory[]
  const fullCount = get(ordersQuery, 'fullCount', 0)

  if (!orders || !orders.length) {
    return <EmptyContainer message={formatMessage(messages.emptyMessage)} />
  }

  const header = (
    <MediaQuery maxWidth={768}>
      {(matches) => {
        if (matches) {
          return (
            <Row>
              <Header>{formatMessage(messages.orderNo)}</Header>
              <Header>{formatMessage(messages.date)}</Header>
              <Header>{formatMessage(messages.clientId)}</Header>
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
              id={'source'}
              label={formatMessage(messages.source)}
              sort={orderBy === 'source' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'total_amount'}
              label={formatMessage(messages.total)}
              sort={orderBy === 'total_amount' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'created_at'}
              label={formatMessage(messages.date)}
              sort={orderBy === 'created_at' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'orders.cutoff_date'}
              label={formatMessage(messages.cutoffDate)}
              sort={orderBy === 'orders.cutoff_date' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'estimated_date'}
              label={formatMessage(messages.estimatedDate)}
              sort={orderBy === 'estimated_date' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'users.id'}
              label={formatMessage(messages.clientId)}
              sort={orderBy === 'users.id' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'users.first_name'}
              label={formatMessage(messages.clientName)}
              sort={orderBy === 'users.first_name' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'pending_checks'}
              justifyContent={'center'}
              label={formatMessage(messages.preflight)}
              sort={orderBy === 'pending_checks' ? sort : 'none'}
              loading={preflightData && preflightData.loading}
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
  const handleOnUpdateStatus = async (status: string, orderId: string) => {
    confirm({
      title: formatMessage(messages.confirmTitle),
      content: formatMessage(messages.confirmMessage, { status }),
      onOk: async () => {
        try {
          const offset = currentPage ? (currentPage - 1) * ORDERS_LIMIT : 0
          await updateStatus({
            variables: { status, orderId },
            update: (store: any) => {
              const ordersData = store.readQuery({
                query: getOrdersQuery,
                variables: {
                  limit: ORDERS_LIMIT,
                  offset,
                  order: orderBy,
                  orderAs: sort,
                  searchText
                }
              })
              const updatedOrders = get(ordersData, 'ordersQuery.orders')
              const index = findIndex(
                orders,
                ({ shortId }) => shortId === orderId
              )
              updatedOrders[index].status = status
              store.writeQuery({
                query: getOrdersQuery,
                variables: {
                  limit: ORDERS_LIMIT,
                  offset,
                  order: orderBy,
                  orderAs: sort,
                  searchText
                },
                data: ordersData
              })
            }
          })
          message.success(formatMessage(messages.statusUpdated))
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }
  const orderItems = orders.map(
    (
      {
        id,
        shortId,
        date,
        clientId,
        status,
        netsuite,
        netsuiteAttempts,
        firstName,
        total,
        currency,
        lastName,
        source,
        estimatedDate,
        cutoffDate
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
      const trackingNumber = (packages && packages.replace('<BR>', ', ')) || '-'
      const errorStatus =
        netsuiteAttempts > 0 && status === PAID_STATUS ? ERROR_STATUS : null
      const preflight = get(preflightData, 'preflight', [])
      const pendingChecks = get(
        find(preflight, (item) => item.id === id),
        'pendingChecks',
        0
      )

      return (
        <ItemOrder
          key={index}
          currency={currency ? currency.abbreviation : ''}
          statusError={!!errorStatus || status === PAYMENT_ISSUE}
          pendingCheck={pendingChecks > 0 && !netsuiteStatus}
          status={errorStatus || netsuiteStatus || status}
          {...{
            shortId,
            date,
            clientId,
            canEdit,
            firstName,
            total,
            pendingChecks,
            estimatedDate,
            lastName,
            onOrderClick,
            trackingNumber,
            source,
            cutoffDate,
            handleOnUpdateStatus
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
  searchText?: string
  startDate?: Moment
  endDate?: Moment
  status?: string
  orderPoint?: string
  data?: Data
}

const OrdersListEnhance = compose(
  graphql(getOrdersQuery, {
    options: ({
      currentPage,
      orderBy,
      sort,
      customLimit,
      searchText,
      startDate,
      endDate,
      status,
      orderPoint
    }: OwnProps) => {
      const limit = customLimit !== undefined ? customLimit : ORDERS_LIMIT
      const offset = currentPage ? (currentPage - 1) * limit : 0
      return {
        variables: {
          limit,
          offset,
          order: orderBy,
          orderAs: sort,
          searchText,
          startDate: startDate ? startDate.format('YYYY-MM-DD') : '',
          endDate: endDate ? endDate.format('YYYY-MM-DD') : '',
          status,
          orderPoint
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
  graphql(getOrdersPreflight, {
    name: 'preflightData',
    options: ({ data }: OwnProps) => {
      const { ordersQuery } = data
      const orders = get(ordersQuery, 'orders', []) as OrderHistory[]
      const ordersIds = orders.map((order) => order.id)
      return {
        variables: { ordersIds },
        fetchPolicy: 'network-only',
        skip: !ordersIds.length
      }
    }
  }),
  updateStatusMutation,
  withError,
  withLoading
)(OrdersList)

export default OrdersListEnhance
