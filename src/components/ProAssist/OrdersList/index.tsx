/**
 * OrdersList Component - Created by eduardoquintero on 16/01/20.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import { Container, Header, Row, Table } from './styledComponents'
import HeaderTable from '../HeaderOrdersTable'
import ItemOrder from '../ItemOrder'
import { ORDERS_LIMIT } from '../constants'
import EmptyContainer from '../../EmptyContainer'
import { sorts, QueryProps, ProAssist, Message } from '../../../types/common'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { getProAssistQuery } from './data'
import Pagination from 'antd/lib/pagination/Pagination'

interface Data extends QueryProps {
  proAssistQuery: {
    fullCount: number
    proAssist: ProAssist[]
  }
}

interface Props {
  data: Data
  formatMessage: (messageDescriptor: Message) => string
  currentPage: number
  orderBy: string
  sort: sorts
  withPagination?: boolean
  withoutPadding?: boolean
  searchText: string
  onSortClick: (label: string, sort: sorts) => void
  onChangePage: (page: number) => void
  onRowClick: (url: string) => void
}

const OrdersList = ({
  formatMessage,
  orderBy,
  sort,
  currentPage,
  data: { proAssistQuery },
  onSortClick,
  onChangePage,
  withPagination = true,
  withoutPadding = false,
  onRowClick
}: Props) => {
  const proAssist = get(proAssistQuery, 'proAssist', []) as ProAssist[]
  const fullCount = get(proAssistQuery, 'fullCount', 0)

  if (!proAssist || !proAssist.length) {
    return <EmptyContainer message={formatMessage(messages.emptyMessage)} />
  }

  const header = (
    <MediaQuery maxWidth={768}>
      {matches => {
        if (matches) {
          return (
            <Row>
              <Header>{formatMessage(messages.ticketNo)}</Header>
              <Header>{formatMessage(messages.clientId)}</Header>
              <Header>{formatMessage(messages.user)}</Header>
              <Header>{formatMessage(messages.date)}</Header>
              <Header>{formatMessage(messages.status)}</Header>
            </Row>
          )
        }
        return (
          <Row>
            <HeaderTable
              id={'pro_assist.short_id'}
              label={formatMessage(messages.ticketNo)}
              sort={orderBy === 'pro_assist.short_id' ? sort : 'none'}
              {...{ onSortClick }}
            />
            <HeaderTable
              id={'users.id'}
              label={formatMessage(messages.clientId)}
              sort={orderBy === 'users.id' ? sort : 'none'}
              {...{ onSortClick }}
            />
            <HeaderTable
              id={'users.first_name'}
              label={formatMessage(messages.user)}
              sort={orderBy === 'users.first_name' ? sort : 'none'}
              {...{ onSortClick }}
            />
            <HeaderTable
              id={'created_at'}
              label={formatMessage(messages.date)}
              sort={orderBy === 'created_at' ? sort : 'none'}
              {...{ onSortClick }}
            />
            <HeaderTable
              id={'status'}
              label={formatMessage(messages.status)}
              sort={orderBy === 'status' ? sort : 'none'}
              {...{ onSortClick }}
            />
            <HeaderTable
              id={'last_order'}
              label={formatMessage(messages.status)}
              sort={orderBy === 'last_order' ? sort : 'none'}
              {...{ onSortClick }}
            />
          </Row>
        )
      }}
    </MediaQuery>
  )
  const userItems = proAssist.map(
    (
      { shortId, userId, firstName, lastName, date, status, url, lastOrder }: ProAssist,
      index: number
    ) => {
      return (
        <ItemOrder
          key={index}
          {...{
            id: shortId,
            userId,
            firstName,
            lastName,
            date,
            lastOrder,
            status,
            url,
            onRowClick
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
}

const OrdersListEnhance = compose(
  graphql(getProAssistQuery, {
    options: ({
      currentPage,
      orderBy,
      sort,
      customLimit,
      searchText
    }: OwnProps) => {
      const limit = customLimit !== undefined ? customLimit : ORDERS_LIMIT
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
)(OrdersList)

export default OrdersListEnhance
