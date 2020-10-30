import gql from 'graphql-tag'

export const GetProductsQuery = gql`
  query getProducts(
    $gender: String
    $category: String
    $sport: String
    $season: String
    $limit: Int
    $order: String
    $offset: Int
  ) {
    products(
      gender: $gender
      category: $category
      sport: $sport
      season: $season
      limit: $limit
      order: $order
      offset: $offset
    ) {
      fullCount
      products {
        id
        code
        yotpoId: yotpo_id
        name
        type: name
        active
        description: short_description
        shortDescription: short_description
        collections
        isTopProduct
        weight
        twoPieces: two_pieces
        genders {
          id
          name: gender
        }
        fitStyles {
          id
          name: description
        }
        sizeRange: size_range {
          id
          name
        }
        priceRange {
          quantity
          price
          abbreviation
          shortName: short_name
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
