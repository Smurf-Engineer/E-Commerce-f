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
        code
        name
        image
        shortId: short_id
        createdAt: created_at
        product {
          id
          code
          yotpoId: yotpo_id
          name
          type: name
          description: short_description
          collections
          isTopProduct
          weight
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
  }
`
