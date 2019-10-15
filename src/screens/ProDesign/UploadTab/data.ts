/**
 * UploadTab Queries
 */
import gql from 'graphql-tag'

export const getProducts = gql`
  query GetProductsNameQuery($pattern: String!) {
    getProductSearch(pattern: $pattern) {
      id
      name
      code
    }
  }
`
