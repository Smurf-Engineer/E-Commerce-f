/**
 * OrderDetails Component - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import { FormattedHTMLMessage } from 'react-intl'
import message from 'antd/lib/message'
import moment from 'moment'
import get from 'lodash/get'
import messages from './messages'
import { OrderDetailsInfo, QueryProps } from '../../types/common'
import Modal from 'antd/lib/modal'
import { getOrderQuery, deleteOrderMutation } from './data'
import Icon from 'antd/lib/icon'
import Spin from 'antd/lib/spin'
import Button from 'antd/lib/button'
import {
  Container,
  ViewContainer,
  Div,
  ScreenTitle,
  // TODO: Commented to hide the receipt button until green light to continue with this implementation
  ButtonWrapper,
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
  Annotation,
  LoadingContainer,
  OrderActions,
  DeleteButton,
  StyledText,
  ErrorMessage,
  Paragraph
} from './styledComponents'
import OrderSummary from '../OrderSummary'
import CartListItem from '../CartListItem'
import MyAddress from '../MyAddress'
import AddToCartButton from '../AddToCartButton'

import iconPaypal from '../../assets/Paypal.svg'
import { ORDER_HISTORY } from '../../screens/Account/constants'
import PaymentData from '../PaymentData'
import { PaymentOptions } from '../../screens/Checkout/constants'
import { PREORDER, PAYMENT_ISSUE } from '../../constants'

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
  deleteOrder: (variables: {}) => Promise<any>
  goToCart: () => void
}

const { confirm } = Modal

export class OrderDetails extends React.Component<Props, {}> {
  editOrderButton: any
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
      discount,
      teamStoreId,
      lastDrop,
      teamStoreName,
      canUpdatePayment
    } = data.orderQuery

    const netsuiteObject = get(netsuite, 'orderStatus')

    const netsuiteStatus = netsuiteObject && netsuiteObject.orderStatus

    let subtotal = 0
    const renderItemList = cart
      ? cart.map((cartItem, index) => {
          const {
            designId,
            designImage,
            designName,
            product: { images, name, shortDescription },
            productTotal,
            unitPrice,
            teamStoreItem
          } = cartItem

          subtotal += productTotal || 0
          cartItem.isFixed = true
          cartItem.teamStoreItem = teamStoreItem
          cartItem.teamStoreName = teamStoreName
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
              canReorder={!teamStoreId && true}
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
        {status === PAYMENT_ISSUE && (
          <ErrorMessage>
            <Paragraph
              dangerouslySetInnerHTML={{
                __html: formatMessage(messages.paymentIssue)
              }}
            />
          </ErrorMessage>
        )}
        <ViewContainer onClick={handleOnReturn}>
          <Icon type="left" />
          <span>{formatMessage(getBackMessage)}</span>
        </ViewContainer>
        <Div>
          <ScreenTitle>
            <FormattedMessage {...messages.title} />
          </ScreenTitle>
          {/* TODO: Hide receipt button until green light to continue with the development of the pdf receipt
           <ButtonWrapper>
            <Button type="primary" onClick={this.handleOnClickReceipt}>
              {formatMessage(messages.receipt)}
            </Button>
          </ButtonWrapper> */}
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
                <DeliveryLabel>{formatMessage(messages.status)}</DeliveryLabel>
                <DeliveryLabel>
                  {formatMessage(messages.lastUpdated)}
                </DeliveryLabel>
              </DeliveryLabels>
              <DeliveryData>
                <Info>
                  {teamStoreId ? teamStoreName : formatMessage(messages.cart)}
                </Info>
                <Info>{shortId}</Info>
                <Info>{orderDate}</Info>
                <Info>{estimatedDate}</Info>
                <Info redColor={status === PAYMENT_ISSUE}>
                  {netsuiteStatus || status}
                </Info>
                <Info>
                  {lastDrop ? moment(lastDrop).format('DD/MM/YYYY HH:mm') : '-'}
                </Info>
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
        <StyledText>
          <FormattedHTMLMessage
            {...messages[teamStoreId ? 'messageTeamstore' : 'messageRetail']}
          />
        </StyledText>
        <Items>
          {!teamStoreId && (
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
          )}
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
        <AddToCartButton
          ref={(addToCartButton: any) =>
            (this.editOrderButton = addToCartButton)
          }
          label={formatMessage(messages.edit)}
          renderForThumbnail={false}
          items={cart}
          {...{ formatMessage }}
          withoutTop={true}
          myLockerList={false}
          itemProdPage={true}
          orderDetails={true}
          onClick={() => true}
          hide={true}
          fixedCart={status === PAYMENT_ISSUE}
          replaceOrder={shortId}
        />
        {teamStoreId &&
        (status === PREORDER ||
          (status === PAYMENT_ISSUE && canUpdatePayment)) ? (
          <OrderActions>
            <ButtonWrapper>
              <Button type="primary" onClick={this.handleOnEditOrder}>
                {formatMessage(
                  status === PAYMENT_ISSUE
                    ? messages.updatePayment
                    : messages.edit
                )}
              </Button>
            </ButtonWrapper>
            <DeleteButton onClick={this.handleOnDeleteOrder}>
              {formatMessage(messages.deleteOrder)}
            </DeleteButton>
          </OrderActions>
        ) : (
          <Annotation>{formatMessage(messages.annotation)}</Annotation>
        )}
      </Container>
    )
  }

  handleOnEditOrder = () => {
    const { formatMessage, goToCart } = this.props
    confirm({
      title: formatMessage(messages.editOrderTitle),
      content: formatMessage(messages.editOrderMessage),
      okText: formatMessage(messages.proceed),
      onOk: async () => {
        try {
          await this.deleteOrder()
          this.editOrderButton.getWrappedInstance().addToCart()
          goToCart()
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }

  handleOnDeleteOrder = () => {
    const { formatMessage, onReturn } = this.props
    confirm({
      title: formatMessage(messages.deleteTeamstoreTitle),
      content: formatMessage(messages.deleteTeamstoreMessage),
      okText: formatMessage(messages.delete),
      onOk: async () => {
        try {
          await this.deleteOrder()
          onReturn('')
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }

  deleteOrder = async () => {
    const { deleteOrder, data } = this.props
    const { shortId } = data.orderQuery
    try {
      if (typeof window !== 'undefined') {
        const cartList = JSON.parse(localStorage.getItem('cart') as any)
        if (cartList) {
          localStorage.removeItem('cart')
        }
      }
      const response = await deleteOrder({
        variables: { orderId: shortId }
      })
      const responseMessage = get(response, 'data.cancelOrder.message', '')
      message.success(responseMessage)
    } catch (e) {
      message.error(e.message)
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
  deleteOrderMutation,
  graphql(getOrderQuery, {
    options: ({ orderId }: OwnProps) => ({
      skip: !orderId,
      variables: { orderId }
    })
  })
)(OrderDetails)

export default OrderDetailsEnhance
