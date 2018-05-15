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
