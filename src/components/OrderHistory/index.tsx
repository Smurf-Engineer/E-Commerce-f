/**
 * OrderHistory Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import * as OrderHistoryActions from './actions'
import { Container } from './styledComponents'
import List from './OrdersList'
import { sorts } from '../../types/common'

interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  formatMessage: (messageDescriptor: any) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
}

class OrderHistory extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  render() {
    const { currentPage, orderBy, sort, formatMessage } = this.props

    return (
      <Container>
        <List
          {...{ formatMessage, currentPage, orderBy, sort }}
          onSortClick={this.handleOnSortClick}
          onOrderClick={this.handleOnOrderClick}
          onChangePage={this.handleOnChangePage}
          interactiveHeaders={true}
        />
      </Container>
    )
  }

  handleOnSortClick = (label: string, sort: sorts) => {
    const { setOrderByAction } = this.props
    setOrderByAction(label, sort)
  }

  handleOnOrderClick = (orderId: string) => {
    // TODO: go to order details when will be implemented
    const { history } = this.props
    history.push(`/order-placed?orderId=${orderId}`)
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }
}

const mapStateToProps = (state: any) => state.get('orderHistory').toJS()

const OrderHistoryEnhance = compose(
  connect(
    mapStateToProps,
    { ...OrderHistoryActions }
  )
)(OrderHistory)

export default OrderHistoryEnhance
