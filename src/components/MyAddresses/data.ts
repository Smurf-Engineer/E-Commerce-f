/**
 * Account-Addresses Queries
 */
import gql from 'graphql-tag'

export const addresesQuery = gql`
  query getUserAddresses {
    addresses: getUserAddresses {
      id
      first_name
      last_name
      street
      apartment
      country
      state_province
      city
      zip_code
      phone
    }
  }
`
