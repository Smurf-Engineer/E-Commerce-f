import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const requestWarrantyMutation = graphql(
  gql`
    mutation warrantyProgramRequest($warrantyObject: WarrantyObject!) {
      warrantyProgramRequest(warrantyObject: $warrantyObject) {
        message
      }
    }
  `,
  { name: 'requestWarranty' }
)
