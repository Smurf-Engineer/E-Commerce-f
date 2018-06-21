/**
 * CartListItem Component - Created by gustavomedina on 04/05/18.
 */
import * as React from 'react'
import findIndex from 'lodash/findIndex'
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
  BottomDivider,
  FooterItem
} from './styledComponents'
import get from 'lodash/get'
import CartListItemTable from '../../components/CartListItemTable'
import {
  PriceRange,
  Product,
  CartItemDetail,
  ItemDetailType
} from '../../types/common'
import messages from '../ProductInfo/messages'
import { FormattedMessage } from 'react-intl'

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
  storeDesignId?: string
  designId?: string
  designName?: string
  designImage?: string
  teamStoreId?: string
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
  getQuantity = (priceRange: PriceRange) => {
    let val = 0
    if (priceRange.quantity === 'Personal') {
      val = 1
    } else if (priceRange.quantity) {
      val = parseInt(priceRange.quantity.split('-')[0], 10)
    }
    return val
  }

  getPriceRange(priceRanges: PriceRange[], totalItems: number) {
    const { price } = this.props
    let markslider = { quantity: '0', price: 0 }
    if (price.quantity !== 'Personal') {
      markslider = price
    } else {
      for (const priceRangeItem of priceRanges) {
        if (!totalItems) {
          break
        }
        const val = this.getQuantity(priceRangeItem)

        if (val >= totalItems) {
          markslider = priceRangeItem
          break
        }
      }
    }
    return markslider
  }

  getNextPrice(priceRanges: PriceRange[], totalItems: number) {
    const priceRange = priceRanges[priceRanges.length - 1]
    let markslider = { items: 1, price: priceRange ? priceRange.price : 0 }
    const { price } = this.props
    if (price.quantity !== 'Personal') {
      let priceIndex = findIndex(priceRanges, pr => {
        return pr.quantity === price.quantity
      })
      priceIndex =
        priceIndex !== priceRanges.length - 1 ? priceIndex + 1 : priceIndex
      const priceRangeItem = priceRanges[priceIndex]
      const val = parseInt(priceRangeItem.quantity.split('-')[0], 10)
      markslider = {
        items: val - totalItems,
        price: priceRangeItem.price
      }
    } else {
      for (const priceRangeItem of priceRanges) {
        if (!totalItems) {
          break
        }

        const val = this.getQuantity(priceRangeItem)

        if (val > totalItems) {
          markslider = { items: val - totalItems, price: priceRangeItem.price }
          break
        }
      }
    }
    return markslider
  }

  render() {
    const {
      formatMessage,
      title,
      description,
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

    const productPriceRanges = get(cartItem, 'product.priceRange', [])

    let priceRange = this.getPriceRange(productPriceRanges, quantitySum)

    priceRange =
      priceRange && priceRange.price === 0
        ? productPriceRanges[productPriceRanges.length - 1]
        : priceRange

    const itemTotal = priceRange
      ? priceRange.price * quantitySum
      : unitPrice || 0 * quantitySum
    const total = itemTotal || productTotal
    const unitaryPrice = priceRange ? priceRange.price : unitPrice

    const nextPrice = this.getNextPrice(productPriceRanges, quantitySum)

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
                {!onlyRead && nextPrice.items > 0 ? (
                  <ItemDetailsHeaderPriceDetail>
                    <FormattedMessage
                      {...messages.addMoreFor}
                      values={{
                        price: nextPrice.price,
                        products: nextPrice.items
                      }}
                    />
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
              <FooterItem>
                <AddMore onClick={e => handleAddItemDetail(e, itemIndex)}>
                  {formatMessage(messages.addMore)}
                </AddMore>
                <DeleteItem onClick={e => removeItem(e, itemIndex)}>
                  {formatMessage(messages.delete)}
                </DeleteItem>
              </FooterItem>
            ) : null}
          </ItemDetails>
        </Container>
        <BottomDivider />
      </ItemDetails>
    )
  }
}

export default CartListItem
