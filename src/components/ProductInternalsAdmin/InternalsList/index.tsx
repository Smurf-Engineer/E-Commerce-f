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

  const header = (
    <MediaQuery maxWidth={768}>
      {matches => {
        if (matches) {
          return (
            <Row>
              <Header>{formatMessage(messages.internalId)}</Header>
              <Header>{formatMessage(messages.productCode)}</Header>
              <Header>{formatMessage(messages.gender)}</Header>
              <Header>{formatMessage(messages.size)}</Header>
              <Header>{formatMessage(messages.fitStyle)}</Header>
              <Header>{formatMessage(messages.color)}</Header>
              <Header>{formatMessage(messages.bibBrace)}</Header>
              <Header>{formatMessage(messages.frontZipper)}</Header>
              <Header>{formatMessage(messages.pocketZipper)}</Header>
              <Header>{formatMessage(messages.binding)}</Header>
              <Header>{formatMessage(messages.collection)}</Header>
              <Header>{''}}</Header>
            </Row>
          )
        }

        return (
          <Row>
            <HeaderTable
              id={'internal_id'}
              label={formatMessage(messages.internalId)}
              sort={orderBy === 'internal_id' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'product_code'}
              label={formatMessage(messages.productCode)}
              sort={orderBy === 'product_code' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'gender'}
              label={formatMessage(messages.gender)}
              sort={orderBy === 'gender' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'size'}
              label={formatMessage(messages.size)}
              sort={orderBy === 'size' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'fit_style'}
              label={formatMessage(messages.fitStyle)}
              sort={orderBy === 'fit_style' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'color'}
              label={formatMessage(messages.color)}
              sort={orderBy === 'color' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'front_zipper'}
              label={formatMessage(messages.frontZipper)}
              sort={orderBy === 'front_zipper' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'pocket_zipper'}
              label={formatMessage(messages.pocketZipper)}
              sort={orderBy === 'pocket_zipper' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'binding'}
              label={formatMessage(messages.binding)}
              sort={orderBy === 'binding' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'bib_brace'}
              label={formatMessage(messages.bibBrace)}
              sort={orderBy === 'bib_brace' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
            />
            <HeaderTable
              id={'collection'}
              label={formatMessage(messages.collection)}
              sort={orderBy === 'collection' ? sort : 'none'}
              {...{ onSortClick, interactiveHeaders }}
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
