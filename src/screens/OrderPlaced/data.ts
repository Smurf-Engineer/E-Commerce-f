import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const getOrderQuery = gql`
  query getOrderById($orderId: String!) {
    getOrder(orderId: $orderId) {
      id
      paymentMethod: payment_method
      firstName: shipping_address_first_name
      lastName: shipping_address_last_name
      apartment: shipping_address_apartment
      street: shipping_address_street
      city: shipping_address_city
      stateProvince: shipping_address_state_province
      zipCode: shipping_address_zip_code
      country: shipping_address_country
      billingFirstName: billing_address_first_name
      billingLastName: billing_address_last_name
      billingApartment: billing_address_apartment
      billingStreet: billing_address_street
      billingCity: billing_address_city
      billingStateProvince: billing_address_state_province
      billingZipCode: billing_address_zip_code
      billingCountry: billing_address_country
      payment: payment_object {
        source {
          name
          last4
          brand
          exp_month
          exp_year
        }
      }
    }
  }
`
