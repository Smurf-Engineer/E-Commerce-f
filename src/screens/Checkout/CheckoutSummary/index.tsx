/**
 * CheckoutSummary Component - Created by miguelcanobbio on 03/09/18.
 */
import * as React from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout-authorize'
import MediaQuery from 'react-responsive'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import Modal from 'antd/lib/modal'
import messages from './messages'
import {
  Container,
  PlaceIcon,
  ContinueIcon,
  ContinueButton,
  paypalButtonStyle,
  PlaceOrderButton,
  CancelButton,
  ModalTitle,
  cancelButtonStyle,
  buttonStyle,
  InfoBody
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

const { confirm } = Modal

interface Data extends QueryProps {
  taxes: NetsuiteTax
  shipping: NetsuiteShipping
}

interface Props {
  showOrderButton: boolean
  taxShipQuery?: Data
  subsidiaryQuery?: SubsidiarySCA
  subtotal: number
  youthTotal?: number
  shipping?: number
  totalWithoutDiscount?: number
  discount?: number
  onlyRead?: boolean
  country?: string
  weight: number
  upgrades?: number
  variables?: number
  currentStep?: number
  shipAddress?: TaxAddressObj
  shipAddressCountry?: string
  proDesignReview?: number
  currencySymbol?: string
  showCouponInput?: boolean
  paymentMethod: string
  currentCurrency: string
  showDiscount?: boolean
  placingOrder?: boolean
  isFixedStore?: boolean
  disabledContinue?: boolean
  history: any
  totalReducer?: number
  setTotalReducer: (value: number) => void
  formatMessage: (messageDescriptor: any) => string
  couponCode?: CouponCode
  productsPrices: ProductPrice[]
  setCouponCodeAction?: (code: CouponCode) => void
  deleteCouponCodeAction?: () => void
  handleNextStep?: () => void
  onPaypalSuccess: (payment: any) => void
  onPaypalCancel: (data: AnalyserNode) => void
  onPaypalError: (err: any) => void
  onPlaceOrder: (event: any, sca?: boolean) => void
}

const CheckoutSummary = ({
  paymentMethod,
  subtotal,
  youthTotal,
  country,
  shipAddressCountry,
  weight,
  formatMessage,
  proDesignReview,
  currencySymbol,
  showDiscount,
  upgrades = 0,
  variables = 0,
  couponCode,
  disabledContinue = false,
  history,
  isFixedStore,
  totalWithoutDiscount = 0,
  setCouponCodeAction,
  deleteCouponCodeAction,
  showOrderButton,
  onPaypalSuccess,
  onPaypalError,
  onPaypalCancel,
  currentCurrency,
  onPlaceOrder,
  currentStep,
  handleNextStep,
  placingOrder = false,
  shipping,
  subsidiaryQuery,
  taxShipQuery,
  productsPrices,
  totalReducer,
  setTotalReducer
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
    discount: discountValue,
    freeShipping
  } = getTaxesAndDiscount(
    countrySubsidiary,
    shippingAddressCountry,
    subtotal,
    shippingTotal,
    proDesignFee,
    couponCode,
    taxRates,
    country,
    productsPrices,
    upgrades,
    variables,
    youthTotal
  )
  const discount =
    discountValue > subtotal ? subtotal : discountValue

  let totalSum = 0
  // calculate totalSum
  if (taxVat) {
    totalSum =
      subtotal / (1 + taxVatTotal) +
      taxVat +
      (freeShipping ? 0 : shippingTotal) +
      upgrades +
      variables +
      proDesignFee -
      discount
  } else {
    totalSum =
      subtotal +
      upgrades +
      variables +
      proDesignFee +
      (freeShipping ? 0 : shippingTotal) +
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

  const handleOnPlaceOrder = (event) => onPlaceOrder(event)
  // const handleOnPlaceOrder = (event) => onPlaceOrder(event, subsidiarySCA.sca)
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
        <PlaceOrderButton loading={placingOrder} disabled={placingOrder} onClick={handleOnPlaceOrder}>
          <PlaceIcon type="check" />
          {formatMessage(messages.placeOrder)}
        </PlaceOrderButton>
      )

  const continueButton = 
    <ContinueButton disabled={disabledContinue} onClick={handleNextStep}>
      {formatMessage(messages.continue)}
      <ContinueIcon type="right" />
    </ContinueButton>

  const handleCancel = () => {
    confirm({
      title: <ModalTitle>{formatMessage(messages.areYouSure)}</ModalTitle>,
      icon: ' ',
      centered: true,
      cancelText: formatMessage(messages.cancel),
      okText: formatMessage(messages.yes),
      cancelButtonProps: {
        style: cancelButtonStyle
      },
      okButtonProps: {
        style: buttonStyle
      },
      onOk: () => {
        history.push('/shopping-cart')
      },
      content: <InfoBody>{formatMessage(messages.promptReturn)}</InfoBody>
    })
  }

  const orderButton = showOrderButton ? orderButtonComponent : continueButton
  return (
    <Container>
      <MediaQuery maxWidth={480}>
        {currentStep === 2 ? orderButton : null}
        <CancelButton onClick={handleCancel}>{formatMessage(messages.cancel)}</CancelButton>
      </MediaQuery>
      <OrderSummary
        weight={weight.toString()}
        showCouponInput={true}
        simpleDesign={true}
        youSaved={previousDiscount}
        {...{
          subtotal,
          formatMessage,
          proDesignReview,
          currencySymbol,
          isFixedStore,
          showDiscount,
          couponCode,
          upgrades,
          variables,
          totalReducer,
          setTotalReducer,
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
      <MediaQuery minWidth={481}>
        {orderButton}
        <CancelButton onClick={handleCancel}>{formatMessage(messages.cancel)}</CancelButton>
      </MediaQuery>
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
