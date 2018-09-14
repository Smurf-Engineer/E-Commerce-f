/**
 * OrderData Component - Created by miguelcanobbio on 23/05/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import { FormattedHTMLMessage } from 'react-intl'
import {
  Container,
  InfoContainer,
  ShippingBillingContainer,
  SubTitle,
  StyledImage,
  SummaryContainer,
  OrderNumberContainer,
  StyledText,
  StyledDropText,
  TitleStyled,
  CartList,
  StyledCheckbox,
  ContainerCheckBox,
  StyledEmailPhoneText,
  Title,
  Content
} from './styledComponents'
import { getOrderQuery } from './data'

import MyAddress from '../MyAddress'
import OrderSummary from '../OrderSummary'
import withError from '..//WithError'
import withLoading from '../WithLoading'

import iconPaypal from '../../assets/Paypal.svg'
import { QueryProps, OrderDataInfo } from '../../types/common'
import CartListItem from '../CartListItem'
import { PaymentOptions } from '../../screens/Checkout/constants'
import PaymentData from '../PaymentData'

const PRO_DESIGN_FEE = 15

interface Data extends QueryProps {
  orderData: OrderDataInfo
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  orderId: string
  title: string
  data: Data
  sendEmailAlert: boolean
  sendSmsAlert: boolean
  currentCurrency: string
  // actions
  emailAlertCheckedAction: (checked: boolean) => void
  smsAlertCheckedAction: (checked: boolean) => void
}

class OrderData extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      orderId,
      title,
      data: {
        orderData: {
          orderDate,
          firstName,
          lastName,
          street,
          city,
          stateProvince,
          zipCode,
          country,
          apartment,
          billingFirstName,
          billingLastName,
          billingStreet,
          billingCity,
          billingStateProvince,
          billingZipCode,
          billingCountry,
          billingApartment,
          shippingAmount,
          payment: { stripeCharge },
          cart,
          paymentMethod,
          currency,
          proDesign,
          taxGst,
          taxPst,
          taxVat,
          taxFee,
          total,
          discount
        }
      },
      sendEmailAlert,
      sendSmsAlert,
      currentCurrency
    } = this.props

    const card = get(stripeCharge, 'cardData')
    const paymentMethodInfo =
      paymentMethod === PaymentOptions.CREDITCARD ? (
        <PaymentData {...{ card }} />
      ) : (
        <StyledImage src={iconPaypal} />
      )

    const isThereTeamstoreProduct = cart.some(c => !!c.teamStoreId)

    const orderMessage = isThereTeamstoreProduct
      ? messages.messageTeamstore
      : messages.messageRetail

    let subtotal = 0
    const renderList = cart
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
              canReorder={false}
            />
          )
        })
      : null
    return (
      <Container>
        <Title>{title}</Title>
        <Content>
          <InfoContainer>
            <OrderNumberContainer>
              <TitleStyled>{formatMessage(messages.orderNumber)}</TitleStyled>
              <StyledText>{orderId}</StyledText>
            </OrderNumberContainer>
            <OrderNumberContainer>
              <TitleStyled>{formatMessage(messages.orderDate)}</TitleStyled>
              <StyledText>{orderDate}</StyledText>
            </OrderNumberContainer>
            <StyledText>
              <FormattedHTMLMessage {...orderMessage} />
            </StyledText>
            <ShippingBillingContainer>
              <div>
                <SubTitle>{formatMessage(messages.shippingAddress)}</SubTitle>
                <MyAddress
                  hideBottomButtons={true}
                  name={`${firstName} ${lastName}`}
                  city={`${city} ${stateProvince}`}
                  {...{ street, zipCode, country, apartment, formatMessage }}
                />
              </div>
              <div>
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
              </div>
              <div>
                <SubTitle>{formatMessage(messages.payment)}</SubTitle>
                {paymentMethodInfo}
              </div>
            </ShippingBillingContainer>
            <TitleStyled>{formatMessage(messages.items)}</TitleStyled>
            <CartList>{renderList}</CartList>
            {isThereTeamstoreProduct ? (
              <div>
                <SubTitle>{formatMessage(messages.priceDropAlert)}</SubTitle>
                <StyledDropText>
                  {formatMessage(messages.priceDropMessage)}
                </StyledDropText>
                {/* TODO: Add button to save these alerts settings*/}
                <ContainerCheckBox>
                  <StyledCheckbox
                    checked={sendEmailAlert}
                    onChange={this.handleOnCheckedSendEmailAlert}
                  >
                    {formatMessage(messages.sendEmail)}
                  </StyledCheckbox>
                  {/* TODO: get real email*/}
                  <StyledEmailPhoneText>joe@smith.com</StyledEmailPhoneText>
                </ContainerCheckBox>
                <ContainerCheckBox>
                  <StyledCheckbox
                    checked={sendSmsAlert}
                    onChange={this.handleOnCheckedSendSmsAlert}
                  >
                    {formatMessage(messages.sendSms)}
                  </StyledCheckbox>
                  {/* TODO: get real phone*/}
                  <StyledEmailPhoneText> 111-111-1111</StyledEmailPhoneText>
                </ContainerCheckBox>
              </div>
            ) : null}
          </InfoContainer>
          <SummaryContainer>
            <OrderSummary
              totalSum={total}
              shippingTotal={shippingAmount}
              onlyRead={true}
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
          </SummaryContainer>
        </Content>
      </Container>
    )
  }

  handleOnCheckedSendEmailAlert = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { emailAlertCheckedAction } = this.props
    const {
      target: { checked }
    } = event
    emailAlertCheckedAction(checked)
  }
  handleOnCheckedSendSmsAlert = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { smsAlertCheckedAction } = this.props
    const {
      target: { checked }
    } = event
    smsAlertCheckedAction(checked)
  }
}

type OwnProps = {
  orderId?: string
}

const OrderDataEnhanced = compose(
  graphql<Data>(getOrderQuery, {
    options: ({ orderId }: OwnProps) => {
      return {
        fetchPolicy: 'network-only',
        variables: {
          orderId
        }
      }
    }
  }),
  withLoading,
  withError
)(OrderData)

export default OrderDataEnhanced
