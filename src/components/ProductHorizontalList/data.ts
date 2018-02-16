/**
 * Products query
 */

import gql from 'graphql-tag'

export const productsQuery = gql`
  query GetProducts($gender: Int, $category: Int, $sport: Int) {
    products(gender: $gender, category: $category, sport: $sport, limit: 6) {
      id
      description
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
