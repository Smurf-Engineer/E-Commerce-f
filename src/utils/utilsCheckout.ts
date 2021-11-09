import { CouponCode, NetsuiteTax, ProductPrice } from '../types/common'
import {
  PERCENTAGE_PROMO,
  FLAT_PROMO,
  COUNTRY_CODE_US,
  COUNTRY_CODE_CANADA,
  DESIGN
} from '../screens/Checkout/constants'

// const CANADA_SHIPPING_TAX_RATE = 5

export const getTaxesAndDiscount = (
  countrySubsidiary: string,
  shippingAddressCountry: string,
  subtotal: number,
  shippingTotal: number,
  proDesignFee: number,
  couponCode?: CouponCode,
  taxRates?: NetsuiteTax,
  country?: string,
  productsPrices?: ProductPrice[],
  upgrades: number = 0,
  variables: number = 0,
  youthTotal: number = 0 
) => {
  // get tax fee
  const taxesAmount = taxRates && taxRates.total

  let discount = 0
  let taxVatTotal = 0

  if (couponCode) {
    const { type, rate, restrictionType, products = [] } = couponCode
    const restrictions = restrictionType ? restrictionType.split(',') : []

    switch (type) {
      case PERCENTAGE_PROMO: // '%'
        if (!restrictions.includes(DESIGN)) {
          // calculate discount with (subtotal + proDesignFee) * percentageDiscount
          discount = (subtotal + proDesignFee + upgrades + variables) * (Number(rate) / 100)
        } else {
          discount = productsPrices.reduce((totalDiscount: number, design) => {
            if (!products.includes(design.designId)) {
              return totalDiscount
            }
            const { price, quantity} = design
            return (
              totalDiscount +
              price * (Number(rate) / 100) * quantity
            )
            // tslint:disable-next-line: align
          }, 0)
        }
        break
      case FLAT_PROMO: // 'flat
        discount = Number(rate)
        break
      default:
        break
    }
  }

  const freeShipping = couponCode && couponCode.freeShipping

  discount = roundDecimals(discount) // round to 2 decimals
  // taxes
  let taxGst = 0
  let taxPst = 0
  let taxFee = 0
  let taxVat = 0
  if (taxesAmount && country) {
    let taxTotal = 0
    const realDiscount = discount > subtotal ? subtotal : discount
    switch (countrySubsidiary.toLowerCase()) {
      case COUNTRY_CODE_US:
        // for USA the tax is calculated with this formula (subtotal + proDesignReview - discountAmount) * taxRate%
        if (shippingAddressCountry.toLowerCase() === COUNTRY_CODE_US) {
          taxTotal =
            (subtotal + proDesignFee + upgrades + variables + (freeShipping ? 0 : shippingTotal) - realDiscount) *
            (taxesAmount / 100) // calculate tax
          taxFee = roundTaxes(taxTotal) // round to 2 decimals
        }
        break
      case COUNTRY_CODE_CANADA:
        if (
          shippingAddressCountry.toLowerCase() === COUNTRY_CODE_CANADA &&
          taxRates
        ) {
          // for CANADA the taxes are calculated
          // GST = ((subtotal + proDesignReview - discountAmount) * gstRate%) + (shipping * shippingRate%)
          // PST = (subtotal + proDesignReview - discountAmount) * pstRate%
          taxGst = 
            (subtotal + proDesignFee + upgrades + variables + (freeShipping ? 0 : shippingTotal) - realDiscount) * 
            (taxRates.rateGst / 100)
          taxPst = (
            (subtotal - youthTotal) + proDesignFee + upgrades + variables + 
            (freeShipping ? 0 : shippingTotal) - realDiscount) * 
            (taxRates.ratePst / 100) // calculate tax
          taxGst = roundTaxes(taxGst) // round to 2 decimals
          taxPst = roundTaxes(taxPst > 0 ? taxPst : 0) // round to 2 decimals
        }
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
    discount,
    freeShipping
  }
}

export const getTaxesServices = (
  countrySubsidiary: string,
  subtotal: number,
  taxRates?: NetsuiteTax,
) => {
  // get tax fee
  const taxesAmount = taxRates ? taxRates.total : 0

  let taxVatTotal = 0
  // taxes
  let taxGst = 0
  let taxPst = 0
  let taxFee = 0
  let taxVat = 0
  if (taxesAmount) {
    let taxTotal = 0

    switch (countrySubsidiary.toLowerCase()) {
      case COUNTRY_CODE_US:
        // for USA the tax is calculated with this formula (subtotal + proDesignReview - discountAmount) * taxRate%
        if (taxRates) {
          taxTotal = (subtotal) * (taxesAmount / 100) // calculate tax
          taxFee = roundTaxes(taxTotal) // round to 2 decimals
        }
        break
      case COUNTRY_CODE_CANADA:
        if (taxRates) {
          // for CANADA the taxes are calculated
          taxGst = (subtotal) * (taxRates.rateGst / 100)
          taxPst = (subtotal) * (taxRates.ratePst / 100) // calculate tax
          taxGst = roundTaxes(taxGst) // round to 2 decimals
          taxPst = roundTaxes(taxPst) // round to 2 decimals
        }
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

export const roundDecimals = (n: number) => {
  return Math.round(n * 100) / 100
}

export const roundTaxes = (n: number) => {
  return Math.ceil(n * 100) / 100
}

export const calculateTaxVat = (
  subtotal: number,
  taxVatTotal: number,
  proDesignFee: number,
  shippingTotal: number,
  discount: number,
  upgrades: number = 0,
  variables: number = 0
) => {
  // totalNet = subtotal / (1 + taxVatTotal) NOTE: this only apply for Austria and Germany
  // taxVat = (totalNet + proDesignReview + shipping - discount) * vatRate%
  const totalNet = subtotal / (1 + taxVatTotal)
  const taxVat =
    (totalNet + proDesignFee + upgrades + variables + shippingTotal - discount) * taxVatTotal
  return roundTaxes(taxVat) // round to 2 decimals
}
