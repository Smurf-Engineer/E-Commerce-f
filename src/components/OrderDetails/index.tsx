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
  OrderSummaryContainer,
  Items,
  TitleStyled,
  CartList
} from './styledComponents'
import { OrderSummary } from '../OrderSummary'
import CartListItem from '../CartListItem'

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

    const renderItemList = cart
      ? cart.map((cartItem, index) => {
          const priceRange = {
            quantity: '0',
            price: 0
          }

          const itemImage = cartItem.designId
            ? cartItem.designImage || ''
            : cartItem.product.images[0].front
          const itemTitle = cartItem.designId
            ? cartItem.designName || ''
            : cartItem.product.name
          const itemDescription = cartItem.designId
            ? `${cartItem.product.name} ${cartItem.product.shortDescription}`
            : cartItem.product.shortDescription
          return (
            <CartListItem
              formatMessage={formatMessage}
              key={index}
              image={itemImage}
              title={itemTitle}
              description={itemDescription}
              price={priceRange}
              productTotal={cartItem.productTotal}
              unitPrice={cartItem.unitPrice}
              cartItem={cartItem}
              itemIndex={index}
              onlyRead={true}
              canReorder={true}
              onClickReorder={this.handleOnClickReorder}
            />
          )
        })
      : null

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
        <Items>
          <TitleStyled>{formatMessage(messages.items)}</TitleStyled>
          <CartList>{renderItemList}</CartList>
        </Items>
      </Container>
    )
  }

  handleOnClickReceipt = () => {
    // TODO: Implement action for Receipt button.
  }

  handleOnClickReorder = () => {
    // TODO: Implement action for Reorder button.
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
