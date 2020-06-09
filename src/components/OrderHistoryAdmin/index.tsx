/**
 * OrderHistoryAdmin Component - Created by eduardoquintero on 07/05/19.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import moment, { Moment } from 'moment'
import { FormattedMessage } from 'react-intl'
import queryString from 'query-string'
import Select from 'antd/lib/select'
import * as OrderHistoryAdminActions from './actions'
import {
  Container,
  ScreenTitle,
  SearchInput,
  Filters,
  StyledSelect,
  Options,
  StyledInput,
  StyledDatePicker,
  ButtonWrapper,
  StyledButton
} from './styledComponents'
import List from './OrdersList'
import messages from './messages'
import { sorts, Message, UserPermissions } from '../../types/common'
import OrderDetailsAdmin from '../OrderDetailsAdmin'
import SwipeableViews from 'react-swipeable-views'
import { ORDER_STATUS } from '../../screens/Admin/constants'
import {
  PREORDER,
  PENDING_APPROVAL,
  PAID_STATUS,
  PAYMENT_ISSUE,
  CANCELLED,
  PURGED
} from '../../constants'
import { DATE_FORMAT } from './constants'
const Option = Select.Option

interface Props {
  history: History
  currentPage: number
  orderBy: string
  sort: sorts
  orderId: string
  searchText: string
  permissions: UserPermissions
  status: string
  orderPoint: string
  startDate: Moment
  endDate: Moment
  formatMessage: (messageDescriptor: Message) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setOrderIdAction: (orderId: string) => void
  setSearchTextAction: (searchText: string) => void
  setFiltersAction: (
    status: string,
    orderPoint: string,
    startDate: Moment,
    endDate: Moment
  ) => void
}

const ALL_STATUS = 'All'
const ONE_DAY = '1'

const statusList = [
  ALL_STATUS,
  PREORDER,
  PENDING_APPROVAL,
  PAID_STATUS,
  PAYMENT_ISSUE,
  PURGED,
  CANCELLED
]

const selectOptions = statusList.map((currentStatus, index) => (
  <Option key={index} value={currentStatus !== ALL_STATUS ? currentStatus : ''}>
    {currentStatus}
  </Option>
))
class OrderHistoryAdmin extends React.Component<Props, {}> {
  state = {
    status: '',
    startDate: null,
    endDate: null,
    orderPoint: ''
  }
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }
  componentDidMount() {
    const {
      setOrderIdAction,
      history: { location }
    } = this.props
    const { order } = queryString.parse(location.search)
    if (order) {
      setOrderIdAction(order)
    }
  }

  onSelectStatus = (value: string) => {
    this.setState({ status: value })
  }

  onChangeOrderPoint = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    this.setState({ orderPoint: value })
  }

  handleOnSelectStart = (date: Moment) => {
    this.setState({ startDate: date })
  }

  handleOnSelectEnd = (date: Moment) => {
    this.setState({ endDate: date })
  }

  disabledDatePicker = (current: any) => {
    if (!current) {
      return false
    }
    const date = moment()
    date.hour(0)
    date.minute(0)
    date.second(0)
    date.add(ONE_DAY, 'days')
    return current.valueOf() > date.valueOf()
  }

  onSaveFilters = () => {
    const { setFiltersAction } = this.props
    const { status, orderPoint, startDate, endDate } = this.state
    setFiltersAction(status, orderPoint, startDate, endDate)
  }

  render() {
    const {
      currentPage,
      orderBy,
      sort,
      history,
      permissions,
      formatMessage,
      orderId,
      searchText,
      status: filteredStatus,
      orderPoint: filteredOrderPoint,
      startDate: filteredStartDate,
      endDate: filteredEndDate
    } = this.props
    const { status, orderPoint, startDate, endDate } = this.state
    const access = permissions[ORDER_STATUS] || {}
    return (
      access.view && (
        <SwipeableViews
          onChangeIndex={this.handleOnChangeIndex}
          index={!!orderId.length ? 1 : 0}
        >
          <Container>
            <ScreenTitle>
              <FormattedMessage {...messages.title} />
            </ScreenTitle>
            <Filters>
              <ScreenTitle>{formatMessage(messages.filters)}</ScreenTitle>
              <Options>
                <StyledSelect
                  onChange={this.onSelectStatus}
                  showSearch={false}
                  value={status}
                >
                  {selectOptions}
                </StyledSelect>
                <StyledInput
                  value={orderPoint}
                  onChange={this.onChangeOrderPoint}
                  placeholder={formatMessage(messages.orderPoint)}
                />
                <StyledDatePicker
                  value={startDate}
                  onChange={this.handleOnSelectStart}
                  disabledDate={this.disabledDatePicker}
                  format={DATE_FORMAT}
                  size="large"
                  placeholder={formatMessage(messages.from)}
                />
                <StyledDatePicker
                  value={endDate}
                  onChange={this.handleOnSelectEnd}
                  disabledDate={this.disabledDatePicker}
                  format={DATE_FORMAT}
                  size="large"
                  placeholder={formatMessage(messages.to)}
                />
                <ButtonWrapper>
                  <StyledButton
                    {...{ loading: false }}
                    type="primary"
                    onClick={this.onSaveFilters}
                  >
                    {formatMessage(messages.show)}
                  </StyledButton>
                </ButtonWrapper>
              </Options>
            </Filters>
            <SearchInput
              value={searchText}
              onChange={this.handleInputChange}
              placeholder={formatMessage(messages.search)}
            />
            <List
              {...{
                formatMessage,
                currentPage,
                orderBy,
                sort,
                searchText,
                startDate
              }}
              onSortClick={this.handleOnSortClick}
              onOrderClick={this.handleOnOrderClick}
              onChangePage={this.handleOnChangePage}
              canEdit={access.edit}
              interactiveHeaders={true}
              startDate={filteredStartDate}
              endDate={filteredEndDate}
              status={filteredStatus}
              orderPoint={filteredOrderPoint}
            />
          </Container>
          <OrderDetailsAdmin
            onReturn={this.handleOnOrderClick}
            from={ORDER_STATUS}
            {...{ orderId, formatMessage, history }}
          />
        </SwipeableViews>
      )
    )
  }

  handleOnChangeIndex = (index: number) => {
    if (index === 0) {
      this.handleOnOrderClick('')
    }
  }

  handleOnSortClick = (label: string, sort: sorts) => {
    const { setOrderByAction } = this.props
    setOrderByAction(label, sort)
  }

  handleOnOrderClick = (orderId: string) => {
    const { setOrderIdAction } = this.props
    setOrderIdAction(orderId)
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { setSearchTextAction } = this.props
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    setSearchTextAction(value)
  }
}

const mapStateToProps = (state: any) => state.get('orderHistoryAdmin').toJS()

const OrderHistoryAdminEnhance = compose(
  connect(
    mapStateToProps,
    { ...OrderHistoryAdminActions }
  )
)(OrderHistoryAdmin)

export default OrderHistoryAdminEnhance
