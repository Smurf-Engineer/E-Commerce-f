import gql from 'graphql-tag'

export const GetProductsQuery = gql`
  query getProducts($gender: Int!, $category: Int!, $sport: Int!, $limit: Int) {
    catalogue: products(
      gender: $gender
      category: $category
      sport: $sport
      limit: $limit
    ) {
      id
      name
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
