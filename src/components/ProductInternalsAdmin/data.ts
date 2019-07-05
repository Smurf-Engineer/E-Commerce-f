/**
 * ProductsInternalsAdmin Queries
 */

import gql from 'graphql-tag'

export const getProductInternalsInfoQuery = gql`
  query getProductInternalsInfo {
    productInternalsInfo: getProductInternalsInfo {
      basicColors {
        id
      }
      products {
        code
      }
    }
  }
`
