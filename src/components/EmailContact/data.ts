import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const contactManager = graphql(
  gql`
    mutation contactManager(
      $teamStoreId: String!
      $text: String!
      $name: String
      $phone: String
      $email: String
      $support: Boolean
    ) {
      contactEmail(
        teamStoreId: $teamStoreId
        text: $text
        name: $name
        phone: $phone
        email: $email
        support: $support
      ) {
        message
      }
    }
  `,
  {
    name: 'contactManagerMutation'
  }
)
