/**
 * Review Component - Created by miguelcanobbio on 18/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text } from './styledComponents'
import { AddressType, StripeCardData } from '../../types/common'
import MyAddress from '../MyAddress'

interface Props {
  shippingAddress: AddressType
  billingAddress: AddressType
  cardData: StripeCardData
  cardHolderName: string
  formatMessage: (messageDescriptor: any) => string
}

class Review extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      shippingAddress: {
        firstName,
        lastName,
        street,
        city,
        stateProvince,
        zipCode,
        country,
        apartment
      },
      billingAddress: {
        firstName: billingFirstName,
        lastName: billingLastName,
        street: billingStreet,
        city: billingCity,
        stateProvince: billingStateProvince,
        zipCode: billingZipCode,
        country: billingCountry,
        apartment: billingApartment
      },
      cardData,
      cardHolderName
    } = this.props
    return (
      <Container>
        <MyAddress
          name={`${firstName} ${lastName}`}
          city={`${city} ${stateProvince}`}
          {...{ street, zipCode, country, formatMessage, apartment }}
        />
        <MyAddress
          name={`${billingFirstName} ${billingLastName}`}
          street={billingStreet}
          city={`${city} ${stateProvince}`}
          zipCode={billingZipCode}
          country={billingCountry}
          apartment={billingApartment}
          {...{ formatMessage }}
        />
      </Container>
    )
  }
}

export default Review
