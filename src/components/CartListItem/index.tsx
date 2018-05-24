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
import {
  PriceRange,
  Product,
  CartItemDetail,
  ItemDetailType
} from '../../types/common'
import messages from '../ProductInfo/messages'

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  handleAddItemDetail?: (
    event: React.MouseEvent<EventTarget>,
    index: number
  ) => void
  removeItem?: (event: React.MouseEvent<EventTarget>, index: number) => void
  handledeleteItemDetail?: (
    event: React.MouseEvent<EventTarget>,
    index: number,
    detailIndex: number
  ) => void
  setLabelItemDetail?: (
    index: number,
    detailIndex: number,
    label: string
  ) => void
  setDetailQuantity?: (
    index: number,
    detailIndex: number,
    quantity: number
  ) => void

  setDetailFit?: (
    index: number,
    detailIndex: number,
    fit: ItemDetailType
  ) => void
  setDetailGender?: (
    index: number,
    detailIndex: number,
    gender: ItemDetailType
  ) => void
  setDetailSize?: (
    index: number,
    detailIndex: number,
    size: ItemDetailType
  ) => void

  title: string
  description: string
  price: PriceRange
  productTotal?: number
  unitPrice?: number
  image: string
  cartItem: CartItems
  itemIndex: number
  onlyRead?: boolean
}

class CartListItem extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      title,
      description,
      price,
      image,
      cartItem,
      itemIndex,
      onlyRead,
      productTotal,
      unitPrice,
      handleAddItemDetail = () => {},
      handledeleteItemDetail = () => {},
      setLabelItemDetail = () => {},
      setDetailQuantity = () => {},
      setDetailFit = () => {},
      setDetailGender = () => {},
      setDetailSize = () => {},
      removeItem = () => {}
    } = this.props

    const quantities = cartItem.itemDetails.map((itemDetail, ind) => {
      return itemDetail.quantity
    })

    const quantitySum = quantities.reduce((a, b) => a + b, 0)
    const itemTotal =
      cartItem.product && cartItem.product.priceRange
        ? cartItem.product.priceRange[0].price * quantitySum
        : 0
    const total = itemTotal || productTotal
    const unitaryPrice = price.price || unitPrice

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
                <ItemDetailsHeaderPrice>{`$${total ||
                  0}`}</ItemDetailsHeaderPrice>
                <ItemDetailsHeaderPriceDetail>
                  {`${formatMessage(messages.unitPrice)} $${unitaryPrice || 0}`}
                </ItemDetailsHeaderPriceDetail>
                {!onlyRead ? (
                  <ItemDetailsHeaderPriceDetail>
                    {`${formatMessage(messages.add)} 1 ${formatMessage(
                      messages.moreFor
                    )} $${price.price || 0}`}
                  </ItemDetailsHeaderPriceDetail>
                ) : null}
              </PriceContainer>
            </ItemDetailsHeader>
            <CartListItemTable
              {...{ onlyRead }}
              formatMessage={formatMessage}
              cartItem={cartItem}
              handledeleteItemDetail={handledeleteItemDetail}
              itemIndex={itemIndex}
              setLabelItemDetail={setLabelItemDetail}
              setDetailQuantity={setDetailQuantity}
              setDetailFit={setDetailFit}
              setDetailGender={setDetailGender}
              setDetailSize={setDetailSize}
            />
            {!onlyRead ? (
              <div>
                <AddMore onClick={e => handleAddItemDetail(e, itemIndex)}>
                  {formatMessage(messages.addMore)}
                </AddMore>
                <DeleteItem onClick={e => removeItem(e, itemIndex)}>
                  {formatMessage(messages.delete)}
                </DeleteItem>
              </div>
            ) : null}
          </ItemDetails>
        </Container>
        <BottomDivider />
      </ItemDetails>
    )
  }
}

export default CartListItem
