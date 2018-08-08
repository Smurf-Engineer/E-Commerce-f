/**
 * OrderSummary Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
// import get from 'lodash/get'
// import { QueryProps, NetsuiteTax, NetsuiteShipping } from '../../types/common'
// import { getTaxQuery } from './data'
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

// interface Data extends QueryProps {
//   taxes: NetsuiteTax[]
//   shipping: NetsuiteShipping
// }

interface AddressObj {
  country: string
  state: string
  zipCode: string
}

interface Props {
  // data?: Data
  taxes: any
  client: any
  total: number
  subtotal: number
  shipping?: number
  totalWithoutDiscount?: number
  discount?: number
  onlyRead?: boolean
  country?: string
  weight?: string
  shipAddress?: AddressObj | ''
  formatMessage: (messageDescriptor: any) => string
}

const ShareLinkInput = Input.Search
const Panel = Collapse.Panel
export class OrderSummary extends React.Component<Props, {}> {
  // fetchTaxes = async () => {
  //   const {
  //     client: { query },
  //     country,
  //     weight,
  //     shipAddress
  //   } = this.props

  //   if (country && weight && shipAddress) {
  //     try {
  //       const data = await query({
  //         query: getTaxQuery,
  //         variables: { country, weight, shipAddress },
  //         fetchPolicy: 'network-only'
  //       })
  //     } catch (e) {
  //       throw e
  //     }
  //   }
  // }

  // async componentDidMount() {
  //   try {
  //     await this.fetchTaxes()
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  render() {
    const {
      // data,
      total,
      subtotal,
      formatMessage,
      discount,
      totalWithoutDiscount,
      onlyRead
    } = this.props

    const renderDiscount = discount ? (
      <OrderItem>
        {/* UNCOMMENT WHEN DISCOUNTS GETS DEFINED BY CLIENT
        <FlexWrapper>
          <div>{formatMessage(messages.discountCode)}</div>
          <DeleteLabel>{formatMessage(messages.deleteLabel)}</DeleteLabel>
        </FlexWrapper>
        <div>{`USD$${discount}`}</div> */}
        {/*TODO: when onlyRead is true, only show the disscount and disable interaction*/}
      </OrderItem>
    ) : (
      <ZipCodeInputWrapper>
        <ShareLinkInput
          disabled={true}
          id="url"
          placeholder={formatMessage(messages.zipCodePlaceholder)}
          enterButton={formatMessage(messages.estimate)}
          size="default"
          maxLength="5"
          onChange={() => {}}
        />
      </ZipCodeInputWrapper>
    )
    const youSaved = Number(totalWithoutDiscount) - total

    const shippingTotal = 0 // get(data, 'shipping.total', 0)
    const taxesTotal = 0 // get(data, 'taxes.total', 0)

    return (
      <Container>
        <SummaryTitle>
          <FormattedMessage {...messages.summaryTitle} />
        </SummaryTitle>
        <OrderItem>
          <FormattedMessage {...messages.subtotal} />
          <div>{`USD$${subtotal}`}</div>
        </OrderItem>
        <CalculationsWrapper>
          <Divider />
          <OrderItem hide={!taxesTotal}>
            <FormattedMessage {...messages.taxes} />
            <div>{`USD$${taxesTotal}`}</div>
          </OrderItem>
          <OrderItem hide={!shippingTotal}>
            <FormattedMessage {...messages.shipping} />
            <div>{`USD$${shippingTotal}`}</div>
          </OrderItem>
          {!onlyRead ? renderDiscount : null}
        </CalculationsWrapper>
        <CodeDivider />
        {!onlyRead ? (
          <CollapseWrapper>
            <Collapse bordered={false}>
              <Panel header={formatMessage(messages.discountCode)} key="1">
                <ZipCodeInputWrapper>
                  <ShareLinkInput
                    disabled={true}
                    id="url"
                    enterButton={formatMessage(messages.apply)}
                    placeholder={formatMessage(messages.promoCodePlaceholder)}
                    size="default"
                    onChange={() => {}}
                  />
                </ZipCodeInputWrapper>
                <ZipCodeInputWrapper>
                  <ShareLinkInput
                    disabled={true}
                    id="url"
                    enterButton={formatMessage(messages.apply)}
                    placeholder={formatMessage(messages.giftPlaceholder)}
                    size="default"
                    onChange={() => {}}
                  />
                </ZipCodeInputWrapper>
              </Panel>
            </Collapse>
          </CollapseWrapper>
        ) : null}
        <TotalOrderItem withoutMarginBottom={youSaved > 0} {...{ onlyRead }}>
          <FormattedMessage {...messages.total} />
          <div>{`USD$${total}`}</div>
        </TotalOrderItem>
        {youSaved > 0 ? (
          <YouSavedOrderItem {...{ onlyRead }}>
            <FormattedMessage {...messages.youSaved} />
            <div>{`$${youSaved}`}</div>
          </YouSavedOrderItem>
        ) : null}
      </Container>
    )
  }
}

// interface OwnProps {
//   country?: string
//   weight?: string
//   shipAddress?: AddressObj
// }

const OrderSummaryEnhance = compose(
  withApollo
  // graphql(getTaxQuery, {
  //   options: ({ country, weight, shipAddress }: OwnProps) => ({
  //     skip: !country || !weight || !shipAddress,
  //     variables: { country, weight, shipAddress },
  //     fetchPolicy: 'network-only'
  //   })
  // })
)(OrderSummary)

export default OrderSummaryEnhance

// export default OrderSummary
