/**
 * Products query
 */

import gql from 'graphql-tag'

// TODO: delete alias
export const productsQuery = gql`
  query GetProducts($gender: String, $category: String, $sport: String) {
    products(gender: $gender, category: $category, sport: $sport, limit: 6) {
      fullCount
      products {
        id
        name
        genders {
          id
          name: gender
        }
        fitStyles {
          id
          name: description
        }
        yotpoId: yotpo_id
        type: name
        priceRange {
          price
        }
        description: short_description
        shortDescription: short_description
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
  }
`
