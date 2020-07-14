/**
 * CreateStore queries
 */
import gql from 'graphql-tag'

export const desginsQuery = gql`
  query GetDesigns(
    $limit: Int
    $offset: Int
    $userId: String
    $proDesign: Boolean
  ) {
    designsResult: myDesigns(
      limit: $limit
      offset: $offset
      userId: $userId
      proDesign: $proDesign
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
          active
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
