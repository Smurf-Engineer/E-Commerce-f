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

export const createUser = graphql(
  gql`
    mutation createUserFromAdmin($user: ShortUserInput!) {
      createUserFromAdmin(user: $user) {
        user {
          id
          name: first_name
          lastName: last_name
        }
      }
    }
  `,
  {
    name: 'addUser'
  }
)
