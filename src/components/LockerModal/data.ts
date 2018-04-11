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
        product {
          id
          type: name
          description: short_description
        }
      }
    }
  }
`
