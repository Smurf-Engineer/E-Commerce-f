import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const messageAdded = graphql(
  gql`
    subscription messageAdded {
      messageAdded {
        id
        text
      }
    }
  `,
  {
    name: 'subscriptionMessage'
  }
)
