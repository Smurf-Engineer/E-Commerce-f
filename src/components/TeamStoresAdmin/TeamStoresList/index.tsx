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
import AdminTable from '../../AdminTable'
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
  onChangeSwitch: (id: number, fieldId: string) => void
  onChangePage: (page: number) => void
  onClickRow: (id: string) => void
}

const teamStoreHeaders = [
  { title: 'name', id: 'name' },
  { title: 'manager', id: 'first_name' },
  { title: 'type', id: 'on_demand_mode' },
  { title: 'cutoffDate', id: 'cutoff_date' },
  { title: 'deliveryDate', id: 'delivery_date' },
  { title: 'featured', id: 'featured' },
  { title: 'display', id: 'display' }
]

const TeamStoresList = ({
  formatMessage,
  interactiveHeaders,
  orderBy,
  sort,
  currentPage,
  data: { teamStoresList },
  onSortClick,
  onChangeSwitch,
  onChangePage,
  withPagination = true,
  withoutPadding = false,
  onClickRow
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

  const mobileHeaders = teamStoreHeaders.map(({ title, id }) => {
    return <Header key={id}>{formatMessage(messages[title])}</Header>
  })

  const headers = teamStoreHeaders.map(({ title, id }) => (
    <AdminTable
      key={id}
      label={formatMessage(messages[title])}
      sort={orderBy === id ? sort : 'none'}
      {...{ onSortClick, interactiveHeaders, id }}
    />
  ))

  const header = (
    <MediaQuery maxWidth={768}>
      {(matches) => {
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
        cutOffDateString,
        deliveryDate,
        shortId,
        display
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
            deliveryDate,
            onChangeSwitch,
            onClickRow,
            shortId,
            display
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
      currentPage = 0,
      orderBy,
      sort,
      customLimit,
      searchText
    }: OwnProps) => {
      const limit = customLimit !== undefined ? customLimit : TEAM_STORES_LIMIT
      const offset = (currentPage - 1) * limit
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
