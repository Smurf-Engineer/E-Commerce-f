/**
 * Affiliates Component - Created by Jesús Apodaca on 26/03/20.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Select from 'antd/lib/select'
import * as AffiliatesActions from './actions'
import {
  Container,
  ScreenTitle,
  HeaderList,
  RangePickerStyled,
  ShowButton,
  InputDiv,
  StatusFilter,
  HeaderInput,
  InputTitle
} from './styledComponents'
import List from './PayList'
import messages from './messages'
import { UserPermissions, SelectedPays } from '../../types/common'
import { AFFILIATES, ADMIN_ROUTE, MAKE_PAYOUTS, IGNORE_STATUS_PAYOUTS } from '../AdminLayout/constants'
import moment, { Moment } from 'moment'
import { DATE_FORMAT, FAILURE, PAID, PENDING_PAY, PROCESSING, TO_PAY } from '../../constants'
import { ALL_STATUS } from './constants'
import { CA_CURRENCY, US_CURRENCY } from '../AffiliateAbout/constants'

const { Option } = Select

const statusList = [
  ALL_STATUS,
  PENDING_PAY,
  TO_PAY,
  PAID,
  PROCESSING,
  FAILURE
]

const currencies = [
  ALL_STATUS,
  US_CURRENCY,
  CA_CURRENCY
]

interface Props {
  history: any
  currentPage: number
  searchText: string
  loading: boolean
  start: string
  end: string
  startDate: string
  endDate: string
  permissions: UserPermissions
  show: boolean
  selected: SelectedPays
  status: string
  orderPoint: string
  statusValue: string
  orderValue: string
  setStatus: (value: string) => void
  setOrderPoint: (value: string) => void
  setSelected: (value: SelectedPays) => void
  setShowAction: () => void
  setLoading: (loading: boolean) => void
  changeDateAction: (startDate: string, endDate: string) => void
  formatMessage: (messageDescriptor: any) => string
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setSearchTextAction: (searchText: string) => void
}

class Affiliates extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  handleChangeCalendar = (dates: [Moment, Moment]) => {
    const { changeDateAction } = this.props
    const startDate = moment(dates[0]).format(DATE_FORMAT)
    const endDate = moment(dates[1]).format(DATE_FORMAT)
    changeDateAction(startDate, endDate)
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }

  handleShow = () => {
    const { setShowAction } = this.props
    setShowAction()
  }

  handleInputChange = (value: string) => {
    const { setSearchTextAction } = this.props
    setSearchTextAction(value)
  }

  handleChangeOrderPoint = (value: string) => {
    const { setOrderPoint } = this.props
    setOrderPoint(value)
  }

  handleChangeStatus = (value: string) => {
    const { setStatus } = this.props
    setStatus(value)
  }

  render() {
    const {
      currentPage,
      formatMessage,
      loading,
      history,
      setLoading,
      selected,
      setSelected,
      start: startParam,
      end: endParam,
      startDate,
      searchText,
      status,
      orderPoint,
      statusValue,
      orderValue,
      endDate,
      permissions
    } = this.props
    const access = permissions[AFFILIATES] || {}
    if (!access.view) {
      history.replace(ADMIN_ROUTE)
    }
    const canEdit = access.edit
    const makePayouts = permissions[MAKE_PAYOUTS] || {}
    const isAccountant = makePayouts.view && makePayouts.edit
    const ignoreStatus = permissions[IGNORE_STATUS_PAYOUTS] || {}
    const overrideStatus = ignoreStatus.edit
    const defaultStart = moment().startOf('month').format(DATE_FORMAT)
    const defaultEnd = moment().endOf('month').format(DATE_FORMAT)
    const start = moment(startDate || defaultStart, DATE_FORMAT)
    const end = moment(endDate || defaultEnd, DATE_FORMAT)
    const rangeValue = [start, end]
    const currencyOptions = currencies.map((currentStatus, index) => (
      <Option key={index} value={currentStatus !== ALL_STATUS ? currentStatus : ''}>
        {currentStatus !== ALL_STATUS ? currentStatus.toUpperCase() : currentStatus}
      </Option>
    ))
    const selectOptions = statusList.map((currentStatus, index) => (
      <Option key={index} value={currentStatus !== ALL_STATUS ? currentStatus : ''}>
        {currentStatus}
      </Option>
    ))
    return (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <HeaderList>
          <FormattedMessage {...messages.subtitle} />
          <InputDiv>
            <HeaderInput>
              <InputTitle>
                <FormattedMessage {...messages.comissionStatus} />
              </InputTitle>
              <StatusFilter
                value={statusValue}
                onChange={this.handleChangeStatus}
              >
              {selectOptions}
              </StatusFilter>
            </HeaderInput>
            <HeaderInput>
              <InputTitle>
                <FormattedMessage {...messages.orderPoint} />
              </InputTitle>
              <StatusFilter
                value={orderValue}
                onChange={this.handleChangeOrderPoint}
              >
              {currencyOptions}
              </StatusFilter>
            </HeaderInput>
            <RangePickerStyled
              value={rangeValue}
              placeholder={[formatMessage(messages.from), formatMessage(messages.to)]}
              format={DATE_FORMAT}
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
        <List
          {...{
            formatMessage,
            loading,
            setLoading,
            setSelected,
            selected,
            currentPage,
            overrideStatus,
            searchText,
            history,
            status,
            orderPoint,
            canEdit,
            isAccountant
          }}
          startParam={startParam || defaultStart}
          endParam={endParam || defaultEnd}
          onChangePage={this.handleOnChangePage}
          handleInputChange={this.handleInputChange}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('affiliates').toJS()

const AffiliatesEnhance = compose(
  connect(mapStateToProps, { ...AffiliatesActions })
)(Affiliates)

export default AffiliatesEnhance
