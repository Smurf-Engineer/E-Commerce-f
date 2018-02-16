import gql from 'graphql-tag'

export const searchResultsQuery = gql`
  query SearchProduct($search: String!) {
    productSearch(text: $search) {
      id
      name
      category_id
      sport_id
      gender
      description
      collections
      isTopProduct
      details
      intended_use
      temperature_range
      materials_info
      pictures {
        id
        front_image
        back_image
        left_image
        right_image
      }
    }
  }
`
