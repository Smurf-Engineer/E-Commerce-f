/**
 * OrderSummary Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import { QueryProps, NetsuiteTax, NetsuiteShipping } from '../../types/common'
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
  CollapseWrapper
  //  FlexWrapper,  UNCOMMENT WHEN DISCOUNTS GETS DEFINED BY CLIENT
  //  DeleteLabel
} from './styledComponents'
import Input from 'antd/lib/input'
import Collapse from 'antd/lib/collapse'

interface Data extends QueryProps {
  taxes: NetsuiteTax[]
  shipping: NetsuiteShipping[]
}

interface Props {
  data: Data
  total: number
  subtotal: number
  discount?: number
  onlyRead?: boolean
  formatMessage: (messageDescriptor: any) => string
}

const ShareLinkInput = Input.Search
const Panel = Collapse.Panel
class OrderSummary extends React.Component<Props, {}> {
  render() {
    const { total, subtotal, formatMessage, discount, onlyRead } = this.props
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
    return (
      <Container>
        <SummaryTitle>
          <FormattedMessage {...messages.summaryTitle} />
        </SummaryTitle>
        <OrderItem>
          <FormattedMessage {...messages.subtotal} />
          <div>{`USD$${subtotal}`}</div>
        </OrderItem>
        <Divider />
        <OrderItem>
          <FormattedMessage {...messages.taxes} />
          <div>{`USD$0`}</div>
        </OrderItem>
        <OrderItem>
          <FormattedMessage {...messages.shipping} />
          <div>{`USD$0`}</div>
        </OrderItem>
        {!onlyRead ? renderDiscount : null}
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
        <TotalOrderItem {...{ onlyRead }}>
          <FormattedMessage {...messages.total} />
          <div>{`USD$${total}`}</div>
        </TotalOrderItem>
      </Container>
    )
  }
}

const OrderSummaryEnhance = compose(
  graphql(getTaxQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  })
)(OrderSummary)

export default OrderSummaryEnhance
