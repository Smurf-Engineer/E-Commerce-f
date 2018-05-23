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
  OrderNumber
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
import { QueryProps } from '../../types/common'

interface Data extends QueryProps {
  orderData: {
    orderDate: string
    firstName: string
    lastName: string
    street: string
    city: string
    stateProvince: string
    zipCode: string
    country: string
    apartment: string
    billingFirstName: string
    billingLastName: string
    billingStreet: string
    billingCity: string
    billingStateProvince: string
    billingZipCode: string
    billingCountry: string
    billingApartment: string
    payment: {
      cardData: {
        name: string
        last4: string
        brand: string
        exp_month: number
        exp_year: number
      }
    }
    cart: any
  }
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  orderId: string
  data: Data
}

class OrderData extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      orderId,
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
            cardData: { name, last4, brand, exp_month, exp_year }
          },
          cart
        }
      }
    } = this.props
    const expYear = String(exp_year).substring(2, 4)
    const expMonth = exp_month > 9 ? exp_month : `0${exp_month}`
    let cardIcon = this.getCardIcon(brand)
    console.log(cart)
    return (
      <Container>
        <InfoContainer>
          <OrderNumberContainer>
            <SubTitle>{formatMessage(messages.orderNumber)}</SubTitle>
            <OrderNumber>{orderId}</OrderNumber>
          </OrderNumberContainer>
          <OrderNumberContainer>
            <SubTitle>{formatMessage(messages.orderDate)}</SubTitle>
            <OrderNumber>{orderDate}</OrderNumber>
          </OrderNumberContainer>
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
        </InfoContainer>
        <SummaryContainer>
          <OrderSummary
            total={10}
            subtotal={10}
            discount={10}
            {...{ formatMessage }}
          />
        </SummaryContainer>
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
