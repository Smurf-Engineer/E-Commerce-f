/**
 * CartListItem Component - Created by gustavomedina on 04/05/18.
 */
import * as React from 'react'
import findIndex from 'lodash/findIndex'
import find from 'lodash/find'
import MediaQuery from 'react-responsive'
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
  FooterItem,
  HeaderPriceDetailEmpty
} from './styledComponents'
import get from 'lodash/get'
import filter from 'lodash/filter'
import CartListItemTable from '../../components/CartListItemTable'
import {
  PriceRange,
  ItemDetailType,
  CartItems,
  ProductColors,
  Message
} from '../../types/common'
import messages from '../ProductInfo/messages'
import cartListItemMsgs from './messages'
import AddToCartButton from '../AddToCartButton'
import config from '../../config/index'
import { CardNumberElement } from 'react-stripe-elements'

interface Props {
  formatMessage: (messageDescriptor: Message, params?: MessagePrice) => string
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
  setDetailColor?: (
    index: number,
    detailIndex: number,
    color: ProductColors
  ) => void
  setDetailSize?: (
    index: number,
    detailIndex: number,
    size: ItemDetailType
  ) => void
  onClickReorder?: () => void
  openFitInfoAction: (open: boolean, selectedIndex: number) => void

  title: string
  description: string
  price: PriceRange
  productTotal?: number
  unitPrice?: number
  image: string
  cartItem: CartItems
  itemIndex: number
  onlyRead?: boolean
  canReorder?: boolean
  currentCurrency: string
  currencySymbol?: string
  history?: any
  openFitInfo: boolean
}

interface MessagePrice {
  symbol: string
  price: string
}

export class CartListItem extends React.Component<Props, {}> {
  getQuantity = (priceRange: PriceRange) => {
    let val = 0
    if (priceRange && priceRange.quantity === 'Personal') {
      val = 1
    } else if (priceRange.quantity) {
      val = parseInt(priceRange.quantity.split('-')[0], 10)
    }
    return val
  }

