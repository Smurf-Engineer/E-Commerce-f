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
        name
        image
        createdAt: created_at
        product {
          id
          yotpoId: yotpo_id
          type: name
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
