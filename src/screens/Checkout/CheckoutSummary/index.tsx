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
  CouponCode,
  QueryProps,
  NetsuiteTax,
  NetsuiteShipping,
  AddressObj,
  TaxAddressObj
} from '../../../types/common'
import OrderSummary from '../../../components/OrderSummary'
import config from '../../../config/index'
import { COUNTRY_CODE_US, PaymentOptions } from '../constants'
import {
  getTaxesAndDiscount,
  roundDecimals
} from '../../../utils/utilsCheckout'

interface Data extends QueryProps {
  taxes: NetsuiteTax
  shipping: NetsuiteShipping
}

interface Props {
  showOrderButton: boolean
  data?: Data
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
  const taxRates = get(data, 'taxes', undefined)

  // countries to compare tax
  const countrySubsidiary = (taxRates && taxRates.countrySub) || COUNTRY_CODE_US
  const shippingAddressCountry = shipAddressCountry || COUNTRY_CODE_US

  // pro design fee
  const proDesignFee = proDesignReview || 0

  const {
    taxGst,
    taxPst,
    taxFee,
    taxVat,
    taxVatTotal,
    discount
  } = getTaxesAndDiscount(
    countrySubsidiary,
    shippingAddressCountry,
    subtotal,
    shippingTotal,
    proDesignFee,
    couponCode,
    taxRates,
    country
  )

  // calculate youSaved amount
  const youSaved = totalWithoutDiscount - (subtotal + proDesignFee - discount)

  let totalSum = 0
  // calculate totalSum
  if (taxVat) {
    totalSum =
      subtotal / (1 + taxVatTotal) +
      taxVat +
      shippingTotal +
      proDesignFee -
      discount
  } else {
    totalSum =
      subtotal +
      proDesignFee +
      shippingTotal +
      taxFee +
      taxGst +
      taxPst -
      discount
  }

  totalSum = roundDecimals(totalSum) // round to 2 decimals

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
        total={totalSum}
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
          taxVat,
          totalSum,
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
