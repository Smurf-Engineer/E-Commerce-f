import gql from 'graphql-tag'

export const searchResultsQuery = gql`
  query SearchProduct($search: String!) {
    productSearch(text: $search) {
      id
      type: name
      description: short_description
      collections
      isTopProduct
      images: pictures {
        front: front_image
        back: back_image
        left: left_image
        right: right_image
      }
    }
  }
`
