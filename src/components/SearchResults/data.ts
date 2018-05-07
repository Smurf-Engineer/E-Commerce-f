import gql from 'graphql-tag'

export const searchResultsQuery = gql`
  query SearchProduct($search: String!) {
    productSearch(text: $search) {
      id
      yotpoId: yotpo_id
      type: name
      description: short_description
      collections
      isTopProduct
      customizable: design_center
      images: pictures {
        front: front_image
        back: back_image
        left: left_image
        right: right_image
      }
    }
  }
`
