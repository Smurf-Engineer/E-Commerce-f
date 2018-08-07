import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const GetAddressListQuery = gql`
  query GetUserAddresses($limit: Int, $offset: Int) {
    userAddresses: getUserAddresses(limit: $limit, offset: $offset) {
      fullCount
      addresses {
        id
        firstName: first_name
        lastName: last_name
        street
        apartment
        country
        stateProvince: state_province
        city
        zipCode: zip_code
        phone
        defaultBilling: default_billing
        defaultShipping: default_shipping
      }
    }
  }
`

export const deleteAddressMutation = graphql(
  gql`
    mutation deleteAddress($addressId: Int!) {
      deleteUserAddress(addressId: $addressId) {
        message
      }
    }
  `,
  {
    name: 'deleteAddress'
  }
)
