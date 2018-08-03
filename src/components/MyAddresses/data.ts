/**
 * Account-Addresses Queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const addresesQuery = gql`
  query getUserAddresses {
    addresses: getUserAddresses {
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
`

export const addAddressMutation = graphql(
  gql`
    mutation createAddress($address: UserAddressInput!) {
      createUserAddress(address: $address) {
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
  `,
  {
    name: 'addNewAddress'
  }
)

export const updateAddressMutation = graphql(
  gql`
    mutation updateAddress($address: UserAddressInput!) {
      updateUserAddress(address: $address) {
        id
      }
    }
  `,
  {
    name: 'updateAddress'
  }
)

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
