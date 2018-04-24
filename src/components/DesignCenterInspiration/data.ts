/**
 * Desgins Queries
 */
import gql from 'graphql-tag'

export const desginsQuery = gql`
  query inspirationDesigns($productId: Int!) {
    designs: inspirationDesigns(productId: $productId) {
      fullCount
      designs {
        id
        name
        image
        shortId: short_id
        createdAt: created_at
        product {
          id
          yotpoId: yotpo_id
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
  }
`
