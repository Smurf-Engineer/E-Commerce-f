import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const profileSettingsQuery = gql`
  query profile($id: String) {
    profileData: getUserProfile(id: $id, isAdmin: true) {
      userProfile {
        id
        firstName: first_name
        lastName: last_name
        email
        phone
      }
      affiliate {
        status
        file
        paypalAccount: paypal_account
        comission
        region
        currency
        activatedAt: activated_at
      }
    }
  }
`

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

export const GetDesignNotes = gql`
  query getDesignNotes($designId: String!) {
    designNotes: getDesignNotes(designId: $designId) {
      text
      user
      createdAt: created_at
    }
  }
`

export const addNoteMutation = gql`
  mutation addDesignNote($designId: String!, $text: String!) {
    addDesignNote(designId: $designId, text: $text) {
      message
    }
  }
`

export const changeAffiliateMutation = gql`
  mutation changeAffiliateStatus($status: String!, $userId: String!) {
    changeAffiliateStatus(status: $status, userId: $userId) {
      status
      paypalAccount: paypal_account
      comission
      activatedAt: activated_at
    }
  }
`

export const changeComissionMutation = gql`
  mutation changeComission($value: Float, $userId: String!) {
    changeComission(value: $value, userId: $userId) {
      status
      comission
    }
  }
`

export const assignRepUserMutation = graphql(
  gql`
    mutation assignRepUser($userId: String!, $repUser: String) {
      assignRepUser(userId: $userId, repUser: $repUser) {
        id
      }
    }
  `,
  {
    name: 'assignRepUser'
  }
)

export const setManagerMutation = graphql(
  gql`
    mutation setManager($userId: String!, $manager: String) {
      setManager(userId: $userId, manager: $manager) {
        id
      }
    }
  `,
  {
    name: 'assignManager'
  }
)
