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
import { OrderDetailsInfo, QueryProps, FulfillmentNetsuite } from '../../types/common'
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
  Paragraph,
  FAQSection,
  Title,
  FAQBody
} from './styledComponents'
import OrderSummary from '../OrderSummary'
import CartListItem from '../CartListItem'
import MyAddress from '../MyAddress'
import AddToCartButton from '../AddToCartButton'

import iconPaypal from '../../assets/Paypal.svg'
import { ORDER_HISTORY } from '../../screens/Account/constants'
import PaymentData from '../PaymentData'
import { PaymentOptions } from '../../screens/Checkout/constants'
import { PREORDER, PAYMENT_ISSUE, VARIABLE_PRICE } from '../../constants'
import ProductInfo from '../ProductInfo'

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
  state = {
    showPricing: false,
    showOrder: false,
    showIssue: false
  }
  toggleProductInfo = (id: string) => {
    const stateValue = this.state[id]
    this.setState({ [id]: !stateValue } as any)
  }
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

    const {
      showPricing,
      showOrder,
      showIssue
    } = this.state

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
      owner,
      shippingApartment,
      shippingPhone,
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
      teamStoreName,
      taxPst,
      taxVat,
      taxFee,
      total,
      discount,
      teamStoreId,
      lastDrop,
      canUpdatePayment,
      onDemand,
      coupon
    } = data.orderQuery

    const netsuiteObject = get(netsuite, 'orderStatus')

    const netsuiteStatus = netsuiteObject && netsuiteObject.orderStatus

    const fulfillments = get(
      netsuiteObject,
      'fulfillments',
      [] as FulfillmentNetsuite[]
    )
    const packages = get(fulfillments, '[0].packages')
    const trackingNumber = packages && packages.replace('<BR>', ', ')

    let subtotal = 0
    let upgrades = 0
    let variables = 0
    const cartItems = cart || []
    const showDiscount = cartItems.some(({ isReseller }) => !isReseller)
    const renderItemList = cart
      ? cart.map((cartItem, index) => {
        const {
          designId,
          designImage,
          designName,
          product: { images, name, shortDescription },
          productTotal,
          unitPrice,
          teamStoreItem,
          itemDetails
        } = cartItem

        // This function is used to SUM all the upgrades prices applied to a product and have it on the subtotal
        // Upgrades prices * quantities
        const subUpgrade = itemDetails.reduce((sum, { quantity, upgradeOnePrice = 0, upgradeTwoPrice = 0}) =>
          sum + (upgradeOnePrice * quantity) + (quantity * upgradeTwoPrice)
        // tslint:disable-next-line: align
        , 0)
        const subVariables = itemDetails.reduce((sum, { quantity, variableOneValue, variableTwoValue }) => {
          if (variableOneValue && variableOneValue.trim()) {
            sum += (VARIABLE_PRICE * quantity)
          }
          if (variableTwoValue && variableTwoValue.trim()) {
            sum += (VARIABLE_PRICE * quantity)
          }
          return sum
        }// tslint:disable-next-line: align
        , 0)
        variables += subVariables || 0
        upgrades += subUpgrade || 0
        subtotal += productTotal || 0
        cartItem.isFixed = onDemand === false
        cartItem.teamStoreItem = teamStoreItem
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
            canReorder={!teamStoreId && owner}
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
                  {formatMessage(messages.trackingNumber)}
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
                <Info>{trackingNumber || '-'}</Info>
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
              totalWithoutDiscount={subtotal}
              youSaved={!!coupon && discount}
              currencySymbol={currency.shortName}
              proDesignReview={proDesign && PRO_DESIGN_FEE}
              couponName={coupon}
              {...{
                formatMessage,
                taxGst,
                taxPst,
                variables,
                upgrades,
                taxVat,
                taxFee,
                showDiscount,
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
          {!teamStoreId && owner && (
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
              phone={shippingPhone}
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
        {owner &&
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
            isFixed={teamStoreId && !onDemand}
            orderDetails={true}
            onClick={() => true}
            hide={true}
            fixedCart={status === PAYMENT_ISSUE}
            replaceOrder={shortId}
          />
        }
        {(teamStoreId && owner) &&
          (status === PREORDER || canUpdatePayment) ? (
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
        {!!teamStoreId &&
          <FAQSection>
            <Title>
              {formatMessage(messages.faqTitle)}
            </Title>
            <FAQBody>
              <ProductInfo
                id="showPricing"
                titleWidth={'100%'}
                title={formatMessage(messages.priceQuestion)}
                showContent={showPricing}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.priceAnswer)
                  }}
                />
              </ProductInfo>
              <ProductInfo
                id="showIssue"
                richText={true}
                title={formatMessage(messages.issueQuestion)}
                showContent={showIssue}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.issueAnswer)
                  }}
                />
              </ProductInfo>
              <ProductInfo
                id="showOrder"
                title={formatMessage(messages.orderQuestion)}
                showContent={showOrder}
                toggleView={this.toggleProductInfo}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages.orderAnswer)
                  }}
                />
              </ProductInfo>
            </FAQBody>
          </FAQSection>
        }
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
