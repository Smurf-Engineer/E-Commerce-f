/**
 * OrderHistoryAdmin Component - Created by eduardoquintero on 07/05/19.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import queryString from 'query-string'
import * as OrderHistoryAdminActions from './actions'
import { Container, ScreenTitle, SearchInput } from './styledComponents'
import List from './OrdersList'
import messages from './messages'
import { sorts, Message } from '../../types/common'
import OrderDetailsAdmin from '../OrderDetailsAdmin'
import SwipeableViews from 'react-swipeable-views'
import { ORDER_STATUS } from '../../screens/Admin/constants'

interface Props {
  history: History
  currentPage: number
  orderBy: string
  sort: sorts
  orderId: string
  searchText: string
  formatMessage: (messageDescriptor: Message) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setOrderIdAction: (orderId: string) => void
  setSearchTextAction: (searchText: string) => void
}

class OrderHistoryAdmin extends React.Component<Props, {}> {
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

  render() {
    const {
      currentPage,
      orderBy,
      sort,
      formatMessage,
      orderId,
      searchText
    } = this.props

    return (
      <SwipeableViews
        onChangeIndex={this.handleOnChangeIndex}
        index={!!orderId.length ? 1 : 0}
      >
        <Container>
          <ScreenTitle>
            <FormattedMessage {...messages.title} />
          </ScreenTitle>
          <SearchInput
            value={searchText}
            onChange={this.handleInputChange}
            placeholder={formatMessage(messages.search)}
          />
          <List
            {...{ formatMessage, currentPage, orderBy, sort, searchText }}
            onSortClick={this.handleOnSortClick}
            onOrderClick={this.handleOnOrderClick}
            onChangePage={this.handleOnChangePage}
            interactiveHeaders={true}
          />
        </Container>
        <OrderDetailsAdmin
          onReturn={this.handleOnOrderClick}
          from={ORDER_STATUS}
          {...{ orderId, formatMessage }}
        />
      </SwipeableViews>
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
  connect(mapStateToProps, { ...OrderHistoryAdminActions })
)(OrderHistoryAdmin)

export default OrderHistoryAdminEnhance
