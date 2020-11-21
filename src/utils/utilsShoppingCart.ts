import { CartItems, PriceRange } from '../types/common'
import get from 'lodash/get'
import filter from 'lodash/filter'

export const getShoppingCartData = (
  shoppingCart: CartItems[],
  currency: string
) => {
  let totalSum = 0
  let weightSum = 0
  let totalWithoutDiscount = 0
  let priceRangeToApply = 0
  let priceRangeRetails = 0
  let show25PercentMessage = false
  let justOneOfEveryItem = true
  let maxquantity = 0
  let numberOfProducts = 0
  let nameOfFirstProduct = ''
  let symbol = '$'
  let moreThanOneItem = false
  if (shoppingCart) {
    shoppingCart.map((cartItem, index) => {
      const quantities = cartItem.itemDetails.map(itemDetail => {
        return itemDetail.quantity
      })
      const quantitySum = quantities.reduce((a, b) => a + b, 0)

      weightSum += get(cartItem, 'product.weight', 0) * quantitySum
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

      if (quantitySum > maxquantity) {
        maxquantity = quantitySum
      }

      // Check for fixed prices
      const productPriceRanges = get(cartItem, 'product.priceRange', [])
      // get prices from currency
      const currencyPrices = filter(productPriceRanges, {
        abbreviation: currency
      })

      symbol =
        currencyPrices && currencyPrices.length
          ? currencyPrices[0].shortName
          : '$'

      totalWithoutDiscount =
        totalWithoutDiscount + quantitySum * currencyPrices[0].price
    })
    moreThanOneItem = !!(shoppingCart.length > 1)

    if (justOneOfEveryItem && shoppingCart.length) {
      priceRangeToApply = getPriceRangeToApply(shoppingCart.length)
    } else {
      if (shoppingCart.length) {
        priceRangeToApply = getPriceRangeToApply(maxquantity)
      }
    }

    shoppingCart.map(cartItem => {
      const quantitySum = getItemQuantity(cartItem)
      let teamStoreRange = 0
      if (cartItem.fixedPrices && cartItem.fixedPrices.length) {
        teamStoreRange = 0
      } else if (cartItem.isFixed && cartItem.teamStoreItem) {
        const totalOrder = cartItem.totalOrder + quantitySum
        const rangeTeam = getPriceRangeToApply(totalOrder)
        teamStoreRange = rangeTeam || 1
      }
      const productPriceRanges = get(
        cartItem,
        cartItem.fixedPrices && cartItem.fixedPrices.length
          ? 'fixedPrices'
          : 'product.priceRange',
        []
      )
      // get prices from currency
      const currencyPrices = filter(productPriceRanges, {
        abbreviation: currency
      })

      let priceRange
      if (!cartItem.designId) {
        // cartItem is a retail product
        priceRangeRetails = numberOfProducts > 1 ? 1 : 0
        priceRange = currencyPrices[priceRangeRetails]
      } else {
        const itemRange = quantitySum === 1 && moreThanOneItem ? 2 : quantitySum
        const onDemandRuleItem = cartItem.teamStoreId && quantitySum === 1 ? 2 : itemRange
        priceRange =
          getPriceRange(currencyPrices, cartItem.isFixed &&
            cartItem.teamStoreItem ? cartItem.totalOrder : onDemandRuleItem)
      }
      priceRange =
        (priceRange && priceRange.price === 0) || cartItem.isFixed
          ? currencyPrices[
              !cartItem.teamStoreId ? currencyPrices.length - 1 : teamStoreRange
            ]
          : priceRange

      // increase the total
      totalSum = totalSum + priceRange.price * quantitySum
    })
  }
  return {
    total: totalSum,
    weightSum,
    totalWithoutDiscount,
    priceRangeToApply,
    nameOfFirstProduct,
    show25PercentMessage,
    numberOfProducts,
    symbol,
    moreThanOneItem
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

export const getRangeLabel = (total: number) => {
  if (total >= 2 && total <= 5) {
    return '2-5'
  } else if (total >= 6 && total <= 24) {
    return '6-24'
  } else if (total >= 25 && total <= 49) {
    return '25-49'
  } else if (total >= 50 && total <= 99) {
    return '50-99'
  } else if (total >= 100) {
    return '100-249'
  }
  return 'Personal'
}

export const getPriceRangeToApply = (items: number) => {
  if (items >= 2 && items <= 5) {
    return 1
  } else if (items >= 6 && items <= 24) {
    return 2
  } else if (items >= 25 && items <= 49) {
    return 3
  } else if (items >= 50 && items <= 99) {
    return 4
  } else if (items >= 100) {
    return 5
  }
  return 0
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

export const getPriceRangeByItem = (cartItem: CartItems) => {
  const totalQuantity = getItemQuantity(cartItem)
  return getPriceRangeToApply(totalQuantity)
}

export const getItemQuantity = (cartItem: CartItems) => {
  const quantities = cartItem.itemDetails.map(itemDetail => {
    return itemDetail.quantity
  })
  return quantities.reduce((a, b) => a + b, 0)
}
