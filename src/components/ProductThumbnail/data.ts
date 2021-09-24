import gql from 'graphql-tag'

export const getProductQuery = gql`
  query GetProductByID($id: Int!) {
    product(id: $id, onlyActive: false) {
      weight
      mpn
      youthCombined: youth_combined
      shortDescription: short_description
      fitStyles {
        id
        name: description
      }
      sizeRange: size_range {
        id
        name
        isYouth: is_youth
      }
    }
  }
`
