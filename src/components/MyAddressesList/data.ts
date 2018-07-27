import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const GetAddressListQuery = gql`
  query GetUserAddresses($limit: Int, $skip: Int) {
    userAddresses: getUserAddresses(limit: $limit, offset: $skip) {
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
        defaultBilling: default_shipping
        defaultShipping: default_billing
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
