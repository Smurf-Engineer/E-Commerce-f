import { CouponCode, NetsuiteTax } from '../types/common'
import {
  PERCENTAGE_PROMO,
  FLAT_PROMO,
  COUNTRY_CODE_US,
  COUNTRY_CODE_CANADA,
  COUNTRY_CODE_AT,
  COUNTRY_CODE_DE
} from '../screens/Checkout/constants'

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

export const getTaxes = (
  countrySubsidiary: string,
  shippingAddressCountry: string,
  sumTotal: number,
  shippingTotal: number,
  proDesignFee: number,
  taxRates?: NetsuiteTax,
  country?: string
) => {
  // get tax fee
  const taxesAmount = (taxRates && taxRates.total) || 0
  // canadian taxes
  let taxGst = 0
  let taxPst = 0
  let taxFee = 0
  let taxVat = 0
  let taxVatTotal = 0
  if (taxesAmount && country) {
    let taxTotal = 0
    switch (countrySubsidiary.toLowerCase()) {
      case COUNTRY_CODE_US:
        if (shippingAddressCountry.toLowerCase() === COUNTRY_CODE_US) {
          taxTotal = (sumTotal * taxesAmount) / 100 // calculate tax
          taxFee = Math.round(taxTotal * 100) / 100 // round to 2 decimals
        }
        break
      case COUNTRY_CODE_CANADA:
        if (
          shippingAddressCountry.toLowerCase() === COUNTRY_CODE_CANADA &&
          taxRates
        ) {
          taxGst = ((shippingTotal + sumTotal) * taxRates.rateGst) / 100 // calculate tax
          taxPst = (sumTotal * taxRates.ratePst) / 100 // calculate tax
          taxGst = Math.round(taxGst * 100) / 100
          taxPst = Math.round(taxPst * 100) / 100
        }
        break
      case COUNTRY_CODE_AT:
        if (
          shippingAddressCountry.toLowerCase() === COUNTRY_CODE_AT ||
          shippingAddressCountry.toLowerCase() === COUNTRY_CODE_DE
        ) {
          taxVatTotal = taxesAmount / 100
          taxVat =
            sumTotal -
            proDesignFee -
            (sumTotal - proDesignFee) / (1 + taxVatTotal) +
            shippingTotal * taxVatTotal +
            proDesignFee * taxVatTotal
          taxVat = Math.round(taxVat * 100) / 100
        }
        break
      case COUNTRY_CODE_DE:
        taxVatTotal = taxesAmount / 100
        taxVat =
          sumTotal -
          proDesignFee -
          (sumTotal - proDesignFee) / (1 + taxVatTotal) +
          shippingTotal * taxVatTotal +
          proDesignFee * taxVatTotal
        taxVat = Math.round(taxVat * 100) / 100
        break
      default:
        break
    }
  }
  return {
    taxGst,
    taxPst,
    taxFee,
    taxVat,
    taxVatTotal,
    taxesAmount
  }
}
