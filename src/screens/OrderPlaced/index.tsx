/**
 * OrderPlaced Screen - Created by cazarez on 22/05/18.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { injectIntl, InjectedIntl } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
// import { ReducersObject } from '../../store/rootReducer'
import * as orderPlacedActions from './actions'
import messages from './messages'
import { getOrderQuery } from './data'
import {
  Container,
  Title,
  Content,
  InfoContainer,
  SummaryContainer,
  SubTitle,
  BottomContainer,
  PaymentText,
  CardNumber,
  StyledImage
} from './styledComponents'
import withError from '../../components/WithError'
import withLoading from '../../components/WithLoading'
import Layout from '../../components/MainLayout'
import OrderSummary from '../../components/OrderSummary'
import MyAddress from '../../components/MyAddress'
import { QueryProps } from '../../types/common'

import iconVisa from '../../assets/card-visa.svg'
import iconMasterCard from '../../assets/card-master.svg'
import iconAE from '../../assets/card-AE.svg'
import iconDiscover from '../../assets/card-discover.svg'
import iconCreditCard from '../../assets/card-default.svg'

interface Data extends QueryProps {
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
  payment?: {
    cardData?: {
      name: string
      last4: string
      brand: string
      exp_month: number
      exp_year: number
    }
  }
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
}

export class OrderPlaced extends React.Component<Props, {}> {
  render() {
    const {
      intl,
      data: {
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
        payment
      }
    } = this.props
    console.log(payment)
    // : { exp_year, exp_month, name, last4, brand }
    // const expYear = String(exp_year).substring(2, 4)
    // const expMonth = exp_month > 9 ? exp_month : `0${exp_month}`
    // let cardIcon = this.getCardIcon(brand)
    return (
      <Layout {...{ history, intl }}>
        <Container>
          <Title>{intl.formatMessage(messages.title)}</Title>
          <Content>
            <InfoContainer>
              <BottomContainer>
                <div>
                  <Title>{intl.formatMessage(messages.shippingAddress)}</Title>
                  <MyAddress
                    hideBottomButtons={true}
                    name={`${firstName} ${lastName}`}
                    city={`${city} ${stateProvince}`}
                    formatMessage={intl.formatMessage}
                    {...{ street, zipCode, country, apartment }}
                  />
                </div>
                <div>
                  <Title>{intl.formatMessage(messages.billingAddress)}</Title>
                  <MyAddress
                    hideBottomButtons={true}
                    name={`${billingFirstName} ${billingLastName}`}
                    street={billingStreet}
                    city={`${billingCity} ${billingStateProvince}`}
                    zipCode={billingZipCode}
                    country={billingCountry}
                    apartment={billingApartment}
                    formatMessage={intl.formatMessage}
                  />
                </div>
                {/* <div>
                  <Title>{intl.formatMessage(messages.payment)}</Title>
                  <PaymentText>{name}</PaymentText>
                  <CardNumber>
                    <PaymentText>{`X-${last4}`}</PaymentText>
                    <StyledImage src={cardIcon} />
                  </CardNumber>
                  <PaymentText>{`EXP ${expMonth}/${expYear}`}</PaymentText>
                </div> */}
              </BottomContainer>
            </InfoContainer>
            <SummaryContainer>
              <OrderSummary
                total={10}
                subtotal={10}
                discount={10}
                formatMessage={intl.formatMessage}
              />
            </SummaryContainer>
          </Content>
        </Container>
      </Layout>
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

const mapStateToProps = (state: any) => state.get('orderPlaced').toJS()

const OrderPlacedEnhance = compose(
  graphql(getOrderQuery, {
    options: () => ({
      variables: {
        orderId: 'r1Dl1Rx17'
      }
    })
  }),
  withLoading,
  withError,
  injectIntl,
  connect(mapStateToProps, { ...orderPlacedActions })
)(OrderPlaced)

export default OrderPlacedEnhance
