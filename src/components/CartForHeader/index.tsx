/**
 * CartForHeader Component - Created by cazarez on 02/05/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import Badge from 'antd/lib/badge'
import { Container, Image } from './styledComponents'
import cart from '../../assets/cart.svg'
import cartWhite from '../../assets/cart_white.svg'
import { getTotalItemsIncart } from '../MainLayout/actions'

interface Props {
  history?: any
  totalItems: number
  designHasChanges: boolean
  darkMode?: boolean
  getTotalItemsIncart: () => void
  openWithoutSaveModalAction: (open: boolean, route?: string) => void
}

export class CartForHeader extends React.PureComponent<Props, {}> {
  componentDidMount() {
    const { getTotalItemsIncart: totalItems } = this.props
    totalItems()
  }

  render() {
    const { totalItems, darkMode = false } = this.props
    return (
      <Container onClick={this.gotoCartpage}>
        <Badge count={totalItems} overflowCount={9}>
          <Image src={darkMode ? cartWhite : cart} onClick={this.gotoCartpage} />
        </Badge>
      </Container>
    )
  }

  gotoCartpage = () => {
    const {
      history: { location, push },
      designHasChanges,
      openWithoutSaveModalAction
    } = this.props
    if (
      (location.pathname as String).includes('design-center') &&
      designHasChanges
    ) {
      openWithoutSaveModalAction(true, '/shopping-cart')
      return
    }
    push('/shopping-cart')
  }
}
const mapStateToProps = null
const CartForHeaderEnhanced = compose(
  connect(
    mapStateToProps,
    { getTotalItemsIncart }
  )
)(CartForHeader)

export default CartForHeaderEnhanced
