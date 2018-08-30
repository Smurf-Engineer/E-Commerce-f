import gql from 'graphql-tag'

export const GetProductsByIdQuery = gql`
  query GetProductByID($id: Int!) {
    product(id: $id) {
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
