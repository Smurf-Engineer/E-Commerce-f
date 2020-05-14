/**
 * OrderSummary Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import message from 'antd/lib/message'
import { CouponCode, Message } from '../../types/common'
import { applyPromoCodeMutation } from './data'
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
  DeleteLabel,
  DiscountAmout
} from './styledComponents'
import Input from 'antd/lib/input'
import Collapse from 'antd/lib/collapse'
import moment from 'moment'

interface Props {
  onlyRead?: boolean
  subtotal: number
  proDesignReview?: number
  totalWithoutDiscount?: number
  discount?: number
  youSaved?: number
  shippingTotal?: number
  taxFee?: number
  taxPst?: number
  taxGst?: number
  taxVat?: number
  totalSum?: number
  currencySymbol?: string
  showCouponInput?: boolean
  couponCode?: CouponCode
  formatMessage: (messageDescriptor: Message, params?: PercentParams) => string
  setCouponCodeAction?: (code: CouponCode) => void
  deleteCouponCodeAction?: () => void
  // mutations
  applyPromoCode: (variables: {}) => Promise<any>
}

interface PercentParams {
  percent: number
}

const InputSearch = Input.Search
const Panel = Collapse.Panel
export class OrderSummary extends React.Component<Props, {}> {
  render() {
    const {
      subtotal,
      formatMessage,
      showCouponInput,
      onlyRead,
      proDesignReview = 0,
      currencySymbol,
      taxFee = 0,
      taxPst = 0,
      taxGst = 0,
      taxVat = 0,
      youSaved = 0,
      shippingTotal = 0,
      discount = 0,
      totalSum = 0,
      totalWithoutDiscount = 0
    } = this.props

    const extraFee = proDesignReview + taxFee + taxPst + taxGst + shippingTotal
    const symbol = currencySymbol || '$'
    const saved =
      youSaved > totalWithoutDiscount ? totalWithoutDiscount : youSaved
    const totalWithDiscount = discount > subtotal ? extraFee : totalSum

    const savedPercent = Math.round((saved * 100) / totalWithoutDiscount)
    const netTotal =
      totalWithDiscount || discount ? totalWithDiscount : subtotal + extraFee
    const amountsDivider =
      !!proDesignReview ||
      !!taxFee ||
      !!shippingTotal ||
      (!onlyRead && discount > 0)

    return (
      <Container>
        <SummaryTitle>
          <FormattedMessage {...messages.summaryTitle} />
        </SummaryTitle>
        {totalWithoutDiscount > 0 && (
          <OrderItem>
            <FormattedMessage {...messages.total} />
            <div>{`${symbol} ${totalWithoutDiscount.toFixed(2)}`}</div>
          </OrderItem>
        )}
        {youSaved > 0 ? (
          <YouSavedOrderItem {...{ onlyRead }}>
            {formatMessage(messages.youSaved, { percent: savedPercent })}
            <div>{`${symbol} ${saved.toFixed(2)}`}</div>
          </YouSavedOrderItem>
        ) : null}
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
          {discount > 0 && (
            <OrderItem>
              <FlexWrapper>
                <div>{formatMessage(messages.discountLabel)}</div>
                {!onlyRead && (
                  <DeleteLabel onClick={this.deleteCouponCode}>
                    {formatMessage(messages.deleteLabel)}
                  </DeleteLabel>
                )}
              </FlexWrapper>
              <DiscountAmout>
                {`- ${symbol} ${discount.toFixed(2)}`}
              </DiscountAmout>
            </OrderItem>
          )}
          {/* shipping */}
          <OrderItem hide={!shippingTotal}>
            <FormattedMessage {...messages.shipping} />
            <div>{`${symbol} ${shippingTotal.toFixed(2)}`}</div>
          </OrderItem>
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
          <div>{`${symbol} ${netTotal.toFixed(2)}`}</div>
        </TotalOrderItem>
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
      const timeZone = moment().utcOffset()
      const data = await applyPromoCode({
        variables: { code, timeZone }
      })
      const {
        data: { couponCode }
      } = data
      if (couponCode) {
        setCouponCodeAction(couponCode)
        message.success(formatMessage(messages.couponApplied))
      } else {
        deleteCouponCodeAction()
        message.error(formatMessage(messages.couponError))
      }
    } catch (error) {
      deleteCouponCodeAction()
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
    }
  }

  deleteCouponCode = () => {
    const { deleteCouponCodeAction = () => {} } = this.props
    deleteCouponCodeAction()
  }
}

const OrderSummaryEnhance = compose(applyPromoCodeMutation)(OrderSummary)

export default OrderSummaryEnhance
