import gql from 'graphql-tag'

export const GetProductsToCompareQuery = gql`
  query ProductsToCompare {
    product: getProductsToCompare {
      id
      name
      priceRange {
        price
        quantity
        abbreviation
        shortName: short_name
      }
    }
  }
`
