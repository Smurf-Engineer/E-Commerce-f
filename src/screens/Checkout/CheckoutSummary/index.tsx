/**
 * CheckoutSummary Component - Created by miguelcanobbio on 03/09/18.
 */
import * as React from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout-authorize'
import MediaQuery from 'react-responsive'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import {
  Container,
  paypalButtonStyle,
  PlaceOrderButton
} from './styledComponents'
import { getTaxQuery } from './data'
import {
  TaxAddressObj,
  CouponCode,
  QueryProps,
  NetsuiteTax,
  NetsuiteShipping,
  AddressObj
} from '../../../types/common'
import OrderSummary from '../../../components/OrderSummary'
import config from '../../../config/index'
import {
  PERCENTAGE_PROMO,
  FLAT_PROMO,
  COUNTRY_CODE_US,
  COUNTRY_CODE_CANADA,
  PaymentOptions
} from '../constants'

interface Data extends QueryProps {
  taxes: NetsuiteTax
  shipping: NetsuiteShipping
}

interface Props {
  showOrderButton: boolean
  data?: Data
  // taxes: number
  subtotal: number
  shipping?: number
  totalWithoutDiscount?: number
  discount?: number
  onlyRead?: boolean
  country?: string
  weight: number
  shipAddress?: TaxAddressObj
  shipAddressCountry?: string
  proDesignReview?: number
  currencySymbol?: string
  showCouponInput?: boolean
  paymentMethod: string
  currentCurrency: string
  loadingPlaceOrder: boolean
  formatMessage: (messageDescriptor: any) => string
  couponCode?: CouponCode
  setCouponCodeAction?: (code: CouponCode) => void
  deleteCouponCodeAction?: () => void
  onPaypalSuccess: (payment: any) => void
  onPaypalCancel: (data: AnalyserNode) => void
  onPaypalError: (err: any) => void
  onPlaceOrder: (event: any) => void
}

const paypalClient = {
  sandbox: config.paypalClientId,
  production: ''
}

const CheckoutSummary = ({
  data,
  paymentMethod,
  subtotal,
  country,
  shipAddressCountry,
  shipAddress,
  weight,
  formatMessage,
  proDesignReview,
  currencySymbol,
  couponCode,
  totalWithoutDiscount = 0,
  setCouponCodeAction,
  deleteCouponCodeAction,
  showOrderButton,
  onPaypalSuccess,
  onPaypalError,
  onPaypalCancel,
  currentCurrency,
  onPlaceOrder,
  loadingPlaceOrder,
  shipping
}: Props) => {
  const shippingTotal = get(data, 'shipping.total', shipping) || 0
  const taxRates = get(data, 'taxes', null)

  // countries to compare tax
  const countrySubsidiary = (taxRates && taxRates.countrySub) || COUNTRY_CODE_US
  const shippingAddressCountry = shipAddressCountry || COUNTRY_CODE_US

  // pro design fee
  const proDesignFee = proDesignReview || 0
  // add proDesignFee to subtotal
  let sumTotal = subtotal + proDesignFee

  let discount = 0
  if (couponCode) {
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
  }

  // get subtotal minus discount
  sumTotal -= discount

  // get tax fee
  const taxesAmount = taxRates && taxRates.total
  // canadian taxes
  let taxGst = 0
  let taxPst = 0
  let taxFee = 0
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
      default:
        break
    }
  }

  const youSaved = totalWithoutDiscount - sumTotal

  sumTotal = sumTotal + shippingTotal + taxFee + taxGst + taxPst

  const currency = currentCurrency
    ? currentCurrency.toUpperCase()
    : config.defaultCurrency.toUpperCase()

  const orderButtonComponent =
    paymentMethod === PaymentOptions.PAYPAL ? (
      <PaypalExpressBtn
        env={config.paypalEnv}
        client={paypalClient}
        shipping={1}
        onSuccess={onPaypalSuccess}
        onCancel={onPaypalCancel}
        onError={onPaypalError}
        style={paypalButtonStyle}
        paymentOptions={{ intent: 'authorize' }}
        total={sumTotal.toFixed(2)}
        {...{ currency }}
      />
    ) : (
      <PlaceOrderButton onClick={onPlaceOrder} loading={loadingPlaceOrder}>
        {formatMessage(messages.placeOrder)}
      </PlaceOrderButton>
    )

  const orderButton = showOrderButton && orderButtonComponent
  return (
    <Container>
      <MediaQuery maxWidth={480}>{orderButton}</MediaQuery>
      <OrderSummary
        weight={weight.toString()}
        showCouponInput={true}
        {...{
          subtotal,
          formatMessage,
          proDesignReview,
          currencySymbol,
          couponCode,
          totalWithoutDiscount,
          setCouponCodeAction,
          deleteCouponCodeAction,
          taxFee,
          shippingTotal,
          discount,
          taxGst,
          taxPst,
          sumTotal,
          youSaved
        }}
      />
      <MediaQuery minWidth={481}>{orderButton}</MediaQuery>
    </Container>
  )
}

interface OwnProps {
  country?: string
  weight?: string
  shipAddress?: AddressObj
}

const CheckoutSummaryEnhance = compose(
  graphql(getTaxQuery, {
    options: ({ country, weight, shipAddress }: OwnProps) => ({
      skip: !country || !weight || !shipAddress,
      variables: { country, weight, shipAddress },
      fetchPolicy: 'network-only'
    })
  })
)(CheckoutSummary)

export default CheckoutSummaryEnhance
