/**
 * ResellerOrders Component - Created by Jesús Apodaca on 26/03/20.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as ResellerActions from './actions'
import {
  Container,
  ScreenTitle,
  ListContainer,
  Table,
  Row,
  Header,
  RepDiv,
  Cell,
  LoadingContainer,
  HeaderList,
  InputDiv,
  StatusFilter,
  RangePickerStyled,
  ShowButton,
  PayIcon,
  StatusDiv
} from './styledComponents'
import messages from './messages'
import { ResellerPayment, QueryProps, AffiliatesResult, Message } from '../../types/common'
import EmptyContainer from '../EmptyContainer'
import Select from 'antd/lib/select'
import Pagination from 'antd/lib/pagination/Pagination'
import moment, { Moment } from 'moment'
import get from 'lodash/get'
import { PAY_LIMITS, ALL_STATUS } from './constants'
import { getResellerPayments } from './data'
import Payday from '../../assets/jakroo_payday.png'
import { NOTE_FORMAT } from '../UsersAdmin/constants'
import Spin from 'antd/lib/spin'
import MediaQuery from 'react-responsive'
import { PENDING_PAY, TO_PAY, PAID, PROCESSING, FAILURE } from '../../constants'

const { Option } = Select

const statusList = [
  ALL_STATUS,
  PENDING_PAY,
  TO_PAY,
  PAID,
  PROCESSING,
  FAILURE
]

interface Data extends QueryProps {
  paymentsResult: AffiliatesResult
}

interface Props {
  history: any
  data: Data
  currentPage: number
  startDate: string
  endDate: string
  statusValue: string
  orderValue: string
  setStatus: (value: string) => void
  setOrderPoint: (value: string) => void
  setShowAction: () => void
  changeDateAction: (startDate: string, endDate: string) => void
  formatMessage: (messageDescriptor: Message) => string
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
}

class ResellerOrders extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }

  handleChangeCalendar = (dates: [Moment, Moment]) => {
    const { changeDateAction } = this.props
    const startDate = moment(dates[0]).format(NOTE_FORMAT)
    const endDate = moment(dates[1]).format(NOTE_FORMAT)
    changeDateAction(startDate, endDate)
  }

  handleChangeOrderPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setOrderPoint } = this.props
    const { target: { value } } = event
    setOrderPoint(value)
  }

  handleChangeStatus = (value: string) => {
    const { setStatus } = this.props
    setStatus(value)
  }

  handleShow = () => {
    const { setShowAction } = this.props
    setShowAction()
  }

  render() {
    const {
      data,
      startDate,
      endDate,
      currentPage,
      statusValue,
      formatMessage,
    } = this.props
    const { loading } = data || {}
    const payments = get<Data, 'paymentsResult.payments', ResellerPayment[]>(
      data,
      'paymentsResult.payments',
      []
    )
    const fullCount = get(data, 'paymentsResult.fullCount', 0)
    const start = startDate ? moment(startDate, NOTE_FORMAT) : ''
    const end = endDate ? moment(endDate, NOTE_FORMAT) : ''
    const rangeValue = [start, end]
    const selectOptions = statusList.map((currentStatus, index) => (
      <Option key={index} value={currentStatus !== ALL_STATUS ? currentStatus : ''}>
        {currentStatus}
      </Option>
    ))
    return (
      <Container>
        <PayIcon src={Payday} />
        <HeaderList>
          <FormattedMessage {...messages.filterBy} />
          <InputDiv>
            <StatusDiv>
              <FormattedMessage {...messages.commisionStatus} />
              <StatusFilter
                value={statusValue}
                onChange={this.handleChangeStatus}
              >
                {selectOptions}
              </StatusFilter>
            </StatusDiv>
            <RangePickerStyled
              value={rangeValue}
              placeholder={[formatMessage(messages.from), formatMessage(messages.to)]}
              format={NOTE_FORMAT}
              allowClear={false}
              onChange={this.handleChangeCalendar}
              size="large"
              disabled={loading}
            />
            <ShowButton onClick={this.handleShow}>
              <FormattedMessage {...messages.show} />
            </ShowButton>
          </InputDiv>
        </HeaderList>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <ListContainer>
          <Table>
            <thead>
              <Row>
                <Header>{formatMessage(messages.orderDate)}</Header>
                <Header>{formatMessage(messages.orderNumber)}</Header>
                <MediaQuery minWidth={769}>
                  {matches => matches && (
                    <>
                      <Header>{formatMessage(messages.store)}</Header>
                      <Header>{formatMessage(messages.orderStatus)}</Header>
                      <Header>{formatMessage(messages.orderAmount)}</Header>
                    </>
                  )}
                </MediaQuery>
                <Header>{formatMessage(messages.commisionStatus)}</Header>
                <Header>{formatMessage(messages.amount)}</Header>
                <Header>{formatMessage(messages.datePaid)}</Header>
              </Row>
            </thead>
            {loading ?
              <LoadingContainer><Spin /></LoadingContainer>
              : <tbody>
                {payments.length ? (
                  payments.map((
                    {
                      createdAt,
                      orderAmount,
                      status,
                      amount,
                      orderId,
                      store,
                      orderStatus,
                      paidAt,
                    }: ResellerPayment,
                    index: number) =>
                    <RepDiv key={index}>
                      <Cell>
                        {createdAt ? moment(createdAt).format(NOTE_FORMAT) : '-'}
                      </Cell>
                      <Cell>{orderId}</Cell>
                      <MediaQuery minWidth={769}>
                        {matches => matches &&
                          <>
                            <Cell>{store}</Cell>
                            <Cell>{orderStatus}</Cell>
                            <Cell>${orderAmount.toFixed(2)}</Cell>
                          </>
                        }
                      </MediaQuery>
                      <Cell>{status}</Cell>
                      <Cell>${amount.toFixed(2)}</Cell>
                      <Cell>
                        {paidAt ? moment(paidAt).format(NOTE_FORMAT) : '-'}
                      </Cell>
                    </RepDiv>

                  )
                ) : (
                    <EmptyContainer message={formatMessage(messages.empty)} />
                  )}
              </tbody>}
          </Table>
          <Pagination
            current={currentPage}
            pageSize={PAY_LIMITS}
            total={Number(fullCount)}
            onChange={this.handleOnChangePage}
          />
        </ListContainer>
      </Container>
    )
  }
}

interface OwnProps {
  currentPage?: number
  start?: string
  end?: string
  status?: String,
  orderPoint?: String
}

const mapStateToProps = (state: any) => state.get('resellerOrders').toJS()

const ResellerOrdersEnhance = compose(
  connect(mapStateToProps, { ...ResellerActions }),
  graphql(getResellerPayments, {
    options: ({ currentPage, start, end, status, orderPoint }: OwnProps) => {
      const offset = currentPage ? (currentPage - 1) * PAY_LIMITS : 0
      return {
        variables: {
          limit: PAY_LIMITS,
          offset,
          start,
          end,
          status,
          orderPoint
        },
        skip: !start,
        fetchPolicy: 'network-only'
      }
    }
  }),
)(ResellerOrders)

export default ResellerOrdersEnhance
