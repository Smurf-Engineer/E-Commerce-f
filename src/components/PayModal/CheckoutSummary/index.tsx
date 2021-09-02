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
  OrderSummary,
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
import config from '../../../config/index'
import { PaymentOptions } from '../constants'

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
  upgrades?: number
  variables?: number
  total?: number
  shipAddress?: TaxAddressObj
  proDesignReview?: number
  currencySymbol?: string
  showCouponInput?: boolean
  paymentMethod: string
  currentCurrency: string
  showDiscount?: boolean
  placingOrder?: boolean
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
  total,
  formatMessage,
  showOrderButton,
  onPaypalSuccess,
  onPaypalError,
  onPaypalCancel,
  currentCurrency,
  onPlaceOrder,
  placingOrder = false,
  subsidiaryQuery,
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
        {...{ currency, total }}
      />
    ) : (
        <PlaceOrderButton loading={placingOrder} disabled={placingOrder} onClick={handleOnPlaceOrder}>
          {formatMessage(messages.placeOrder)}
        </PlaceOrderButton>
      )
  const orderButton = showOrderButton && orderButtonComponent
  return (
    <Container>
      <MediaQuery maxWidth={480}>{orderButton}</MediaQuery>
      <OrderSummary>
        {total}
      </OrderSummary>
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
