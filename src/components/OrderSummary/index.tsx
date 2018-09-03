/**
 * OrderSummary Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import get from 'lodash/get'
import Message from 'antd/lib/message'
import {
  QueryProps,
  NetsuiteTax,
  NetsuiteShipping,
  TaxAddressObj,
  AddressObj,
  CouponCode
} from '../../types/common'
import { getTaxQuery, applyPromoCodeMutation } from './data'
import messages from './messages'
import {
  Container,
  SummaryTitle,
  OrderItem,
  TotalOrderItem,
  Divider,
  ZipCodeInputWrapper,
  CollapseWrapper,
  CalculationsWrapper,
  YouSavedOrderItem,
  FlexWrapper,
  DeleteLabel
} from './styledComponents'
import Input from 'antd/lib/input'
import Collapse from 'antd/lib/collapse'
import {
  PERCENTAGE_PROMO,
  FLAT_PROMO,
  COUNTRY_CODE_US,
  COUNTRY_CODE_CANADA,
  COUNTRY_CODE_AT,
  COUNTRY_CODE_DE
} from '../../screens/Checkout/constants'

interface Data extends QueryProps {
  taxes: NetsuiteTax
  shipping: NetsuiteShipping
}

interface Props {
  data?: Data
  taxes: number
  total: number
  subtotal: number
  shipping?: number
  totalWithoutDiscount?: number
  discount?: number
  onlyRead?: boolean
  country?: string
  weight?: string
  shipAddress?: TaxAddressObj
  shipAddressCountry?: string
  proDesignReview?: number
  currencySymbol?: string
  showCouponInput?: boolean
  formatMessage: (messageDescriptor: any) => string
  couponCode?: CouponCode
  setCouponCodeAction?: (code: CouponCode) => void
  deleteCouponCodeAction?: () => void
  // mutations
  applyPromoCode: (variables: {}) => Promise<any>
}

const InputSearch = Input.Search
const Panel = Collapse.Panel
export class OrderSummary extends React.Component<Props, {}> {
  render() {
    const {
      data,
      subtotal,
      formatMessage,
      showCouponInput,
      couponCode,
      totalWithoutDiscount = 0,
      onlyRead,
      proDesignReview,
      currencySymbol,
      shipping,
      taxes,
      country,
      shipAddressCountry
    } = this.props

    const shippingTotal = get(data, 'shipping.total', shipping) || 0
    const taxRates = get(data, 'taxes', null)
    const symbol = currencySymbol || '$'

    // countries to compare tax
    const countrySubsidiary =
      (taxRates && taxRates.countrySub) || COUNTRY_CODE_US
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
    const taxesAmount = (taxRates && taxRates.total) || taxes
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
            shippingAddressCountry.toLowerCase() === COUNTRY_CODE_DE ||
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

    const youSaved = totalWithoutDiscount - sumTotal

    if (taxVat) {
      taxVatTotal = taxesAmount / 100
      sumTotal =
        (sumTotal - proDesignFee) / (1 + taxVatTotal) +
        taxVat +
        shippingTotal +
        proDesignFee
    } else {
      sumTotal = sumTotal + shippingTotal + taxFee + taxGst + taxPst
    }

    const amountsDivider =
      !!proDesignReview ||
      taxFee ||
      shippingTotal ||
      (!onlyRead && discount > 0)

    return (
      <Container>
        <SummaryTitle>
          <FormattedMessage {...messages.summaryTitle} />
        </SummaryTitle>
        <OrderItem>
          <FormattedMessage {...messages.subtotal} />
          <div>{`${symbol} ${subtotal.toFixed(2)}`}</div>
        </OrderItem>
        <CalculationsWrapper>
          <Divider withMargin={amountsDivider} />
          {!!proDesignReview && (
            <OrderItem>
              <FormattedMessage {...messages.proDesigner} />
              <div>{`${symbol} ${proDesignReview.toFixed(2)}`}</div>
            </OrderItem>
          )}
          {!onlyRead &&
            discount > 0 && (
              <OrderItem>
                <FlexWrapper>
                  <div>{formatMessage(messages.discountLabel)}</div>
                  <DeleteLabel onClick={this.deleteCouponCode}>
                    {formatMessage(messages.deleteLabel)}
                  </DeleteLabel>
                </FlexWrapper>
                <div>{`- ${symbol} ${discount.toFixed(2)}`}</div>
                {/*TODO: when onlyRead is true, only show the disscount and disable interaction*/}
              </OrderItem>
            )}
          {/* taxes */}
          <OrderItem hide={!taxFee}>
            <FormattedMessage {...messages.taxes} />
            <div>{`${symbol} ${taxFee.toFixed(2)}`}</div>
          </OrderItem>
          <OrderItem hide={!taxGst}>
            <FormattedMessage {...messages.taxesGst} />
            <div>{`${symbol} ${taxGst.toFixed(2)}`}</div>
          </OrderItem>
          <OrderItem hide={!taxPst}>
            <FormattedMessage {...messages.taxesPst} />
            <div>{`${symbol} ${taxPst.toFixed(2)}`}</div>
          </OrderItem>
          <OrderItem hide={!taxVat}>
            <FormattedMessage {...messages.taxesVat} />
            <div>{`${symbol} ${taxVat.toFixed(2)}`}</div>
          </OrderItem>
          {/* shipping */}
          <OrderItem hide={!shippingTotal}>
            <FormattedMessage {...messages.shipping} />
            <div>{`${symbol} ${shippingTotal.toFixed(2)}`}</div>
          </OrderItem>
        </CalculationsWrapper>
        {amountsDivider && <Divider />}
        {!onlyRead && showCouponInput ? (
          <CollapseWrapper>
            <Collapse bordered={false}>
              <Panel header={formatMessage(messages.discountCode)} key="1">
                <ZipCodeInputWrapper>
                  <InputSearch
                    id="url"
                    enterButton={formatMessage(messages.apply)}
                    placeholder={formatMessage(messages.promoCodePlaceholder)}
                    size="default"
                    onSearch={this.onApplyCouponCode}
                  />
                </ZipCodeInputWrapper>
              </Panel>
            </Collapse>
          </CollapseWrapper>
        ) : null}
        <TotalOrderItem
          withoutMarginBottom={youSaved > 0}
          {...{ onlyRead, showCouponInput }}
        >
          <FormattedMessage {...messages.total} />
          <div>{`${symbol} ${sumTotal.toFixed(2)}`}</div>
        </TotalOrderItem>
        {youSaved > 0 ? (
          <YouSavedOrderItem {...{ onlyRead }}>
            <FormattedMessage {...messages.youSaved} />
            <div>{`$${youSaved.toFixed(2)}`}</div>
          </YouSavedOrderItem>
        ) : null}
      </Container>
    )
  }

  onApplyCouponCode = async (code: string) => {
    const {
      applyPromoCode,
      setCouponCodeAction = () => {},
      deleteCouponCodeAction = () => {},
      formatMessage
    } = this.props
    try {
      const data = await applyPromoCode({
        variables: { code }
      })
      const {
        data: { couponCode }
      } = data
      if (couponCode) {
        setCouponCodeAction(couponCode)
        Message.success(formatMessage(messages.couponApplied))
      } else {
        deleteCouponCodeAction()
        Message.error(formatMessage(messages.couponError))
      }
    } catch (error) {
      deleteCouponCodeAction()
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      Message.error(errorMessage)
    }
  }

  deleteCouponCode = () => {
    const { deleteCouponCodeAction = () => {} } = this.props
    deleteCouponCodeAction()
  }
}

interface OwnProps {
  country?: string
  weight?: string
  shipAddress?: AddressObj
}

const OrderSummaryEnhance = compose(
  graphql(getTaxQuery, {
    options: ({ country, weight, shipAddress }: OwnProps) => ({
      skip: !country || !weight || !shipAddress,
      variables: { country, weight, shipAddress },
      fetchPolicy: 'network-only'
    })
  }),
  applyPromoCodeMutation
)(OrderSummary)

export default OrderSummaryEnhance
