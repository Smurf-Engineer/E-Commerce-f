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
                <ItemDetailsHeaderPrice>{`$${price.price ||
                  0}`}</ItemDetailsHeaderPrice>
                <ItemDetailsHeaderPriceDetail>
                  {`${formatMessage(messages.unitPrice)} $${price.price || 0}`}
                </ItemDetailsHeaderPriceDetail>
                <ItemDetailsHeaderPriceDetail>
                  {`${formatMessage(messages.add)} 1 ${formatMessage(
                    messages.moreFor
                  )} $${price.price || 0}`}
                  {/* Add 1 more for $92 */}
                </ItemDetailsHeaderPriceDetail>
              </PriceContainer>
            </ItemDetailsHeader>
            <CartListItemTable formatMessage={formatMessage} />
            <AddMore>{formatMessage(messages.addMore)}</AddMore>
            <DeleteItem>{formatMessage(messages.delete)}</DeleteItem>
          </ItemDetails>
        </Container>
        <BottomDivider />
      </ItemDetails>
    )
  }
}

export default CartListItem
