import { CouponCode, NetsuiteTax, ProductPrice } from '../types/common'
import find from 'lodash/find'
import {
  PERCENTAGE_PROMO,
  FLAT_PROMO,
  COUNTRY_CODE_US,
  COUNTRY_CODE_CANADA,
  COUNTRY_CODE_AT,
  COUNTRY_CODE_DE,
  PRODUCT
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
  country?: string,
  productsPrices?: ProductPrice[]
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
    const { type, rate, restrictionType, products } = couponCode
    switch (type) {
      case PERCENTAGE_PROMO: // '%'
        if (restrictionType !== PRODUCT) {
          if (taxesAmount && applySpecialTaxes) {
            taxVatTotal = taxesAmount / 100
            const totalNet = subtotal / (1 + taxVatTotal)
            // for Austria and Germany we calculate discount
            // discount = (totalNet + proDesignReview) * percentageDiscount
            discount = (totalNet + proDesignFee) * (Number(rate) / 100)
          } else {
            // calculate discount with (subtotal + proDesignFee) * percentageDiscount
            discount = (subtotal + proDesignFee) * (Number(rate) / 100)
          }
        } else {
          discount = products.reduce((totalDiscount: number, product) => {
            const itemForDiscount = find(
              productsPrices,
              (productObject) => productObject.yotpoId === product
            )
            if (itemForDiscount) {
              return (
                totalDiscount +
                itemForDiscount.price *
                  (Number(rate) / 100) *
                  itemForDiscount.quantity
              )
            }
            return totalDiscount
            // tslint:disable-next-line: align
          }, 0)
        }
        break
      case FLAT_PROMO: // 'flat
        if (restrictionType !== PRODUCT) {
          discount = Number(rate)
        } else {
          discount = products.reduce((totalDiscount: number, product) => {
            const itemForDiscount = find(
              productsPrices,
              (productObject) => productObject.yotpoId === product
            )
            if (itemForDiscount) {
              return totalDiscount + Number(rate) * itemForDiscount.quantity
            }
            return totalDiscount
            // tslint:disable-next-line: align
          }, 0)
        }
        break
      default:
        break
    }
  }

  discount = roundDecimals(discount) // round to 2 decimals

  // taxes
  let taxGst = 0
  let taxPst = 0
  let taxFee = 0
  let taxVat = 0
  if (taxesAmount && country) {
    let taxTotal = 0
    switch (countrySubsidiary.toLowerCase()) {
      case COUNTRY_CODE_US:
        // for USA the tax is calculated with this formula (subtotal + proDesignReview - discountAmount) * taxRate%
        if (shippingAddressCountry.toLowerCase() === COUNTRY_CODE_US) {
          taxTotal =
            (subtotal + proDesignFee + shippingTotal - discount) *
            (taxesAmount / 100) // calculate tax
          taxFee = roundDecimals(taxTotal) // round to 2 decimals
        }
        break
      case COUNTRY_CODE_CANADA:
        if (
          shippingAddressCountry.toLowerCase() === COUNTRY_CODE_CANADA &&
          taxRates
        ) {
          // for CANADA the taxes are calculated
          // GST = (subtotal + proDesignReview + shipping - discountAmount) * gstRate%
          taxGst =
            (shippingTotal + subtotal + proDesignFee - discount) *
            (taxRates.rateGst / 100) // calculate tax
          // PST = (subtotal + proDesignReview - discountAmount) * pstRate%
          taxPst =
            (subtotal + proDesignFee - discount) * (taxRates.ratePst / 100) // calculate tax
          taxGst = roundDecimals(taxGst) // round to 2 decimals
          taxPst = roundDecimals(taxPst) // round to 2 decimals
        }
        break
      case COUNTRY_CODE_AT:
        taxVatTotal = taxesAmount / 100
        if (applySpecialTaxes) {
          // explanation of taxVat at calculateTaxVat function
          taxVat = calculateTaxVat(
            subtotal,
            taxVatTotal,
            proDesignFee,
            shippingTotal,
            discount
          )
        }
        break
      case COUNTRY_CODE_DE:
        taxVatTotal = taxesAmount / 100
        if (applySpecialTaxes) {
          // explanation of taxVat at calculateTaxVat function
          taxVat = calculateTaxVat(
            subtotal,
            taxVatTotal,
            proDesignFee,
            shippingTotal,
            discount
          )
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
    discount
  }
}

export const roundDecimals = (n: number) => {
  return Math.round(n * 100) / 100
}

export const calculateTaxVat = (
  subtotal: number,
  taxVatTotal: number,
  proDesignFee: number,
  shippingTotal: number,
  discount: number
) => {
  // totalNet = subtotal / (1 + taxVatTotal) NOTE: this only apply for Austria and Germany
  // taxVat = (totalNet + proDesignReview + shipping - discount) * vatRate%
  const totalNet = subtotal / (1 + taxVatTotal)
  const taxVat =
    (totalNet + proDesignFee + shippingTotal - discount) * taxVatTotal
  return roundDecimals(taxVat) // round to 2 decimals
}
