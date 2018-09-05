import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const AddAddressMutation = graphql(
  gql`
    mutation createAddress($address: UserAddressInput!) {
      createUserAddress(address: $address) {
        first_name
      }
    }
  `,
  {
    name: 'addNewAddress'
  }
)

export const PlaceOrderMutation = graphql(
  gql`
    mutation charge($orderObj: OrderInput!) {
      charge(order: $orderObj) {
        id
        short_id
        created_at
      }
    }
  `,
  {
    name: 'placeOrder'
  }
)

export const CurrencyQuery = gql`
  query currency($countryCode: String!) {
    currency: currencyByCountryCode(code: $countryCode)
  }
`
