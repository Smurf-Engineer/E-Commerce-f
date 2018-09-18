import gql from 'graphql-tag'

export const GetProductsQuery = gql`
  query getProducts(
    $collection: String
    $gender: String
    $category: String
    $sport: String
    $season: String
    $fitStyle: String
    $limit: Int
    $order: String
    $offset: Int
  ) {
    products(
      collection: $collection
      gender: $gender
      category: $category
      sport: $sport
      season: $season
      fitStyle: $fitStyle
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
        weight
        customizable: design_center
        retailMen: men_retail
        retailWomen: women_retail
        mpn
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
        colors {
          name
          image
        }
      }
    }
  }
`