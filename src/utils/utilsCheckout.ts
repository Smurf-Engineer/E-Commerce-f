import { CouponCode } from '../types/common'
import { PERCENTAGE_PROMO, FLAT_PROMO } from '../screens/Checkout/constants'

// calculate discounts
export const getDiscount = (couponCode: CouponCode, sumTotal: number) => {
  let discount = 0
  const { type, rate } = couponCode
  switch (type) {
    case PERCENTAGE_PROMO: // '%'
      discount = (sumTotal * Number(rate)) / 100
      break
    case FLAT_PROMO: // 'flat
      discount = Number(rate)
      break
    default:
      break
  }
  return discount
}
