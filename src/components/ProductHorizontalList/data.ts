/**
 * Products query
 */

import gql from 'graphql-tag'

export const productsQuery = gql`
  query GetProducts($gender: Int, $category: Int, $sport: Int) {
    products(gender: $gender, category: $category, sport: $sport, limit: 6) {
      id
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
        front: front_image
        back: back_image
        left: left_image
        right: right_image
      }
    }
  }
`
