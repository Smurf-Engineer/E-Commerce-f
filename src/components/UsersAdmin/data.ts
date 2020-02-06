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

export const createUserMutation = graphql(
  gql`
    mutation createUserFromAdmin($user: ShortUserInput!) {
      createUserFromAdmin(user: $user) {
        id
        email
        firstName: first_name
        lastName: last_name
        socialMethod: social_method
        administrator
        netsuiteId: netsuite_internal
        shortId: short_id
        billingCountry: billing_country
        createdAt: created_at
      }
    }
  `,
  {
    name: 'addUser'
  }
)
