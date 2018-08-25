/**
 * OrderDetails Component - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import { OrderDetailsInfo, QueryProps } from '../../types/common'
import { getOrderQuery } from './data'
import Icon from 'antd/lib/icon'
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
  PaymentText,
  CardNumber,
  StyledImage,
  Annotation,
  Date
} from './styledComponents'
import { OrderSummary } from '../OrderSummary'
import CartListItem from '../CartListItem'
import MyAddress from '../MyAddress'
import AddToCartButton from '../AddToCartButton'

import iconVisa from '../../assets/card-visa.svg'
import iconMasterCard from '../../assets/card-master.svg'
import iconAE from '../../assets/card-AE.svg'
import iconDiscover from '../../assets/card-discover.svg'
import iconCreditCard from '../../assets/card-default.svg'
import iconPaypal from '../../assets/Paypal.svg'
import { ORDER_HISTORY } from '../../screens/Account/constants'

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
      netsuit,
      payment: { stripeCharge },
      cart,
      status,
      currency,
      taxAmount,
      shippingAmount
    } = data.orderQuery

    const deliveryDate =
      netsuit && netsuit.orderStatus && netsuit.orderStatus.deliveryDate

    let totalSum = 0
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

          const prodTotal = productTotal as number
          totalSum = totalSum + prodTotal

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

    const cardName = get(stripeCharge, 'cardData.name', '')
    const cardExpYear = get(stripeCharge, 'cardData.expYear', 0)
    const cardExpMonth = get(stripeCharge, 'cardData.expMonth', 0)
    const cardLast4 = get(stripeCharge, 'cardData.last4', '')
    const cardBrand = get(stripeCharge, 'cardData.brand', '')

    const expYear = String(cardExpYear).substring(2, 4)
    const expMonth = cardExpMonth > 9 ? cardExpMonth : `0${cardExpMonth}`
    let cardIcon = this.getCardIcon(cardBrand)

    const paymentMethodInfo =
      paymentMethod === 'credit card' ? (
        <div>
          <PaymentText>{cardName}</PaymentText>
          <CardNumber>
            <PaymentText>{`X-${cardLast4}`}</PaymentText>
            <StyledImage src={cardIcon} />
          </CardNumber>
          <PaymentText>{`EXP ${expMonth}/${expYear}`}</PaymentText>
        </div>
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
              <Date>{` ${deliveryDate || '-'}`}</Date>
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
                <Info tracking={true}>-</Info>
                <Info>{status}</Info>
              </DeliveryData>
            </DeliveryInfo>
          </OrderDelivery>
          <OrderSummaryContainer>
            <OrderSummary
              total={totalSum + shippingAmount + taxAmount}
              subtotal={totalSum}
              shipping={shippingAmount}
              taxes={taxAmount}
              discount={0}
              onlyRead={true}
              currencySymbol={currency.shortName}
              {...{ formatMessage }}
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

  getCardIcon(brand: string) {
    switch (brand) {
      case 'Visa':
        return iconVisa
      case 'MasterCard':
        return iconMasterCard
      case 'American Express':
        return iconAE
      case 'Discover':
        return iconDiscover
      default:
        return iconCreditCard
    }
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
