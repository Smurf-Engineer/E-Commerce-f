/**
 * OrderSummary Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
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

interface Props {
  total: number
  discount?: number
  formatMessage: (messageDescriptor: any) => string
}

const ShareLinkInput = Input.Search
const Panel = Collapse.Panel
class OrderSummary extends React.Component<Props, {}> {
  render() {
    const { total, formatMessage, discount } = this.props
    const renderDiscount = discount ? (
      <OrderItem>
        {/* UNCOMMENT WHEN DISCOUNTS GETS DEFINED BY CLIENT
        <FlexWrapper>
          <div>{formatMessage(messages.discountCode)}</div>
          <DeleteLabel>{formatMessage(messages.deleteLabel)}</DeleteLabel>
        </FlexWrapper>
        <div>{`USD$${discount}`}</div> */}
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
          <div>{`USD$${total}`}</div>
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
        {renderDiscount}
        <CodeDivider />
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
        <TotalOrderItem>
          <FormattedMessage {...messages.total} />
          <div>{`USD$0`}</div>
        </TotalOrderItem>
      </Container>
    )
  }
}

export default OrderSummary
