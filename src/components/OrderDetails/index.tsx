/**
 * OrderDetails Component - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import messages from './messages'
import { OrderDetailsInfo, QueryProps } from '../../types/common'
import { getOrderQuery } from './data'
import Icon from 'antd/lib/icon'
import {
  Container,
  ViewContainer,
  Div,
  ScreenTitle,
  Button,
  OrderInfo,
  OrderDelivery,
  DeliveryDate,
  DeliveryLabels,
  DeliveryLabel,
  DeliveryInfo,
  Info,
  OrderSummaryContainer
} from './styledComponents'
import { OrderSummary } from '../OrderSummary'

interface Data extends QueryProps {
  orderQuery: OrderDetailsInfo
}

interface Props {
  orderId: string
  data?: Data
  formatMessage: (messageDescriptor: any) => string
  onReturn: (id: string) => void
}

class OrderDetails extends React.Component<Props, {}> {
  render() {
    const { data, formatMessage, onReturn } = this.props

    const handleOnReturn = () => onReturn('')

    if (!data || !data.orderQuery) {
      return <Container />
    }

    const {
      shortId,
      orderDate,
      shippingTax,
      netsuit: { orderStatus },
      cart,
      status
    } = data.orderQuery

    let totalSum = 0
    if (cart) {
      cart.map(cartItem => {
        const productTotal = cartItem.productTotal as number
        totalSum = totalSum + productTotal
      })
    }

    return (
      <Container>
        <ViewContainer onClick={handleOnReturn}>
          <Icon type="left" />
          <span>{formatMessage(messages.back)}</span>
        </ViewContainer>
        <Div>
          <ScreenTitle>
            <FormattedMessage {...messages.title} />
          </ScreenTitle>
          <Button onClick={this.handleOnClickReceipt}>
            {formatMessage(messages.receipt)}
          </Button>
        </Div>
        <OrderInfo>
          <OrderDelivery>
            <DeliveryDate>
              <span>{formatMessage(messages.deliveryDate)}</span>
              {`    ${orderStatus.deliveryDate ? orderStatus.deliveryDate : '-'}
              `}
            </DeliveryDate>
            <DeliveryLabels>
              <DeliveryLabel>
                {formatMessage(messages.orderNumber)}
              </DeliveryLabel>
              <DeliveryLabel>{formatMessage(messages.orderDate)}</DeliveryLabel>
              <DeliveryLabel>
                {formatMessage(messages.trackingNumber)}
              </DeliveryLabel>
              <DeliveryLabel>{formatMessage(messages.status)}</DeliveryLabel>
            </DeliveryLabels>
            <DeliveryInfo>
              <Info>{shortId}</Info>
              <Info>{orderDate}</Info>
              <Info>-</Info>
              <Info>{status}</Info>
            </DeliveryInfo>
          </OrderDelivery>
          <OrderSummaryContainer>
            <OrderSummary
              total={totalSum + shippingTax}
              subtotal={totalSum}
              shipping={shippingTax}
              discount={0}
              onlyRead={true}
              {...{ formatMessage }}
            />
          </OrderSummaryContainer>
        </OrderInfo>
      </Container>
    )
  }

  handleOnClickReceipt = () => {
    // TODO: Implement action for Receipt button.
  }
}

interface OwnProps {
  orderId?: string
}

const OrderDetailsEnhance = compose(
  graphql(getOrderQuery, {
    options: ({ orderId }: OwnProps) => ({
      skip: !orderId || orderId === '',
      variables: { orderId }
    })
  })
)(OrderDetails)

export default OrderDetailsEnhance
