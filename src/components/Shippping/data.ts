import gql from 'graphql-tag'

export const GetAddressListQuery = gql`
  query GetUserAddresses {
    userAddresses: getUserAddresses {
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
