import { CouponCode, NetsuiteTax } from '../types/common'
import {
  PERCENTAGE_PROMO,
  FLAT_PROMO,
  COUNTRY_CODE_US,
  COUNTRY_CODE_CANADA,
  COUNTRY_CODE_AT,
  COUNTRY_CODE_DE
} from '../screens/Checkout/constants'

const specialTaxes = [COUNTRY_CODE_AT, COUNTRY_CODE_DE]

export const getTaxesAndDiscount = (
  countrySubsidiary: string,
  shippingAddressCountry: string,
  subtotal: number,
  shippingTotal: number,
  proDesignFee: number,
  couponCode?: CouponCode,
  taxRates?: NetsuiteTax,
  country?: string
) => {
  // get tax fee
  const taxesAmount = taxRates && taxRates.total

  // true when shippingAddressCountry is Austria or Germany
  const applySpecialTaxes = specialTaxes.includes(
    shippingAddressCountry.toLowerCase()
  )

  let discount = 0
  let taxVatTotal = 0

  if (couponCode) {
    const { type, rate } = couponCode
    switch (type) {
      case PERCENTAGE_PROMO: // '%'
        if (taxesAmount && applySpecialTaxes) {
          taxVatTotal = taxesAmount / 100
          discount =
            ((subtotal / (1 + taxVatTotal) + proDesignFee) * Number(rate)) / 100
        } else {
          discount = ((subtotal + proDesignFee) * Number(rate)) / 100
        }
        break
      case FLAT_PROMO: // 'flat
        discount = Number(rate)
        break
      default:
        break
    }
  }

  discount = roundDecimals(discount) // round to 2 decimals

  // canadian taxes
  let taxGst = 0
  let taxPst = 0
  let taxFee = 0
  let taxVat = 0
  if (taxesAmount && country) {
    let taxTotal = 0
    switch (countrySubsidiary.toLowerCase()) {
      case COUNTRY_CODE_US:
        if (shippingAddressCountry.toLowerCase() === COUNTRY_CODE_US) {
          taxTotal = ((subtotal + proDesignFee) * taxesAmount) / 100 // calculate tax
          taxFee = roundDecimals(taxTotal) // round to 2 decimals
        }
        break
      case COUNTRY_CODE_CANADA:
        if (
          shippingAddressCountry.toLowerCase() === COUNTRY_CODE_CANADA &&
          taxRates
        ) {
          taxGst =
            ((shippingTotal + subtotal + proDesignFee) * taxRates.rateGst) / 100 // calculate tax
          taxPst = ((subtotal + proDesignFee) * taxRates.ratePst) / 100 // calculate tax
          taxGst = roundDecimals(taxGst) // round to 2 decimals
          taxPst = roundDecimals(taxPst) // round to 2 decimals
        }
        break
      case COUNTRY_CODE_AT:
        taxVatTotal = taxesAmount / 100
        if (applySpecialTaxes) {
          taxVat =
            // TODO: delete if new formula calculates right
            // subtotal -
            // proDesignFee -
            // (subtotal - proDesignFee) / (1 + taxVatTotal) +
            // shippingTotal * taxVatTotal +
            // proDesignFee * taxVatTotal
            (subtotal / (1 + taxVatTotal) +
              proDesignFee +
              shippingTotal -
              discount) *
            taxVatTotal
          taxVat = roundDecimals(taxVat) // round to 2 decimals
        }
        break
      case COUNTRY_CODE_DE:
        taxVatTotal = taxesAmount / 100
        taxVat =
          // TODO: delete if new formula calculates right
          // subtotal -
          // proDesignFee -
          // (subtotal - proDesignFee) / (1 + taxVatTotal) +
          // shippingTotal * taxVatTotal +
          // proDesignFee * taxVatTotal
          (subtotal / (1 + taxVatTotal) +
            proDesignFee +
            shippingTotal -
            discount) *
          taxVatTotal
        taxVat = roundDecimals(taxVat) // round to 2 decimals
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
    taxesAmount,
    discount
  }
}

export const roundDecimals = (n: number) => {
  return Math.round(n * 100) / 100
}
