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
import { sorts } from '../../types/common'
import OrderDetails from '../OrderDetails'
import SwipeableViews from 'react-swipeable-views'
import queryString from 'query-string'
import { ORDER_HISTORY } from '../../screens/Account/constants'
import PayModal from '../PayModal'

interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  orderId: string
  formatMessage: (messageDescriptor: any) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setOrderIdAction: (orderId: string) => void
}

class OrderHistory extends React.Component<Props, {}> {
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

  render() {
    const { currentPage, orderBy, sort, formatMessage, orderId } = this.props

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
            {...{ formatMessage, currentPage, orderBy, sort }}
            onSortClick={this.handleOnSortClick}
            onOrderClick={this.handleOnOrderClick}
            onChangePage={this.handleOnChangePage}
            interactiveHeaders={true}
          />
        </Container>
        <OrderDetails
          onReturn={this.handleOnOrderClick}
          from={ORDER_HISTORY}
          goToCart={this.goToCart}
          {...{ orderId, formatMessage }}
        />
        <PayModal
          open={true}
          items={[
            {
              name: 'EDIT REQUEST',
              price: 10,
              description: `Add a new Edit Request for the ProDesign: JV2-UVUVEWE-OSSAS1`
            },
            {
              name: 'EDIT REQUEST',
              price: 24,
              description: `Add a new Edit Request for the ProDesign: JV2-UVUVEWE-OSSAS1`
            }
          ]}
        />
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

  handleOnOrderClick = (orderId: string) => {
    const { setOrderIdAction } = this.props
    setOrderIdAction(orderId)
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    window.scrollTo(0, 0)
    setCurrentPageAction(page)
  }
}

const mapStateToProps = (state: any) => state.get('orderHistory').toJS()

const OrderHistoryEnhance = compose(
  connect(mapStateToProps, { ...OrderHistoryActions })
)(OrderHistory)

export default OrderHistoryEnhance
