import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const contactManager = graphql(
  gql`
    mutation contactManager($teamStoreId: String!, $text: String!) {
      contactEmail(teamStoreId: $teamStoreId, text: $text) {
        message
      }
    }
  `,
  {
    name: 'contactManagerMutation'
  }
)
