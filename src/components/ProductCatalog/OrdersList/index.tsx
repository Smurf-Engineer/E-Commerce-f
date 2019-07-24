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
import { Product, sorts } from '../../../types/common'
import jakrooLogo from '../../../assets/Jackroologo.svg'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { getProductsQuery, changeActiveProduct } from './data'
import Pagination from 'antd/lib/pagination/Pagination'

interface Props {
  data: any
  formatMessage: (messageDescriptor: any) => string
  interactiveHeaders: boolean
  currentPage: number
  orderBy: string
  sort: sorts
  withPagination?: boolean
  withoutPadding?: boolean
  customLimit?: number
  searchText?: string
  updateActiveProduct: (variables: {}) => Promise<any>
  onSortClick: (label: string, sort: sorts) => void
  onProductClick: (id: number) => void
  onChangePage: (page: number) => void
}

const OrdersList = ({
  formatMessage,
  currentPage,
  data: { productsQuery },
  onProductClick,
  onChangePage,
  updateActiveProduct,
  withPagination = true,
  withoutPadding = false
}: Props) => {
  const orders = get(productsQuery, 'products', []) as Product[]
  const fullCount = get(productsQuery, 'fullCount', 0)
  if (!orders || !orders.length) {
    return <EmptyContainer message={formatMessage(messages.emptyMessage)} />
  }
  const header = (
    <MediaQuery maxWidth={768}>
      {matches => {
        if (matches) {
          return (
            <Row>
              <Header>{formatMessage(messages.name)}</Header>
              <Header>{formatMessage(messages.mpn)}</Header>
              <Header>{formatMessage(messages.productCode)}</Header>
              <Header textAlign={'right'}>
                {formatMessage(messages.productType)}
              </Header>
            </Row>
          )
        }
        return (
          <Row>
            <HeaderTable label={''} />
            <HeaderTable label={formatMessage(messages.name)} />
            <HeaderTable label={formatMessage(messages.mpn)} />
            <HeaderTable label={formatMessage(messages.productCode)} />
            <HeaderTable label={formatMessage(messages.productType)} />
            <HeaderTable
              label={formatMessage(messages.onStore)}
              justifyContent="center"
            />
          </Row>
        )
      }}
    </MediaQuery>
  )
  const orderItems = orders.map(
    (
      { id, images, active, name, mpn, code, isCustom, obj, mtl }: Product,
      index: number
    ) => {
      return (
        <ItemOrder
          key={index}
          active={active}
          onCheck={updateActiveProduct}
          disabled={!obj && !mtl && isCustom}
          image={get(images[0], 'front', jakrooLogo)}
          productType={formatMessage(
            isCustom ? messages.custom : messages.inline
          )}
          {...{ id, name, mpn, code, isCustom, onProductClick }}
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
          pageSize={PRODUCTS_LIMIT}
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

const PRODUCTS_LIMIT = 12

const OrdersListEnhance = compose(
  graphql(changeActiveProduct, { name: 'updateActiveProduct' }),
  graphql(getProductsQuery, {
    options: ({ currentPage, customLimit, searchText }: OwnProps) => {
      const limit = customLimit !== undefined ? customLimit : PRODUCTS_LIMIT
      const offset = currentPage ? (currentPage - 1) * limit : 0
      return {
        variables: {
          limit,
          offset,
          text: searchText
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
  withError,
  withLoading
)(OrdersList)

export default OrdersListEnhance
