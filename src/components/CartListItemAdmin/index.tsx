/**
 * CartListItemAdmin Component - Created by eduardoquintero on 07/05/19.
 */
import * as React from 'react'
import findIndex from 'lodash/findIndex'
import MediaQuery from 'react-responsive'
import {
  Container,
  Image,
  ItemDetailsStyle,
  BottomDivider
} from './styledComponents'
import get from 'lodash/get'
import filter from 'lodash/filter'
import CartListItemTable from '../../components/CartListItemTable'
import { PriceRange, CartItems } from '../../types/common'
import config from '../../config/index'
import { PERSONAL } from '../../constants'
import ItemDetails from './ItemDetails'
import DesignInfo from './DesignInfo'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  handleAddItemDetail?: (
    event: React.MouseEvent<EventTarget>,
    index: number
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
    if (priceRange.quantity === PERSONAL) {
      val = 1
    } else if (priceRange.quantity) {
      val = parseInt(priceRange.quantity.split('-')[0], 10)
    }
    return val
  }

  getPriceRange(priceRanges: PriceRange[], totalItems: number) {
    const { price } = this.props
    let markslider = { quantity: '0', price: 0 }
    if (price.quantity !== PERSONAL) {
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
    if (price.quantity !== PERSONAL) {
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
      openFitInfoAction = () => {},
      openFitInfo
    } = this.props

    const { designId, designCode } = cartItem

    const quantities = cartItem.itemDetails.map((itemDetail, ind) => {
      return itemDetail.quantity
    })

    const quantitySum = quantities.reduce(
      (items, currentItem) => items + currentItem,
      0
    )

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
      : unitPrice || 0
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
          handledeleteItemDetail: null,
          itemIndex,
          setDetailColor: null,
          setLabelItemDetail: null,
          setDetailQuantity: null,
          setDetailFit: null,
          setDetailGender: null,
          setDetailSize: null,
          openFitInfoAction,
          openFitInfo
        }}
      />
    )

    const itemDetailsHeader = (
      <ItemDetails
        {...{
          title,
          description,
          designCode,
          mpnCode,
          symbol,
          total,
          onlyRead,
          designId,
          nextPrice,
          unitaryPrice,
          formatMessage
        }}
      />
    )
    const designInfo = <DesignInfo {...{ cartItem, formatMessage }} />
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
                <ItemDetailsStyle>
                  {itemDetailsHeader}
                  {designInfo}
                  {table}
                </ItemDetailsStyle>
              </Container>
            )
          } else {
            return (
              <Container>
                <ItemDetailsStyle>
                  <Image
                    {...{ onlyRead }}
                    src={image}
                    onClick={this.gotToProductPage}
                  />
                  <ItemDetailsStyle>{itemDetailsHeader}</ItemDetailsStyle>
                </ItemDetailsStyle>
                <div>{table}</div>
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
