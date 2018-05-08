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
  PriceContainer,
  AddMore,
  DeleteItem,
  BottomDivider
} from './styledComponents'
import CartListItemTable from '../../components/CartListItemTable'
import { PriceRange } from '../../types/common'
import messages from '../ProductInfo/messages'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  title: string
  description: string
  price: PriceRange
  image: string
}

class CartListItem extends React.Component<Props, {}> {
  render() {
    const { formatMessage, title, description, price, image } = this.props
    return (
      <ItemDetails>
        <Container>
          <Image src={image} />
          <ItemDetails>
            <ItemDetailsHeader>
              <NameContainer>
                <ItemDetailsHeaderName>{title}</ItemDetailsHeaderName>
                <ItemDetailsHeaderNameDetail>
                  {description}
                </ItemDetailsHeaderNameDetail>
              </NameContainer>
              <PriceContainer>
                <ItemDetailsHeaderPrice>{`$${
                  price.price
                }`}</ItemDetailsHeaderPrice>
                <ItemDetailsHeaderPriceDetail>
                  {`${formatMessage(messages.unitPrice)} $${price.price}`}
                </ItemDetailsHeaderPriceDetail>
                <ItemDetailsHeaderPriceDetail>
                  Add 1 more for $92
                </ItemDetailsHeaderPriceDetail>
              </PriceContainer>
            </ItemDetailsHeader>
            <CartListItemTable formatMessage={formatMessage} />
            <AddMore>+ Add More</AddMore>
            <DeleteItem>Delete</DeleteItem>
          </ItemDetails>
        </Container>
        <BottomDivider />
      </ItemDetails>
    )
  }
}

export default CartListItem
