/**
 * OrderData Component - Created by miguelcanobbio on 23/05/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import messages from './messages'
import {
  Container,
  InfoContainer,
  ShippingBillingContainer,
  SubTitle,
  PaymentText,
  CardNumber,
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

import iconVisa from '../../assets/card-visa.svg'
import iconMasterCard from '../../assets/card-master.svg'
import iconAE from '../../assets/card-AE.svg'
import iconDiscover from '../../assets/card-discover.svg'
import iconCreditCard from '../../assets/card-default.svg'
import { QueryProps, OrderDataInfo } from '../../types/common'
import CartListItem from '../CartListItem'

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
          payment: {
            cardData: { name, last4, brand, expMonth, expYear }
          },
          cart
        }
      },
      sendEmailAlert,
      sendSmsAlert
    } = this.props
    const expYear = String(exp_year).substring(2, 4)
    const expMonth = exp_month > 9 ? exp_month : `0${exp_month}`
    let cardIcon = this.getCardIcon(brand)
    let isThereTeamstoreProduct = false
    const renderList = cart
      ? cart.map((cartItem, index) => {
          const priceRange = {
            quantity: '0',
            price: 0
          }
          if (!isThereTeamstoreProduct && cartItem.designId) {
            isThereTeamstoreProduct = true
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
            />
          )
        })
      : null
    let totalSum = 0
    if (cart) {
      cart.map((cartItem, index) => {
        const productTotal = cartItem.productTotal as number
        totalSum = totalSum + productTotal
      })
    }
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
              {formatMessage(
                isThereTeamstoreProduct
                  ? messages.messageTeamstore
                  : messages.messageReatil
              )}
              {/* TODO: add correct text for reatil */}
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
                <PaymentText>{name}</PaymentText>
                <CardNumber>
                  <PaymentText>{`X-${last4}`}</PaymentText>
                  <StyledImage src={cardIcon} />
                </CardNumber>
                <PaymentText>{`EXP ${expMonth}/${expYear}`}</PaymentText>
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
            {/* TODO: add discount*/}
            <OrderSummary
              total={totalSum}
              subtotal={totalSum}
              discount={0}
              onlyRead={true}
              {...{ formatMessage }}
            />
          </SummaryContainer>
        </Content>
      </Container>
    )
  }
  getCardIcon = (brand: string) => {
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
