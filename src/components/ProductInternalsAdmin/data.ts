/**
 * ProductsInternalsAdmin Queries
 */

import gql from 'graphql-tag'

export const getProductInternalsInfoQuery = gql`
  query getProductInternalsInfo {
    productInternalsInfo: getProductInternalsInfo {
      basicColors {
        name
      }
      products {
        code
      }
      genders {
        id
        gender
      }
      sizes {
        name
      }
      fitStyles {
        info: description
      }
      colors {
        name
      }
      collections {
        name
      }
    }
  }
`
