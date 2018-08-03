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
    featuredProducts: products(
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
        description: short_description
        shortDescription: short_description
        collections
        isTopProduct
        customizable: design_center
        retailMen: men_retail
        retailWomen: women_retail
        genders {
          id
          name: gender
        }
        fitStyles {
          id
          name: description
        }
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
        sizeRange: size_range {
          id
          name
        }
      }
    }
  }
`
