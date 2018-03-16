/**
 * Home queries
 */

import gql from 'graphql-tag'

export const QuickViewQuery = gql`
  query GetProductById($id: Int!) {
    product(id: $id) {
      name
      description
      collections
      details
      materials: materials_info
      temperature: temperature_range
      priceRange {
        quantity
        price
      }
      images: pictures {
        id
        front: front_image
        back: back_image
        left: left_image
        right: right_image
      }
    }
  }
`
