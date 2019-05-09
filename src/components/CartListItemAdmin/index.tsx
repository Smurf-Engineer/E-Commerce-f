/**
 * CartListItemAdmin Component - Created by eduardoquintero on 07/05/19.
 */
import * as React from 'react'
import findIndex from 'lodash/findIndex'
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
  HeaderPriceDetailEmpty,
  DesignInfoContainer,
  DesignInfoTitle,
  DesignInfoSubtitle,
  DesignInfoBox
} from './styledComponents'
import get from 'lodash/get'
import filter from 'lodash/filter'
import CartListItemTable from '../../components/CartListItemTable'
import {
  PriceRange,
  ItemDetailType,
  CartItems,
  ProductColors
} from '../../types/common'
import messages from '../ProductInfo/messages'
import { FormattedMessage } from 'react-intl'
import config from '../../config/index'

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
  currentCurrency: string
  currencySymbol?: string
  history?: any
  openFitInfo: boolean
}

class CartListItemAdmin extends React.Component<Props, {}> {
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

    let productUrl = `/product?id=${id}&yotpoId=${yotpoId}`

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

    const { designId, designCode } = cartItem

    const quantities = cartItem.itemDetails.map((itemDetail, ind) => {
      return itemDetail.quantity
    })

    const quantitySum = quantities.reduce((a, b) => a + b, 0)

    const productPriceRanges = get(cartItem, 'product.priceRange', [])
    const mpnCode = get(cartItem, 'product.mpn', '')

    // get prices from currency
    const currencyPrices = filter(productPriceRanges, {
      abbreviation: currentCurrency || config.defaultCurrency
    })

    let priceRange = this.getPriceRange(currencyPrices, quantitySum)

    priceRange =
      priceRange && priceRange.price === 0
        ? currencyPrices[currencyPrices.length - 1]
        : priceRange

    const itemTotal = priceRange
      ? priceRange.price * quantitySum
      : unitPrice || 0 * quantitySum
    const total = productTotal || itemTotal
    const unitaryPrice = unitPrice || priceRange.price

    const nextPrice = currencyPrices.length
      ? this.getNextPrice(currencyPrices, quantitySum)
      : { items: 0, price: 0 }

    const symbol = currencySymbol || '$'

    const table = (
      <CartListItemTable
        hideSizeHelp={true}
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
          <ItemDetailsHeaderPriceDetail>
            {`${formatMessage(messages.unitPrice)} ${symbol} ${(
              unitaryPrice || 0
            ).toFixed(2)}`}
          </ItemDetailsHeaderPriceDetail>
          {!onlyRead && designId && nextPrice.items > 0 ? (
            <ItemDetailsHeaderPriceDetail highlighted={true}>
              <FormattedMessage
                {...messages.addMoreFor}
                values={{
                  price: `${symbol} ${nextPrice.price.toFixed(2)}`,
                  products: nextPrice.items
                }}
              />
            </ItemDetailsHeaderPriceDetail>
          ) : (
            <HeaderPriceDetailEmpty />
          )}
        </PriceContainer>
      </ItemDetailsHeader>
    )
    const designInfo = (
      <DesignInfoContainer>
        <DesignInfoBox>
          <DesignInfoTitle> {formatMessage(messages.flatlock)}</DesignInfoTitle>
          <DesignInfoSubtitle>{cartItem.flatlock || '-'} </DesignInfoSubtitle>
        </DesignInfoBox>
        <DesignInfoBox>
          <DesignInfoTitle>
            {formatMessage(messages.flatlockCode)}
          </DesignInfoTitle>
          <DesignInfoSubtitle>
            {cartItem.flatlockCode || '-'}
          </DesignInfoSubtitle>
        </DesignInfoBox>
        <DesignInfoBox>
          <DesignInfoTitle>
            {formatMessage(messages.zipperColor)}
          </DesignInfoTitle>
          <DesignInfoSubtitle>{cartItem.zipperColor || '-'}</DesignInfoSubtitle>
        </DesignInfoBox>
        <DesignInfoBox>
          <DesignInfoTitle>
            {formatMessage(messages.bindingColor)}
          </DesignInfoTitle>
          <DesignInfoSubtitle>
            {cartItem.bindingColor || '-'}
          </DesignInfoSubtitle>
        </DesignInfoBox>
        <DesignInfoBox>
          <DesignInfoTitle>
            {formatMessage(messages.bibbraceColor)}
          </DesignInfoTitle>
          <DesignInfoSubtitle>
            {cartItem.bibBraceColor || '-'}
          </DesignInfoSubtitle>
        </DesignInfoBox>
      </DesignInfoContainer>
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
                  {designInfo}
                  {table}
                  {!onlyRead && footer}
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

export default CartListItemAdmin
