/**
 * AffiliatesPayouts Component - Created by Jesús Apodaca on 25/05/20.
 */
import * as React from 'react'
import * as AffiliatesActions from './actions'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import {
  Container,
  Header,
  Row,
  Table,
  ItemContainer,
  Cell,
  TableTitle,
  Clip,
  EmptyContainer,
  SearchInput
} from './styledComponents'
import { QueryProps, Message, AffiliatePayment, UserPermissions } from '../../types/common'
import withError from '../WithError'
import withLoading from '../WithLoading'
import { getAffiliatePaymentsQuery } from './data'
import Pagination from 'antd/lib/pagination/Pagination'
import moment from 'moment'
import { getFileWithExtension } from '../../utils/utilsFiles'
import { connect } from 'react-redux'
import { PAY_LIMITS } from './constants'
import debounce from 'lodash/debounce'
import { AFFILIATES_PAYOUTS, ADMIN_ROUTE } from '../AdminLayout/constants'
import { DATE_FORMAT } from '../../constants'

interface Data extends QueryProps {
  paymentsQuery: {
    fullCount: number
    payments: AffiliatePayment[]
  }
}

interface Props {
  data: Data
  searchText: string
  permissions: UserPermissions
  currentPage: number
  history: History
  setSearchTextAction: (searchText: string) => void
  formatMessage: (messageDescriptor: Message) => string
  setCurrentPageAction: (page: number) => void
  onRowClick: (url: string) => void
}

export class AffiliatesPayouts extends React.Component<Props, {}> {
  debounceSearch = debounce(value => this.props.setSearchTextAction(value), 800)
  stopPropagation = (event: any) => {
    if (event) {
      event.stopPropagation()
    }
  }
  handleOnUpdateText = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    this.debounceSearch(value)
  }
  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }
  openReceipt = (evt: React.MouseEvent<EventTarget>) => {
    const {
      currentTarget: { id }
    } = evt
    if (id) {
      window.open(id)
    }
  }
  render() {
    const {
      formatMessage,
      searchText,
      history,
      permissions,
      currentPage,
      data,
    } = this.props
    const access = permissions[AFFILIATES_PAYOUTS] || {}
    if (!access.view) {
      history.replace(ADMIN_ROUTE)
    }
    const payoutList = get<Data, 'paymentsQuery.payments', AffiliatePayment[]>(
      data,
      'paymentsQuery.payments',
      []
    )
    const fullCount = get(data, 'paymentsQuery.fullCount', 0)

    const payouts = payoutList && !!payoutList.length && payoutList.map(
      (
        { id, createdAt, status, amount, receipt, name }: AffiliatePayment,
        index: number
      ) => {
        const fileName = receipt ? getFileWithExtension(receipt) : ''
        return (
          <ItemContainer id={receipt} onClick={this.openReceipt} key={index}>
            <Cell>{id}</Cell>
            <Cell>{createdAt ? moment(createdAt).format(DATE_FORMAT) : ' - '}</Cell>
            <Cell>{status}</Cell>
            <Cell>{`$${amount.toFixed(2)}`}</Cell>
            <Cell>
              {fileName ?
                <>
                  <Clip type="paper-clip" />
                  {fileName}
                </>
                : ' - '
              }
            </Cell>
            <Cell>{name}</Cell>
          </ItemContainer>
        )
      }
    )

    return (
      <Container>
        <TableTitle>
          {formatMessage(messages.title)}
        </TableTitle>
        <SearchInput
          defaultValue={searchText}
          onChange={this.handleOnUpdateText}
          placeholder={formatMessage(messages.search)}
        />
        <Table>
          <thead>
            <Row>
              <Header>
                {formatMessage(messages.number)}
              </Header>
              <Header>
                {formatMessage(messages.date)}
              </Header>
              <Header>
                {formatMessage(messages.status)}
              </Header>
              <Header>
                {formatMessage(messages.amount)}
              </Header>
              <Header>
                {formatMessage(messages.receipt)}
              </Header>
              <Header>
                {formatMessage(messages.name)}
              </Header>
            </Row>
          </thead>
          <tbody>{payouts}</tbody>
        </Table>
        {!payouts &&
          <EmptyContainer>{formatMessage(messages.emptyMessage)}</EmptyContainer>
        }
        <Pagination
          current={currentPage}
          pageSize={PAY_LIMITS}
          total={Number(fullCount)}
          onChange={this.handleOnChangePage}
        />
      </Container>
    )
  }
}

interface OwnProps {
  currentPage?: number
  searchText?: string
}

const mapStateToProps = (state: any) => state.get('affiliatesPayouts').toJS()

const AffiliatesPayoutsEnhance = compose(
  connect(mapStateToProps, { ...AffiliatesActions }),
  graphql(getAffiliatePaymentsQuery, {
    options: ({
      currentPage,
      searchText,
    }: OwnProps) => {
      const offset = currentPage ? (currentPage - 1) * PAY_LIMITS : 0
      return {
        variables: {
          limit: PAY_LIMITS,
          offset,
          searchText
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
  withError,
  withLoading
)(AffiliatesPayouts)

export default AffiliatesPayoutsEnhance
