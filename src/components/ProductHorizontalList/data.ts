/**
 * Products query
 */

import gql from 'graphql-tag'

// TODO: delete alias
export const productsQuery = gql`
  query GetProducts(
    $gender: String
    $category: String
    $sport: String
    $sportGroup: String
  ) {
    products(
      gender: $gender
      category: $category
      sport: $sport
      sportGroup: $sportGroup
      limit: 6
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
