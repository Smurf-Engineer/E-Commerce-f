import gql from 'graphql-tag'

export const GetProductsQuery = gql`
  query getProducts(
    $gender: String
    $category: String
    $sport: String
    $limit: Int
    $order: String
    $offset: Int
  ) {
    products(
      gender: $gender
      category: $category
      sport: $sport
      limit: $limit
      order: $order
      offset: $offset
    ) {
      fullCount
      products {
        id
        name
        type: name
        description: short_description
        collections
        isTopProduct
        priceRange {
          quantity
          price
        }
        images: pictures {
          front: front_image
          back: back_image
          left: left_image
          right: right_image
        }
      }
    }
  }
`
