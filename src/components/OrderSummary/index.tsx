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
  DiscountAmout,
  CouponName,
  InvoiceLink,
  InvoiceIcon,
  TaxDiv,
  PercentDiv,
  ShippingValue,
  CouponIcon,
  SummaryIcon
} from './styledComponents'
import Input from 'antd/lib/input'
import Collapse from 'antd/lib/collapse'
import moment from 'moment'
import { FREE_SHIP } from '../../constants'

interface Props {
  onlyRead?: boolean
  subtotal: number
  couponName?: string
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
  invoiceLink?: string
  currencySymbol?: string
  showDiscount?: boolean
  showCouponInput?: boolean
  couponCode?: CouponCode
  admin?: boolean
  upgrades?: number
  variables?: number
  simpleDesign?: boolean
  formatMessage: (messageDescriptor: Message, params?: PercentParams) => string
  setCouponCodeAction?: (code: CouponCode) => void
  deleteCouponCodeAction?: () => void
  // mutations
  applyPromoCode: (variables: {}) => Promise<any>
}

interface PercentParams {
  percent: number
  isAdmin: string
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
      couponCode,
      invoiceLink,
      variables = 0,
      showDiscount = true,
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
      upgrades = 0,
      totalWithoutDiscount = 0,
      couponName = '',
      admin = false,
      simpleDesign
    } = this.props
    const freeShipping = couponCode && couponCode.freeShipping
    const extraFee = proDesignReview + taxFee + taxPst + taxGst + shippingTotal + upgrades + variables
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
      !!upgrades ||
      !!variables ||
      (!onlyRead && discount > 0)
    const realDiscount = discount > subtotal ? subtotal : discount
    const taxPercent = taxFee > 0 ? 
      taxFee / 
        ((freeShipping ? 0 : shippingTotal) + upgrades + variables + proDesignReview + subtotal - realDiscount) 
      : 0
    const discountValue = freeShipping ? discount + shippingTotal : discount
    return (
      <Container {...{ showCouponInput }}>
        {invoiceLink &&
          <InvoiceLink href={invoiceLink}>
            <InvoiceIcon type="file-done" />
            {formatMessage(messages.invoiceLink)}
          </InvoiceLink>
        }
        <SummaryTitle>
          <SummaryIcon type="shopping"/>
          <FormattedMessage {...messages.summaryTitle} />
        </SummaryTitle>
        {(totalWithoutDiscount > 0 && showDiscount) && (
          <OrderItem>
            <FormattedMessage {...messages.subTotal} />
            <div>{`${totalWithoutDiscount.toFixed(2)}`}</div>
          </OrderItem>
        )}
        {(youSaved > 0 && showDiscount) ? (
          <YouSavedOrderItem {...{ onlyRead }}>
            {formatMessage(messages.youSaved, {
              percent: savedPercent,
              isAdmin: !admin ? 'You ' : ''
            })}
            <div>{`${saved.toFixed(2)}`}</div>
          </YouSavedOrderItem>
        ) : null}
        <OrderItem>
          <FormattedMessage {...messages.subtotal} />
          <div>{`${subtotal.toFixed(2)}`}</div>
        </OrderItem>
        <CalculationsWrapper>
          <Divider withMargin={amountsDivider} />
          <OrderItem hide={!upgrades} secondary={true}>
            <FormattedMessage {...messages.upgrades} />
            <div>{`${upgrades.toFixed(2)}`}</div>
          </OrderItem>
          <OrderItem hide={!variables}>
            <FormattedMessage {...messages.variables} />
            <div>{`${variables.toFixed(2)}`}</div>
          </OrderItem>
          {!!proDesignReview && (
            <OrderItem>
              <FormattedMessage {...messages.proDesigner} />
              <div>{`${proDesignReview.toFixed(2)}`}</div>
            </OrderItem>
          )}
          {freeShipping &&
            <OrderItem hide={!shippingTotal}>
              <FormattedMessage
                {...messages[couponCode && couponCode.type !== FREE_SHIP ? 'freeShipping' : 'shipping']}
              />
              <ShippingValue crossed={couponCode && couponCode.type !== FREE_SHIP}>
                {`${shippingTotal.toFixed(2)}`}
              </ShippingValue>
            </OrderItem>
          }
          {discountValue > 0 && (
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
                {`- ${discountValue.toFixed(2)}`}
              </DiscountAmout>
            </OrderItem>
          )}
          {!!couponName && (
            <OrderItem>
              <FlexWrapper>
                <div>{formatMessage(messages.couponCode)}</div>
              </FlexWrapper>
              <CouponName>{couponName}</CouponName>
            </OrderItem>
          )}
          {/* shipping */}
          {!freeShipping &&
            <OrderItem hide={!shippingTotal}>
              <FormattedMessage {...messages.shipping} />
              <div>{`${shippingTotal.toFixed(2)}`}</div>
            </OrderItem>
          }
          {/* taxes */}
          <OrderItem hide={!taxFee}>
            <TaxDiv>
              <FormattedMessage {...messages.taxes} />
              <PercentDiv>
                ({(taxPercent * 100).toFixed(2)}%)
              </PercentDiv>
            </TaxDiv>
            <div>{`${taxFee.toFixed(2)}`}</div>
          </OrderItem>
          <OrderItem hide={!taxGst}>
            <FormattedMessage {...messages.taxesGst} />
            <div>{`${taxGst.toFixed(2)}`}</div>
          </OrderItem>
          <OrderItem hide={!taxPst}>
            <FormattedMessage {...messages.taxesPst} />
            <div>{`${taxPst.toFixed(2)}`}</div>
          </OrderItem>
          <OrderItem hide={!taxVat}>
            <FormattedMessage {...messages.taxesVat} />
            {taxVat && <div>{`${taxVat.toFixed(2)}`}</div>}
          </OrderItem>
        </CalculationsWrapper>
        {amountsDivider && <Divider />}
        {!onlyRead && showCouponInput ? (
          <CollapseWrapper>
            {!couponCode && 
              <Collapse bordered={false}>
                <Panel header={formatMessage(messages.discountCode)} key="1">
                  <ZipCodeInputWrapper>
                    <InputSearch
                      id="url"
                      enterButton={formatMessage(messages.apply)}
                      placeholder={formatMessage(messages.promoCodePlaceholder)}
                      size="default"
                      prefix={<CouponIcon type="tag" />}
                      onSearch={this.onApplyCouponCode}
                    />
                  </ZipCodeInputWrapper>
                </Panel>
              </Collapse>
            }
          </CollapseWrapper>
        ) : null}
        <TotalOrderItem
          withoutMarginBottom={youSaved > 0}
          {...{ onlyRead, showCouponInput, simpleDesign }}
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
      setCouponCodeAction = () => { },
      deleteCouponCodeAction = () => { },
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
    const { deleteCouponCodeAction = () => { } } = this.props
    deleteCouponCodeAction()
  }
}

const OrderSummaryEnhance = compose(applyPromoCodeMutation)(OrderSummary)

export default OrderSummaryEnhance
