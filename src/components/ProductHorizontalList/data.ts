/**
 * Products query
 */

import gql from 'graphql-tag'

// TODO: delete alias
export const productsQuery = gql`
  query GetProducts($gender: Int, $category: Int, $sport: Int) {
    products(gender: $gender, category: $category, sport: $sport, limit: 6) {
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
