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
import { getTaxQuery, isScaPaymentQuery } from './data'
import {
  CouponCode,
  QueryProps,
  NetsuiteTax,
  NetsuiteShipping,
  AddressObj,
  TaxAddressObj,
  SimpleCart,
  ProductPrice,
  SubsidiarySCA
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
  taxShipQuery?: Data
  subsidiaryQuery?: SubsidiarySCA
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
  formatMessage: (messageDescriptor: any) => string
  couponCode?: CouponCode
  productsPrices: ProductPrice[]
  setCouponCodeAction?: (code: CouponCode) => void
  deleteCouponCodeAction?: () => void
  onPaypalSuccess: (payment: any) => void
  onPaypalCancel: (data: AnalyserNode) => void
  onPaypalError: (err: any) => void
  onPlaceOrder: (event: any, sca?: boolean) => void
}

const CheckoutSummary = ({
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
  shipping,
  subsidiaryQuery,
  taxShipQuery,
  productsPrices
}: Props) => {
  let paypalClientId
  const subsidiarySCA = get(subsidiaryQuery, 'subsidiarySCA', { subsidiary: 1, sca: false })
  switch (subsidiarySCA.subsidiary) {
    case 1:
      paypalClientId = config.paypalClientIdUS
      break
    case 6:
      paypalClientId = config.paypalClientIdCA
      break
    default:
      paypalClientId = config.paypalClientIdUS
      break
  }

  const paypalClient = {
    sandbox: paypalClientId,
    production: paypalClientId
  }

  const shippingTotal = get(taxShipQuery, 'shipping.total', shipping) || 0
  const taxRates = get(taxShipQuery, 'taxes', undefined)

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
    discount: discountValue
  } = getTaxesAndDiscount(
    countrySubsidiary,
    shippingAddressCountry,
    subtotal,
    shippingTotal,
    proDesignFee,
    couponCode,
    taxRates,
    country,
    productsPrices
  )
  const discount =
    discountValue > totalWithoutDiscount ? totalWithoutDiscount : discountValue
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
  const previousDiscount = totalWithoutDiscount - subtotal
  const currency = currentCurrency
    ? currentCurrency.toUpperCase()
    : config.defaultCurrency.toUpperCase()

  const handleOnPlaceOrder = (event) => onPlaceOrder(event, subsidiarySCA.sca)
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
        <PlaceOrderButton onClick={handleOnPlaceOrder}>
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
        youSaved={discount + previousDiscount}
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
          totalSum
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
  simpleCart?: SimpleCart[]
}

const CheckoutSummaryEnhance = compose(
  graphql(getTaxQuery, {
    name: 'taxShipQuery',
    options: ({ country, shipAddress, simpleCart }: OwnProps) => ({
      skip: !country || !shipAddress || !simpleCart,
      variables: { country, shipAddress, cart: simpleCart },
      fetchPolicy: 'network-only'
    })
  }),
  graphql(isScaPaymentQuery, {
    name: 'subsidiaryQuery',
    options: ({ country }: OwnProps) => ({
      skip: !country,
      variables: { code: country },
      fetchPolicy: 'network-only'
    })
  })
)(CheckoutSummary)

export default CheckoutSummaryEnhance
