/**
 * OrderSummary Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import get from 'lodash/get'
import {
  QueryProps,
  NetsuiteTax,
  NetsuiteShipping,
  TaxAddressObj,
  AddressObj
} from '../../types/common'
import { getTaxQuery } from './data'
import messages from './messages'
import {
  Container,
  SummaryTitle,
  OrderItem,
  TotalOrderItem,
  Divider,
  CodeDivider,
  ZipCodeInputWrapper,
  CollapseWrapper,
  CalculationsWrapper,
  YouSavedOrderItem
  //  FlexWrapper,  UNCOMMENT WHEN DISCOUNTS GETS DEFINED BY CLIENT
  //  DeleteLabel
} from './styledComponents'
import Input from 'antd/lib/input'
import Collapse from 'antd/lib/collapse'

const COUNTRY_CODE_US = 'us'
const COUNTRY_CODE_CANADA = 'ca'

interface Data extends QueryProps {
  taxes: NetsuiteTax[]
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
  proDesignReview?: number
  currencySymbol?: string
  formatMessage: (messageDescriptor: any) => string
}

const InputSearch = Input.Search
const Panel = Collapse.Panel
export class OrderSummary extends React.Component<Props, {}> {
  render() {
    const {
      data,
      total,
      subtotal,
      formatMessage,
      // discount,
      totalWithoutDiscount,
      onlyRead,
      proDesignReview,
      currencySymbol,
      shipping,
      taxes,
      country
    } = this.props

    // const renderDiscount = discount ? (
    //   <OrderItem>
    //     {/* UNCOMMENT WHEN DISCOUNTS GETS DEFINED BY CLIENT
    //     <FlexWrapper>
    //       <div>{formatMessage(messages.discountCode)}</div>
    //       <DeleteLabel>{formatMessage(messages.deleteLabel)}</DeleteLabel>
    //     </FlexWrapper>
    //     <div>{`USD$${discount}`}</div> */}
    //     {/*TODO: when onlyRead is true, only show the disscount and disable interaction*/}
    //   </OrderItem>
    // ) : (
    //     <ZipCodeInputWrapper>
    //       <InputSearch
    //         disabled={true}
    //         id="url"
    //         placeholder={formatMessage(messages.zipCodePlaceholder)}
    //         enterButton={formatMessage(messages.estimate)}
    //         size="default"
    //         maxLength="5"
    //         onChange={() => { }}
    //       />
    //     </ZipCodeInputWrapper>
    //   )
    const youSaved = Number(totalWithoutDiscount) - total

    const shippingTotal = get(data, 'shipping.total', shipping) || 0
    const taxesAmount = get(data, 'taxes.total', taxes) || 0

    const symbol = currencySymbol || '$'

    // get tax fee
    let taxFee = 0
    if (taxesAmount && country) {
      let taxTotal = 0
      switch (country.toLowerCase()) {
        case COUNTRY_CODE_US:
          taxTotal = (total * taxesAmount) / 100 // calculate tax
          taxFee = Math.round(taxTotal * 100) / 100 // round to 2 decimals
          break
        case COUNTRY_CODE_CANADA: // TODO: pending confirmation
          taxTotal = (total * taxesAmount) / 100 // calculate tax
          taxFee = Math.round(taxTotal * 100) / 100 // round to 2 decimals
          break
        default:
          break
      }
    }

    const sumTotal =
      total + shippingTotal + taxFee + (!!proDesignReview && proDesignReview)

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
          <Divider />

          {!!proDesignReview && (
            <OrderItem>
              <FormattedMessage {...messages.proDesigner} />
              <div>{`${symbol} ${proDesignReview.toFixed(2)}`}</div>
            </OrderItem>
          )}

          <OrderItem hide={!taxFee}>
            <FormattedMessage {...messages.taxes} />
            <div>{`${symbol} ${taxFee.toFixed(2)}`}</div>
          </OrderItem>
          <OrderItem hide={!shippingTotal}>
            <FormattedMessage {...messages.shipping} />
            <div>{`${symbol} ${shippingTotal.toFixed(2)}`}</div>
          </OrderItem>
          {/* Uncomment to display discount ammount or shipping estimate */}
          {/* {!onlyRead ? renderDiscount : null} */}
        </CalculationsWrapper>
        <CodeDivider />
        {!onlyRead ? (
          <CollapseWrapper>
            <Collapse bordered={false}>
              <Panel header={formatMessage(messages.discountCode)} key="1">
                <ZipCodeInputWrapper>
                  <InputSearch
                    id="url"
                    enterButton={formatMessage(messages.apply)}
                    placeholder={formatMessage(messages.promoCodePlaceholder)}
                    size="default"
                    onSearch={this.applyCouponCode}
                  />
                </ZipCodeInputWrapper>
              </Panel>
            </Collapse>
          </CollapseWrapper>
        ) : null}
        <TotalOrderItem withoutMarginBottom={youSaved > 0} {...{ onlyRead }}>
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

  applyCouponCode = (code: string) => {
    console.log(code)
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
  })
)(OrderSummary)

export default OrderSummaryEnhance
