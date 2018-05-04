/**
 * CartForHeader Component - Created by cazarez on 02/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Badge from 'antd/lib/badge'
import messages from './messages'
import { Container, Text, Image } from './styledComponents'
import cart from '../../assets/cart.svg'

interface Props {}

class CartForHeader extends React.PureComponent<Props, {}> {
  render() {
    return (
      <Container>
        <Badge count={10} overflowCount={9}>
          <Image src={cart} />
        </Badge>
      </Container>
    )
  }
}

export default CartForHeader
