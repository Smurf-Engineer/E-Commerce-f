import { CartItems, PriceRange } from '../types/common'
import get from 'lodash/get'

export const getShoppingCartData = (shoppingCart: CartItems[]) => {
  let totalSum = 0
  let totalWithoutDiscount = 0
  let priceRangeToApply = 0
  let show25PercentMessage = false
  let justOneOfEveryItem = true
  let maxquantity = 0
  let numberOfProducts = 0
  let nameOfFirstProduct = ''
  if (shoppingCart) {
    shoppingCart.map((cartItem, index) => {
      const quantities = cartItem.itemDetails.map(itemDetail => {
        return itemDetail.quantity
      })
      const quantitySum = quantities.reduce((a, b) => a + b, 0)

      // increase number of products in cart
      numberOfProducts = numberOfProducts + quantitySum
      // change flag to show/hide 25 percentMessage
      show25PercentMessage = !index && quantitySum === 1

      if (!index) {
        nameOfFirstProduct = cartItem.product.name
      }

      // Verify if at least one item has quantity > 1
      if (quantitySum !== 1) {
        justOneOfEveryItem = false
      }

      // Get the maxquantity of articles of a product
      if (quantitySum > maxquantity) {
        maxquantity = quantitySum
      }

      totalWithoutDiscount =
        totalWithoutDiscount +
        quantitySum * cartItem.product.priceRange[0].price
    })

    if (justOneOfEveryItem && shoppingCart.length) {
      priceRangeToApply = getPriceRangeToApply(shoppingCart.length)
    } else {
      if (shoppingCart.length) {
        priceRangeToApply = getPriceRangeToApply(maxquantity)
      }
    }

    shoppingCart.map(cartItem => {
      const quantities = cartItem.itemDetails.map(itemDetail => {
        return itemDetail.quantity
      })
      const quantitySum = quantities.reduce((a, b) => a + b, 0)

      const productPriceRanges = get(cartItem, 'product.priceRange', [])
      let priceRange =
        priceRangeToApply !== 0
          ? cartItem.product.priceRange[priceRangeToApply]
          : getPriceRange(productPriceRanges, quantitySum)

      priceRange =
        priceRange.price === 0
          ? productPriceRanges[productPriceRanges.length - 1]
          : priceRange

      // increase the total
      totalSum = totalSum + priceRange.price * quantitySum
    })
  }
  return {
    total: totalSum,
    totalWithoutDiscount,
    priceRangeToApply,
    nameOfFirstProduct,
    show25PercentMessage,
    numberOfProducts
  }
}

const getPriceRange = (priceRanges: PriceRange[], totalItems: number) => {
  let markslider = { quantity: '0', price: 0 }
  for (const priceRangeItem of priceRanges) {
    if (!totalItems || !priceRangeItem.quantity) {
      break
    }

    const val =
      priceRangeItem.quantity && priceRangeItem.quantity === 'Personal'
        ? 1
        : priceRangeItem.quantity
          ? parseInt(priceRangeItem.quantity.split('-')[1], 10)
          : 0

    if (val >= totalItems) {
      markslider = priceRangeItem
      break
    }
  }
  return markslider
}

const getPriceRangeToApply = (items: number) => {
  if (items >= 2 && items <= 5) {
    return 1
  } else if (items >= 6 && items <= 24) {
    return 2
  } else if (items >= 25 && items <= 49) {
    return 3
  } else if (items >= 50) {
    return 4
  } else {
    return 0
  }
}

export const designExistsOnCart = (designId: string) => {
  try {
    const cart = localStorage.getItem('cart')
    if (cart && cart.length) {
      for (let cartItem of JSON.parse(cart)) {
        if (cartItem.designId === designId) {
          return true
        }
      }
    }
    return false
  } catch (e) {
    return false
  }
}
