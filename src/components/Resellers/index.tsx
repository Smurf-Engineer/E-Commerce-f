/**
 * Resellers Component - Created by Jesús Apodaca on 26/03/20.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Select from 'antd/lib/select'
import * as ResellerActions from './actions'
import {
  Container,
  ScreenTitle,
  HeaderList,
  RangePickerStyled,
  ShowButton,
  InputDiv,
  OrderPoint,
  StatusFilter
} from './styledComponents'
import List from './PayList'
import messages from './messages'
import { UserPermissions, SelectedPays } from '../../types/common'
import { RESELLER_ORDERS, ADMIN_ROUTE, MAKE_PAYOUTS, IGNORE_STATUS_PAYOUTS } from '../AdminLayout/constants'
import { NOTE_FORMAT } from '../UsersAdmin/constants'
import moment, { Moment } from 'moment'
import { PREORDER, PENDING_APPROVAL, PAID_STATUS, CANCELLED } from '../../constants'
import { ALL_STATUS } from './constants'

const { Option } = Select

const statusList = [
  ALL_STATUS,
  PREORDER,
  PENDING_APPROVAL,
  PAID_STATUS,
  CANCELLED
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

class Resellers extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  handleChangeCalendar = (dates: [Moment, Moment]) => {
    const { changeDateAction } = this.props
    const startDate = moment(dates[0]).format(NOTE_FORMAT)
    const endDate = moment(dates[1]).format(NOTE_FORMAT)
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

  handleChangeOrderPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setOrderPoint } = this.props
    const { target: { value } } = event
    setOrderPoint(value)
  }

  handleChangeStatus = (value) => {
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
    const access = permissions[RESELLER_ORDERS] || {}
    if (!access.view) {
      history.replace(ADMIN_ROUTE)
    }
    const canEdit = access.edit
    const makePayouts = permissions[MAKE_PAYOUTS] || {}
    const isAccountant = makePayouts.view && makePayouts.edit
    const ignoreStatus = permissions[IGNORE_STATUS_PAYOUTS] || {}
    const overrideStatus = ignoreStatus.edit
    const defaultStart = moment().startOf('month').format(NOTE_FORMAT)
    const defaultEnd = moment().endOf('month').format(NOTE_FORMAT)
    const start = moment(startDate || defaultStart, NOTE_FORMAT)
    const end = moment(endDate || defaultEnd, NOTE_FORMAT)
    const rangeValue = [start, end]
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
            <StatusFilter
              value={statusValue}
              onChange={this.handleChangeStatus}
            >
              {selectOptions}
            </StatusFilter>
            <OrderPoint
              value={orderValue}
              onChange={this.handleChangeOrderPoint}
              placeholder={formatMessage(messages.orderPoint)}
            />
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

const mapStateToProps = (state: any) => state.get('resellers').toJS()

const ResellersEnhance = compose(
  connect(mapStateToProps, { ...ResellerActions })
)(Resellers)

export default ResellersEnhance