  getPriceRange(priceRanges: PriceRange[], totalItems: CardNumberElement) {
    const { price } = this.props
    let markslider = { quantity: '0', price: 0 }
    if (price && price.quantity !== 'Personal') {
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

    if (price && price.quantity !== 'Personal') {
      let priceIndex = findIndex(
        priceRanges,
        pr => pr.quantity === price.quantity
      )
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

  gotToProductPage = () => {
    const {
      cartItem: {
        designId,
        product: { id, yotpoId }
      },
      history,
      onlyRead
    } = this.props

    if (onlyRead) {
      return
    }

    let productUrl = `/product?id=${id}&modelId=${yotpoId}`

    if (designId) {
      productUrl = `/custom-product?id=${designId}`
    }

    history.push(productUrl)
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
      canReorder,
      productTotal,
      unitPrice,
      currentCurrency,
      currencySymbol,
      handleAddItemDetail = () => {},
      handledeleteItemDetail = () => {},
      setLabelItemDetail = () => {},
      setDetailQuantity = () => {},
      setDetailFit = () => {},
      setDetailGender = () => {},
      setDetailColor = () => {},
      setDetailSize = () => {},
      removeItem = () => {},
      openFitInfoAction = () => {},
      openFitInfo
    } = this.props

    const {
      designId,
      designName,
      designImage,
      designCode,
      fixedPrices = []
    } = cartItem

    const quantities = cartItem.itemDetails.map((itemDetail, ind) => {
      return itemDetail.quantity
    })
    const quantitySum = quantities.reduce((a, b) => a + b, 0)

    const productPriceRanges = get(
      cartItem,
      fixedPrices && fixedPrices.length ? 'fixedPrices' : 'product.priceRange',
      []
    )
    const mpnCode = get(cartItem, 'product.mpn', '')
    const isTeamStore = get(cartItem, 'teamStoreId', '')
    // get prices from currency
    const currencyPrices = filter(productPriceRanges, {
      abbreviation: currentCurrency || config.defaultCurrency
    })

    const personalPrice = get(
      find(cartItem.product.priceRange, {
        quantity: 'Personal',
        abbreviation: currentCurrency || config.defaultCurrency
      }),
      'price',
      0
    )

    const teamStoreRange = find(cartItem.product.priceRange, {
      quantity: '2-5',
      abbreviation: currentCurrency || config.defaultCurrency
    })
    let priceRange =
      !isTeamStore || fixedPrices.length
        ? this.getPriceRange(currencyPrices, quantitySum)
        : teamStoreRange

    priceRange =
      priceRange && priceRange.price === 0
        ? currencyPrices[currencyPrices.length - 1]
        : priceRange

    const itemTotal = priceRange
      ? priceRange.price * quantitySum
      : unitPrice || 0 * quantitySum
    const total = productTotal || itemTotal
    const unitaryPrice = unitPrice || get(priceRange, 'price')

    const symbol = currencySymbol || '$'

    const table = (
      <CartListItemTable
        {...{
          onlyRead,
          cartItem,
          formatMessage,
          handledeleteItemDetail,
          itemIndex,
          setDetailColor,
          setLabelItemDetail,
          setDetailQuantity,
          setDetailFit,
          setDetailGender,
          setDetailSize,
          openFitInfoAction,
          openFitInfo
        }}
      />
    )

    const footer = (
      <FooterItem>
        <AddMore onClick={e => handleAddItemDetail(e, itemIndex)}>
          {formatMessage(messages.addMore)}
        </AddMore>
        <DeleteItem onClick={e => removeItem(e, itemIndex)}>
          {formatMessage(messages.delete)}
        </DeleteItem>
      </FooterItem>
    )

    const itemDetailsHeader = (
      <ItemDetailsHeader>
        <NameContainer>
          <ItemDetailsHeaderName>{title}</ItemDetailsHeaderName>
          <ItemDetailsHeaderNameDetail>
            {description}
          </ItemDetailsHeaderNameDetail>
          <div>{designCode || mpnCode}</div>
        </NameContainer>
        <PriceContainer>
          <ItemDetailsHeaderPrice>
            {`${symbol} ${(total || 0).toFixed(2)}`}
          </ItemDetailsHeaderPrice>
          <ItemDetailsHeaderPriceDetail highlighted={true}>
            {formatMessage(
              !isTeamStore ? messages.unitPrice : messages.teamPrice,
              { symbol, price: (unitaryPrice || 0).toFixed(2) }
            )}
          </ItemDetailsHeaderPriceDetail>
          <ItemDetailsHeaderPriceDetail>
            {formatMessage(messages.regularPrice, {
              symbol,
              price: personalPrice
            })}
          </ItemDetailsHeaderPriceDetail>
          <HeaderPriceDetailEmpty />
        </PriceContainer>
      </ItemDetailsHeader>
    )

    const renderAddToCartButton = (
      <AddToCartButton
        label={formatMessage(cartListItemMsgs.reorder)}
        renderForThumbnail={false}
        item={cartItem}
        {...{ formatMessage, designId, designName, designImage }}
        withoutTop={true}
        myLockerList={false}
        itemProdPage={true}
        orderDetails={true}
        onClick={() => true}
      />
    )

    const renderView = (
      <MediaQuery minWidth={'641px'}>
        {matches => {
          if (matches) {
            return (
              <Container>
                <Image
                  {...{ onlyRead }}
                  src={image}
                  onClick={this.gotToProductPage}
                />
                <ItemDetails>
                  {itemDetailsHeader}
                  {table}
                  {!onlyRead && footer}
                  {canReorder && renderAddToCartButton}
                </ItemDetails>
              </Container>
            )
          } else {
            return (
              <Container>
                <ItemDetails>
                  <Image
                    {...{ onlyRead }}
                    src={image}
                    onClick={this.gotToProductPage}
                  />
                  <ItemDetails>{itemDetailsHeader}</ItemDetails>
                </ItemDetails>
                <div>
                  {table}
                  {!onlyRead && footer}
                  {canReorder && renderAddToCartButton}
                </div>
              </Container>
            )
          }
        }}
      </MediaQuery>
    )
    return (
      <div>
        {renderView}
        <BottomDivider />
      </div>
    )
  }
}

export default CartListItem
