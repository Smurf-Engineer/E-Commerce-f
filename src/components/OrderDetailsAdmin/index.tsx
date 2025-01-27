/**
 * OrderDetailsAdmin Component - Created by eduardoquintero on 07/05/19.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import queryString from 'query-string'
import get from 'lodash/get'
import messages from './messages'
import {
  OrderDetailsInfo,
  QueryProps,
  FulfillmentNetsuite,
  Message
} from '../../types/common'
import { getOrderQuery } from './data'
import Icon from 'antd/lib/icon'
import Spin from 'antd/lib/spin'
import {
  Container,
  ViewContainer,
  Div,
  ScreenTitle,
  // TODO: Commented to hide the receipt button until green light to continue with this implementation
  // ButtonWrapper,
  // Button,
  OrderInfo,
  OrderDelivery,
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
  LoadingContainer
} from './styledComponents'
import OrderSummary from '../OrderSummary'
import CartListItemAdmin from '../CartListItemAdmin'
import MyAddress from '../MyAddress'

import iconPaypal from '../../assets/Paypal.svg'
import PaymentData from '../PaymentData'
import { PaymentOptions } from '../../screens/Checkout/constants'
import moment from 'moment'

const PRO_DESIGN_FEE = 15

interface Data extends QueryProps {
  orderQuery: OrderDetailsInfo
}

interface Props {
  orderId: string
  data?: Data
  from: string
  history: History
  currentCurrency: string
  formatMessage: (messageDescriptor: Message) => string
  onReturn: (id: string) => void
}

export class OrderDetailsAdmin extends React.Component<Props, {}> {
  goToUserDetails = () => {
    const { history, data } = this.props
    const userId = get(data, 'orderQuery.userId')
    history.push(`/admin/users/${userId}`)
  }
  goToTeamStore = () => {
    const { history, data } = this.props
    const teamStoreId = get(data, 'orderQuery.teamStoreId')
    history.push(`/admin/team-stores/details/${teamStoreId}`)
  }
  render() {
    const {
      data,
      orderId,
      history,
      formatMessage,
      currentCurrency
    } = this.props
    if ((data && data.loading) || !data) {
      return (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    }

    if (!orderId) {
      return null
    }

    if (data && data.error) {
      return (
        <Container>
          <ViewContainer onClick={this.handleOnReturn}>
            <Icon type="left" />
            <span>{formatMessage(messages.backToOrders)}</span>
          </ViewContainer>
          <LoadingContainer>
            {formatMessage(messages.notFound)}
          </LoadingContainer>
        </Container>
      )
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
      shippingPhone,
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
      discount,
      teamStoreId,
      lastDrop,
      teamStoreName,
      email,
      coupon,
      user
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

    const { location } = history || {}
    const { search } = location || {}
    const { from } = queryString.parse(search)

    let subtotal = 0
    const renderItemList = cart
      ? cart.map((cartItem, index) => {
        const {
          designId,
          designImage = '',
          designName = '',
          product: { images, name, shortDescription },
          productTotal,
          preflightCheck,
          unitPrice
        } = cartItem

        subtotal += productTotal || 0

        const priceRange = {
          quantity: '0',
          price: 0,
          shortName: ''
        }

        const itemImage = designId ? designImage : images[0].front
        const itemTitle = designId ? designName : name
        const itemDescription = designId
          ? `${name} ${shortDescription}`
          : shortDescription
        return (
          <CartListItemAdmin
            {...{
              formatMessage,
              productTotal,
              history,
              unitPrice,
              cartItem,
              preflightCheck,
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
        <ViewContainer onClick={this.handleOnReturn}>
          <Icon type="left" />
          <span>{formatMessage(messages[from || 'backToOrders'])}</span>
        </ViewContainer>
        <Div>
          <ScreenTitle>
            <FormattedMessage {...messages.title} />
          </ScreenTitle>
        </Div>
        <OrderInfo>
          <OrderDelivery>
            <DeliveryInfo>
              <DeliveryLabels>
                <DeliveryLabel>
                  {formatMessage(messages.orderPoint)}
                </DeliveryLabel>
                <DeliveryLabel>
                  {formatMessage(messages.orderNumber)}
                </DeliveryLabel>
                <DeliveryLabel>
                  {formatMessage(messages.orderDate)}
                </DeliveryLabel>
                <DeliveryLabel>
                  {formatMessage(messages.deliveryDate)}
                </DeliveryLabel>
                <DeliveryLabel>
                  {formatMessage(messages.trackingNumber)}
                </DeliveryLabel>
                <DeliveryLabel>{formatMessage(messages.status)}</DeliveryLabel>
                <DeliveryLabel>
                  {formatMessage(messages.lastUpdated)}
                </DeliveryLabel>
                <DeliveryLabel>{formatMessage(messages.user)}</DeliveryLabel>
                <DeliveryLabel>{formatMessage(messages.email)}</DeliveryLabel>
              </DeliveryLabels>
              <DeliveryData>
                <Info className={teamStoreId ? 'link' : ''} onClick={teamStoreId ? this.goToTeamStore : null}>
                  {teamStoreId ? teamStoreName : formatMessage(messages.cart)}
                </Info>
                <Info>{shortId}</Info>
                <Info>{orderDate}</Info>
                <Info>{estimatedDate}</Info>
                <Info tracking={true}>{trackingNumber || '-'}</Info>
                <Info>{netsuiteStatus || status}</Info>
                <Info>
                  {lastDrop ? moment(lastDrop).format('DD/MM/YYYY HH:mm') : '-'}
                </Info>
                <Info className="link" onClick={this.goToUserDetails}>{user}</Info>
                <Info>{email}</Info>
              </DeliveryData>
            </DeliveryInfo>
          </OrderDelivery>
          <OrderSummaryContainer>
            <OrderSummary
              onlyRead={true}
              totalSum={total}
              shippingTotal={shippingAmount}
              totalWithoutDiscount={subtotal}
              youSaved={!!coupon && discount}
              currencySymbol={currency.shortName}
              proDesignReview={proDesign && PRO_DESIGN_FEE}
              couponName={coupon}
              admin={true}
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
          <TitleStyled>{formatMessage(messages.items)}</TitleStyled>
          <CartList>{renderItemList}</CartList>
        </Items>
        <ShippingBillingContainer>
          <ShippingBillingCard>
            <SubTitle>{formatMessage(messages.shippingAddress)}</SubTitle>
            <MyAddress
              hideBottomButtons={true}
              name={`${shippingFirstName} ${shippingLastName}`}
              city={`${shippingCity} ${shippingStateProvince}`}
              phone={shippingPhone}
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
      </Container>
    )
  }

  handleOnReturn = () => {
    const { onReturn, history } = this.props
    const { location: { search } } = history
    const { from } = queryString.parse(search)
    if (from) {
      history.goBack()
    } else {
      onReturn('')
    }
  }
}

interface OwnProps {
  orderId?: string
}

const OrderDetailsAdminEnhance = compose(
  graphql(getOrderQuery, {
    options: ({ orderId }: OwnProps) => ({
      skip: !orderId,
      variables: { orderId, global: true },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true
    })
  })
)(OrderDetailsAdmin)

export default OrderDetailsAdminEnhance
