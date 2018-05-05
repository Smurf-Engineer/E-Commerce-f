/**
 * CartForHeader Component - Created by cazarez on 02/05/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import Badge from 'antd/lib/badge'
import { Container, Image } from './styledComponents'
import cart from '../../assets/cart.svg'
import { getTotalItemsIncart } from '../MainLayout/actions'

interface Props {
  history?: any
  totalItems: number
  getTotalItemsIncart: () => void
}

export class CartForHeader extends React.PureComponent<Props, {}> {
  componentDidMount() {
    const { getTotalItemsIncart: totalItems } = this.props
    totalItems()
  }

  render() {
    const { totalItems } = this.props
    return (
      <Container>
        <Badge count={totalItems} overflowCount={9}>
          <Image src={cart} onClick={this.gotoCartpage} />
        </Badge>
      </Container>
    )
  }

  gotoCartpage = () => {
    const { history } = this.props
    history.push('/cart-page')
  }
}
const mapStateToProps = null
const CartForHeaderEnhanced = compose(
  connect(mapStateToProps, { getTotalItemsIncart })
)(CartForHeader)

export default CartForHeaderEnhanced
