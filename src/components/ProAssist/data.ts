import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const setAdminUserMutation = graphql(
  gql`
    mutation upgradeUser($id: Int!) {
      upgradeUser(id: $id) {
        id
      }
    }
  `,
  {
    name: 'setAdminUser'
  }
)
