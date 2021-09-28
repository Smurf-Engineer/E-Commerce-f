import gql from 'graphql-tag'

export const getProductQuery = gql`
  query GetProductByID($id: Int!) {
    product(id: $id, onlyActive: false) {
      weight
      mpn
      hideFitStyles: hide_fit_styles
      youthCombined: youth_combined
      shortDescription: short_description
      fitStyles {
        id
        info
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
