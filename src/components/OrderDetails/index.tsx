/**
 * OrderDetails Component - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import {
  OrderDetailsInfo,
  QueryProps,
  FulfillmentNetsuite
} from '../../types/common'
import { getOrderQuery } from './data'
import Icon from 'antd/lib/icon'
import Spin from 'antd/lib/spin'
import {
  Container,
  ViewContainer,
  Div,
  ScreenTitle,
  ButtonWrapper,
  Button,
  OrderInfo,
  OrderDelivery,
  DeliveryDate,
  DeliveryInfo,
  DeliveryLabels,
  DeliveryLabel,
  DeliveryData,
  Info,
  OrderSummaryContainer,
  Items,
  TitleStyled,
  CartList,
  ShippingBillingContainer,
  ShippingBillingCard,
  SubTitle,
  StyledImage,
  Annotation,
  Date,
  LoadingContainer
} from './styledComponents'
import OrderSummary from '../OrderSummary'
import CartListItem from '../CartListItem'
import MyAddress from '../MyAddress'
import AddToCartButton from '../AddToCartButton'

import iconPaypal from '../../assets/Paypal.svg'
import { ORDER_HISTORY } from '../../screens/Account/constants'
import PaymentData from '../PaymentData'
import { PaymentOptions } from '../../screens/Checkout/constants'

const PRO_DESIGN_FEE = 15

interface Data extends QueryProps {
  orderQuery: OrderDetailsInfo
}

interface Props {
  orderId: string
  data?: Data
  from: string
  currentCurrency: string
  formatMessage: (messageDescriptor: any) => string
  onReturn: (id: string) => void
}

export class OrderDetails extends React.Component<Props, {}> {
  render() {
    const {
      data,
      orderId,
      from,
      formatMessage,
      onReturn,
      currentCurrency
    } = this.props

    if (data && data.loading) {
      return (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    }

    const handleOnReturn = () => onReturn('')

    const getBackMessage =
      from === ORDER_HISTORY ? messages.backToHistory : messages.backToOverview

    if (!orderId) {
      return null
    }

    if (!data || !data.orderQuery) {
      return <Container />
    }

    const {
      shortId,
      orderDate,
      estimatedDate,
      paymentMethod,
      shippingFirstName,
      shippingLastName,
      shippingStreet,
      shippingApartment,
      shippingCountry,
      shippingStateProvince,
      shippingCity,
      shippingZipCode,
      billingFirstName,
      billingLastName,
      billingStreet,
      billingApartment,
      billingCountry,
      billingStateProvince,
      billingCity,
      billingZipCode,
      netsuite,
      payment: { stripeCharge },
      cart,
      status,
      currency,
      shippingAmount,
      proDesign,
      taxGst,
      taxPst,
      taxVat,
      taxFee,
      total,
      discount
    } = data.orderQuery

    const netsuiteObject = get(netsuite, 'orderStatus')
    const fulfillments = get(
      netsuiteObject,
      'fulfillments',
      [] as FulfillmentNetsuite[]
    )

    const netsuiteStatus = netsuiteObject && netsuiteObject.orderStatus

    const packages = get(fulfillments, '[0].packages')

    const trackingNumber = packages && packages.replace('<BR>', ', ')

    let subtotal = 0
    const renderItemList = cart
      ? cart.map((cartItem, index) => {
          const {
            designId,
            designImage,
            designName,
            product: { images, name, shortDescription },
            productTotal,
            unitPrice
          } = cartItem

          subtotal += productTotal || 0

          const priceRange = {
            quantity: '0',
            price: 0,
            shortName: ''
          }

          const itemImage = designId ? designImage || '' : images[0].front
          const itemTitle = designId ? designName || '' : name
          const itemDescription = designId
            ? `${name} ${shortDescription}`
            : shortDescription
          return (
            <CartListItem
              {...{
                formatMessage,
                productTotal,
                unitPrice,
                cartItem,
                currentCurrency
              }}
              currencySymbol={currency.shortName}
              key={index}
              image={itemImage}
              title={itemTitle}
              description={itemDescription}
              price={priceRange}
              itemIndex={index}
              onlyRead={true}
              canReorder={true}
            />
          )
        })
      : null

    const card = get(stripeCharge, 'cardData')
    const paymentMethodInfo =
      paymentMethod === PaymentOptions.CREDITCARD ? (
        <PaymentData {...{ card }} />
      ) : (
        <StyledImage src={iconPaypal} />
      )

    return (
      <Container>
        <ViewContainer onClick={handleOnReturn}>
          <Icon type="left" />
          <span>{formatMessage(getBackMessage)}</span>
        </ViewContainer>
        <Div>
          <ScreenTitle>
            <FormattedMessage {...messages.title} />
          </ScreenTitle>
          <ButtonWrapper>
            <Button type="primary" onClick={this.handleOnClickReceipt}>
              {formatMessage(messages.receipt)}
            </Button>
          </ButtonWrapper>
        </Div>
        <OrderInfo>
          <OrderDelivery>
            <DeliveryDate>
              <span>{formatMessage(messages.deliveryDate)}</span>
              <Date>{` ${estimatedDate}`}</Date>
            </DeliveryDate>
            <DeliveryInfo>
              <DeliveryLabels>
                <DeliveryLabel>
                  {formatMessage(messages.orderNumber)}
                </DeliveryLabel>
                <DeliveryLabel>
                  {formatMessage(messages.orderDate)}
                </DeliveryLabel>
                <DeliveryLabel>
                  {formatMessage(messages.trackingNumber)}
                </DeliveryLabel>
                <DeliveryLabel>{formatMessage(messages.status)}</DeliveryLabel>
              </DeliveryLabels>
              <DeliveryData>
                <Info>{shortId}</Info>
                <Info>{orderDate}</Info>
                <Info tracking={true}>{trackingNumber || '-'}</Info>
                <Info>{netsuiteStatus || status}</Info>
              </DeliveryData>
            </DeliveryInfo>
          </OrderDelivery>
          <OrderSummaryContainer>
            <OrderSummary
              onlyRead={true}
              totalSum={total}
              shippingTotal={shippingAmount}
              currencySymbol={currency.shortName}
              proDesignReview={proDesign && PRO_DESIGN_FEE}
              {...{
                formatMessage,
                taxGst,
                taxPst,
                taxVat,
                taxFee,
                discount,
                subtotal
              }}
            />
          </OrderSummaryContainer>
        </OrderInfo>
        <Items>
          <TitleStyled>
            {formatMessage(messages.items)}
            <AddToCartButton
              label={formatMessage(messages.reorderAll)}
              renderForThumbnail={false}
              items={cart}
              {...{ formatMessage }}
              withoutTop={true}
              myLockerList={false}
              itemProdPage={true}
              orderDetails={true}
              onClick={() => true}
            />
          </TitleStyled>
          <CartList>{renderItemList}</CartList>
        </Items>
        <ShippingBillingContainer>
          <ShippingBillingCard>
            <SubTitle>{formatMessage(messages.shippingAddress)}</SubTitle>
            <MyAddress
              hideBottomButtons={true}
              name={`${shippingFirstName} ${shippingLastName}`}
              city={`${shippingCity} ${shippingStateProvince}`}
              street={shippingStreet}
              zipCode={shippingZipCode}
              country={shippingCountry}
              apartment={shippingApartment}
              {...{ formatMessage }}
            />
          </ShippingBillingCard>
          <ShippingBillingCard>
            <SubTitle>{formatMessage(messages.billingAddress)}</SubTitle>
            <MyAddress
              hideBottomButtons={true}
              name={`${billingFirstName} ${billingLastName}`}
              street={billingStreet}
              city={`${billingCity} ${billingStateProvince}`}
              zipCode={billingZipCode}
              country={billingCountry}
              apartment={billingApartment}
              {...{ formatMessage }}
            />
          </ShippingBillingCard>
          <ShippingBillingCard>
            <SubTitle>{formatMessage(messages.payment)}</SubTitle>
            {paymentMethodInfo}
          </ShippingBillingCard>
        </ShippingBillingContainer>
        <Annotation>{formatMessage(messages.annotation)}</Annotation>
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
      skip: !orderId,
      variables: { orderId }
    })
  })
)(OrderDetails)

export default OrderDetailsEnhance
