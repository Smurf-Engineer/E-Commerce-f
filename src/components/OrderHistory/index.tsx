/**
 * OrderHistory Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as OrderHistoryActions from './actions'
import { Container, ScreenTitle } from './styledComponents'
import List from './OrdersList'
import messages from './messages'
import { sorts, User } from '../../types/common'
import OrderDetails from '../OrderDetails'
import SwipeableViews from 'react-swipeable-views'
import queryString from 'query-string'
import { ORDER_HISTORY } from '../../screens/Account/constants'
import OrderServiceDetails from '../OrderServiceDetails'

interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  isService: boolean
  orderId: string
  currentCurrency: string
  user: User
  formatMessage: (messageDescriptor: any) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setOrderIdAction: (orderId: string, isService?: boolean) => void
}

class OrderHistory extends React.Component<Props, {}> {
  state = {
    editOrder: false,
    deleteOrder: false
  }
  componentDidMount() {
    const {
      history: {
        location: { search }
      }
    } = this.props
    const queryParams = queryString.parse(search)
    const { orderId } = queryParams
    if (orderId) {
      this.handleOnOrderClick(orderId)
    }
  }
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  editOrderAction = (orderId: string) => {
    const { setOrderIdAction } = this.props
    setOrderIdAction(orderId, false)
    this.setState({ editOrder: true })
  }

  deleteOrderAction = (orderId: string) => {
    const { setOrderIdAction } = this.props
    setOrderIdAction(orderId, false)
    this.setState({ deleteOrder: true })
  }

  render() {
    const { currentPage, user, orderBy, currentCurrency, sort, formatMessage, orderId, isService, history } = this.props
    const userId = user ? user.id : ''
    const onBehalf = user ? user.onBehalf : false
    const adminUser = user ? user.usedBy : false
    const { deleteOrder, editOrder } = this.state
    return (
      <SwipeableViews
        onChangeIndex={this.handleOnChangeIndex}
        index={!!orderId.length ? 1 : 0}
      >
        <Container>
          <ScreenTitle>
            <FormattedMessage {...messages.title} />
          </ScreenTitle>
          <List
            {...{ formatMessage, currentPage, orderBy, sort, userId, onBehalf }}
            onSortClick={this.handleOnSortClick}
            onOrderClick={this.handleOnOrderClick}
            editOrder={this.editOrderAction}
            deleteOrder={this.deleteOrderAction}
            onChangePage={this.handleOnChangePage}
            goToCart={this.goToCart}
            interactiveHeaders={true}
          />
        </Container>
        {isService ?
          <OrderServiceDetails
            {...{ orderId, formatMessage, history }}
            onReturn={this.handleOnOrderClick}
          /> :
          <OrderDetails
            onReturn={this.handleOnOrderClick}
            from={ORDER_HISTORY}
            goToCart={this.goToCart}
            showEdit={editOrder}
            showDelete={deleteOrder}
            {...{ orderId, formatMessage, onBehalf, currentCurrency, history, adminUser, user }}
          />
        }
      </SwipeableViews>
    )
  }

  goToCart = () => {
    const { history } = this.props
    history.push('/shopping-cart')
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

  handleOnOrderClick = (orderId: string, isService?: boolean) => {
    const { setOrderIdAction } = this.props
    this.setState({ editOrder: false, deleteOrder: false })
    setOrderIdAction(orderId, isService)
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    window.scrollTo(0, 0)
    setCurrentPageAction(page)
  }
}

const mapStateToProps = (state: any) => {
  const app = state.get('app').toJS()
  const langProps = state.get('languageProvider').toJS()
  const orderHistory = state.get('orderHistory').toJS()
  return { ...app, ...orderHistory, ...langProps }
}

const OrderHistoryEnhance = compose(
  connect(mapStateToProps, { ...OrderHistoryActions })
)(OrderHistory)

export default OrderHistoryEnhance
