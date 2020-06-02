/**
 * Affiliates Component - Created by Jesús Apodaca on 26/03/20.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as AffiliatesActions from './actions'
import {
  Container,
  ScreenTitle,
  HeaderList,
  CalendarContainer,
  RangePickerStyled,
  DateLabels,
  ShowButton
} from './styledComponents'
import List from './PayList'
import messages from './messages'
import { UserPermissions, SelectedPays } from '../../types/common'
import { AFFILIATES, ADMIN_ROUTE } from '../AdminLayout/constants'
import { NOTE_FORMAT } from '../UsersAdmin/constants'
import moment, { Moment } from 'moment'

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
      endDate,
      permissions
    } = this.props
    const access = permissions[AFFILIATES] || {}
    if (!access.view) {
      history.replace(ADMIN_ROUTE)
    }
    const start = startDate ? moment(startDate, NOTE_FORMAT) : ''
    const end = endDate ? moment(endDate, NOTE_FORMAT) : ''
    const rangeValue = [start, end]
    return (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <HeaderList>
          <FormattedMessage {...messages.subtitle} />
          <CalendarContainer>
            <DateLabels>
              <FormattedMessage {...messages.from} />
              <FormattedMessage {...messages.to} />
            </DateLabels>
            <RangePickerStyled
              value={rangeValue}
              format={NOTE_FORMAT}
              allowClear={false}
              onChange={this.handleChangeCalendar}
              size="large"
              disabled={loading}
            />
            <ShowButton onClick={this.handleShow}>
              <FormattedMessage {...messages.show} />
            </ShowButton>
          </CalendarContainer>
        </HeaderList>
        {startParam &&
          <List
            {...{
              formatMessage,
              loading,
              setLoading,
              setSelected,
              selected,
              currentPage,
              searchText,
              history,
              startParam,
              endParam
            }}
            onChangePage={this.handleOnChangePage}
            handleInputChange={this.handleInputChange}
          />
        }
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('affiliates').toJS()

const AffiliatesEnhance = compose(
  connect(mapStateToProps, { ...AffiliatesActions })
)(Affiliates)

export default AffiliatesEnhance
