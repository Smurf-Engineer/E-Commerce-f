/**
 * Account-Overview Queries
 */

import gql from 'graphql-tag'

export const overviewQuery = gql`
  query Overview {
    profile: getUserProfile {
      user: userProfile {
        firstName: first_name
        lastName: last_name
        email
        phone
      }
      regionsOptions: userRegionOptions {
        region {
          icon
        }
        currency {
          currency: short_name
        }
      }
    }
    address: getUserAddresses(limit: 1, offset: 0) {
      fullCount
      addresses {
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
    payment: getUserCards {
      cards {
        last4
        brand
        expYear: exp_year
        expMonth: exp_month
        name
      }
    }
  }
`
