/**
 * DiscountsList Component - Created by eduardoquintero on 24/05/19.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import { DISCOUNTS_LIMIT } from '../constants'
import { Container, Header, Row, Table } from './styledComponents'
import HeaderTable from '../DiscountsTable'
import ItemOrder from '../ItemOrder'
import EmptyContainer from '../../EmptyContainer'
import { sorts, QueryProps, Discount } from '../../../types/common'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { getDiscountsQuery } from './data'
import Pagination from 'antd/lib/pagination/Pagination'

interface Data extends QueryProps {
  discountsQuery: {
    fullCount: number
    discounts: Discount[]
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
  searchText: string
  onSortClick: (label: string, sort: sorts) => void
  onDiscountClick: (discount: Discount) => void
  onChangePage: (page: number) => void
  onChangeActive: (id: number) => void
}

const DiscountsList = ({
  formatMessage,
  interactiveHeaders,
  orderBy,
  sort,
  currentPage,
  data: { discountsQuery },
  onSortClick,
  onDiscountClick,
  onChangePage,
  withPagination = true,
  withoutPadding = false,
  onChangeActive
}: Props) => {
  const discounts = get(discountsQuery, 'discounts', []) as Discount[]
  const fullCount = get(discountsQuery, 'fullCount', 0)

  if (!discounts || !discounts.length) {
    return <EmptyContainer message={formatMessage(messages.emptyMessage)} />
  }

  const header = (
    <MediaQuery maxWidth={768}>
      {matches => {
        if (matches) {
          return (
            <Row>
              <Header>{formatMessage(messages.code)}</Header>
              <Header>{formatMessage(messages.discountItem)}</Header>
              <Header>{formatMessage(messages.type)}</Header>
              <Header>{formatMessage(messages.rate)}</Header>
              <Header>{formatMessage(messages.expiry)}</Header>
              <Header>{''}</Header>
              <Header>{''}</Header>
            </Row>
          )
        }
        return (
          <Row>
            <HeaderTable
              id={'coupon_code'}
              label={formatMessage(messages.code)}
              sort={orderBy === 'coupon_code' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'discount_item_id'}
              label={formatMessage(messages.discountItem)}
              sort={orderBy === 'discount_item_id' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'discount_type'}
              label={formatMessage(messages.type)}
              sort={orderBy === 'discount_type' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'rate'}
              label={formatMessage(messages.rate)}
              sort={orderBy === 'rate' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'expiry'}
              label={formatMessage(messages.expiry)}
              sort={orderBy === 'expiry' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'switch'}
              label={''}
              interactiveHeaders={false}
              {...{ onSortClick }}
            />
            <HeaderTable
              id={'edit'}
              label={''}
              interactiveHeaders={false}
              {...{ onSortClick }}
            />
          </Row>
        )
      }}
    </MediaQuery>
  )
  const orderItems = discounts.map(
    (
      {
        code,
        discountItemId,
        type,
        rate,
        expiry,
        active,
        id,
        selectedProducts,
        restrictionType,
        user,
        selectedUsers,
        usageNumber
      }: Discount,
      index: number
    ) => {
      return (
        <ItemOrder
          key={index}
          {...{
            id,
            code,
            discountItemId,
            type,
            rate,
            expiry,
            active,
            onDiscountClick,
            onChangeActive,
            restrictionType,
            selectedProducts,
            user,
            selectedUsers,
            usageNumber
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
          pageSize={DISCOUNTS_LIMIT}
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

const DiscountsListEnhance = compose(
  graphql(getDiscountsQuery, {
    options: ({
      currentPage,
      orderBy,
      sort,
      customLimit,
      searchText
    }: OwnProps) => {
      const limit = customLimit !== undefined ? customLimit : DISCOUNTS_LIMIT
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
)(DiscountsList)

export default DiscountsListEnhance
