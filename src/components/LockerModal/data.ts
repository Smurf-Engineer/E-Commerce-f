/**
 * Locker queries
 */
import gql from 'graphql-tag'

export const desginsQuery = gql`
  query GetDesigns {
    pagination: myDesigns {
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
          type: name
          weight
          description: short_description
          priceRange {
            quantity
            price
          }
        }
      }
    }
  }
`
