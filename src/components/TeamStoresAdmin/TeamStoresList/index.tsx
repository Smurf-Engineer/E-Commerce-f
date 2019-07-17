/**
 * TeamStoresList Component - Created by eduardoquintero on 15/07/19.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import { TEAM_STORES_LIMIT } from '../constants'
import { Container, Header, Row, Table } from './styledComponents'
import AdminTable from '../../../AdminTable'
import ItemOrder from '../ItemOrder'
import EmptyContainer from '../../EmptyContainer'
import {
  sorts,
  QueryProps,
  TeamStoreAdminType,
  TeamStoreAdminResultType
} from '../../../types/common'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { GetTeamStoresQuery } from './data'
import Pagination from 'antd/lib/pagination/Pagination'

interface Data extends QueryProps {
  teamStoresList: {
    fullCount: number
    teamStores: TeamStoreAdminType[]
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
  onSetFeatured: (id: number) => void
  onChangePage: (page: number) => void
}

const productHeaders = [
  { title: 'name', id: 'team_stores.name' },
  { title: 'manager', id: 'users.first_name' },
  { title: 'type', id: 'team_stores.on_demand_mode' },
  { title: 'cutoffDate', id: 'team_stores.cutoff_date' },
  { title: 'featured', id: 'team_stores.featured' }
]

const TeamStoresList = ({
  formatMessage,
  interactiveHeaders,
  orderBy,
  sort,
  currentPage,
  data: { teamStoresList },
  onSortClick,
  onSetFeatured,
  onChangePage,
  withPagination = true,
  withoutPadding = false
}: Props) => {
  const teamStores = get<
    TeamStoreAdminResultType,
    'teamStores',
    TeamStoreAdminType[]
  >(teamStoresList, 'teamStores', [])
  const fullCount = get(teamStoresList, 'fullCount', 0)

  if (!teamStores || !teamStores.length) {
    return <EmptyContainer message={formatMessage(messages.emptyMessage)} />
  }

  const mobileHeaders = productHeaders.map(({ title, id }) => {
    return <Header key={id}>{formatMessage(messages[title])}</Header>
  })

  const headers = productHeaders.map(({ title, id }) => (
    <AdminTable
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
          return <Row>{mobileHeaders}</Row>
        }
        return <Row>{headers}</Row>
      }}
    </MediaQuery>
  )
  const orderItems = teamStores.map(
    (
      {
        id,
        name,
        featured,
        userFirstName,
        userLastName,
        onDemand,
        cutOffDateString
      }: TeamStoreAdminType,
      index: number
    ) => {
      return (
        <ItemOrder
          key={index}
          {...{
            id,
            name,
            featured,
            userFirstName,
            userLastName,
            onDemand,
            formatMessage,
            cutOffDateString,
            onSetFeatured
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
          pageSize={TEAM_STORES_LIMIT}
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

const TeamStoresListEnhance = compose(
  graphql(GetTeamStoresQuery, {
    options: ({
      currentPage,
      orderBy,
      sort,
      customLimit,
      searchText
    }: OwnProps) => {
      const limit = customLimit !== undefined ? customLimit : TEAM_STORES_LIMIT
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
)(TeamStoresList)

export default TeamStoresListEnhance
