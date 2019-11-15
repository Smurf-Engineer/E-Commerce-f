/**
 * CreateStore queries
 */
import gql from 'graphql-tag'

export const desginsQuery = gql`
  query GetDesigns(
    $limit: Int
    $offset: Int
    $userId: String
    $proDesignOnly: Boolean
  ) {
    designsResult: myDesigns(
      limit: $limit
      offset: $offset
      userId: $userId
      proDesignOnly: $proDesignOnly
    ) {
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
            abbreviation
            shortName: short_name
          }
        }
      }
    }
  }
`
