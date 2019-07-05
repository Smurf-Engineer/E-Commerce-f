/**
 * InternalsList Component - Created by eduardoquintero on 03/07/19.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import { INTERNALS_LIMIT } from '../constants'
import { Container, Header, Row, Table } from './styledComponents'
import HeaderTable from '../InternalsTable'
import ItemOrder from '../ItemOrder'
import EmptyContainer from '../../EmptyContainer'
import { sorts, QueryProps, ProductInternal } from '../../../types/common'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { getProductInternalsQuery } from './data'
import Pagination from 'antd/lib/pagination/Pagination'

interface Data extends QueryProps {
  productInternalsQuery: {
    fullCount: number
    internals: ProductInternal[]
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
  onInternalClick: (internal: ProductInternal) => void
  onChangePage: (page: number) => void
}

const productHeaders = [
  { title: 'internalId', id: 'internal_id' },
  { title: 'productCode', id: 'product_code' },
  { title: 'gender', id: 'gender' },
  { title: 'size', id: 'size' },
  { title: 'fitStyle', id: 'fit_style' },
  { title: 'color', id: 'color' },
  { title: 'frontZipper', id: 'front_zipper' },
  { title: 'pocketZipper', id: 'pocket_zipper' },
  { title: 'binding', id: 'binding' },
  { title: 'bibBrace', id: 'bib_brace' },
  { title: 'productCode', id: 'collection' }
]

const InternalsList = ({
  formatMessage,
  interactiveHeaders,
  orderBy,
  sort,
  currentPage,
  data: { productInternalsQuery },
  onSortClick,
  onInternalClick,
  onChangePage,
  withPagination = true,
  withoutPadding = false
}: Props) => {
  const internals = get(
    productInternalsQuery,
    'internals',
    []
  ) as ProductInternal[]
  const fullCount = get(productInternalsQuery, 'fullCount', 0)

  if (!internals || !internals.length) {
    return <EmptyContainer message={formatMessage(messages.emptyMessage)} />
  }
  const mobileHeaders = productHeaders.map(({ title, id }) => (
    <Header key={id}>{formatMessage(messages[title])}</Header>
  ))

  const headers = productHeaders.map(({ title, id }) => (
    <HeaderTable
      key={id}
      label={formatMessage(messages[title])}
      sort={orderBy === id ? sort : 'none'}
      {...{ onSortClick, interactiveHeaders, id }}
    />
  ))

  const header = (
    <MediaQuery maxWidth={768}>
      {matches => {
        if (matches) {
          return (
            <Row>
              {mobileHeaders}
              <Header>{''}</Header>
            </Row>
          )
        }

        return (
          <Row>
            {headers}
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
  const orderItems = internals.map(
    (
      {
        id,
        internalId,
        productCode,
        gender,
        size,
        fitStyle,
        color,
        frontZipper,
        pocketZipper,
        binding,
        bibBrace,
        collection
      }: ProductInternal,
      index: number
    ) => {
      return (
        <ItemOrder
          key={index}
          {...{
            id,
            internalId,
            productCode,
            gender,
            size,
            fitStyle,
            color,
            frontZipper,
            pocketZipper,
            binding,
            bibBrace,
            collection,
            onInternalClick
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
          pageSize={INTERNALS_LIMIT}
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

const InternalsListEnhance = compose(
  graphql(getProductInternalsQuery, {
    options: ({
      currentPage,
      orderBy,
      sort,
      customLimit,
      searchText
    }: OwnProps) => {
      const limit = customLimit !== undefined ? customLimit : INTERNALS_LIMIT
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
)(InternalsList)

export default InternalsListEnhance
