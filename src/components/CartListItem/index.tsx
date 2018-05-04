/**
 * CartListItem Component - Created by gustavomedina on 04/05/18.
 */
import * as React from 'react'
// import messages from './messages'
import {
  Container,
  Image,
  ItemDetails,
  ItemDetailsHeader,
  ItemDetailsHeaderName,
  ItemDetailsHeaderPrice,
  ItemDetailsHeaderNameDetail,
  ItemDetailsHeaderPriceDetail,
  NameContainer,
  PriceContainer
} from './styledComponents'
import CartListItemTable from '../../components/CartListItemTable'

interface Props {
  formatMessage: (messageDescriptor: any) => string
}

class CartListItem extends React.Component<Props, {}> {
  render() {
    const { formatMessage } = this.props
    return (
      <Container>
        <Image />
        <ItemDetails>
          <ItemDetailsHeader>
            <NameContainer>
              <ItemDetailsHeaderName>Product</ItemDetailsHeaderName>
              <ItemDetailsHeaderNameDetail>
                Subtitle
              </ItemDetailsHeaderNameDetail>
            </NameContainer>
            <PriceContainer>
              <ItemDetailsHeaderPrice>$50</ItemDetailsHeaderPrice>
              <ItemDetailsHeaderPriceDetail>
                Unit Price: $99
              </ItemDetailsHeaderPriceDetail>
              <ItemDetailsHeaderPriceDetail>
                Add 1 more for $92
              </ItemDetailsHeaderPriceDetail>
            </PriceContainer>
          </ItemDetailsHeader>
          <CartListItemTable formatMessage={formatMessage} />
        </ItemDetails>
      </Container>
    )
  }
}

export default CartListItem
