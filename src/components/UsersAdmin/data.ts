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
        netsuiteInternal: netsuite_internal
        affiliateEnabled: affiliate_enabled
        resellerEnabled: reseller_enabled
        phone
      }
      stats {
        lastOrder: last_order
        amountOrders: amount_orders {
          total
          currency
        }
      }
      reseller {
        status
        file
        paypalAccount: paypal_account
        comission
        margin
        inline
        gst
        region
        businessName: business_name
        stateProvince: state_province
        currency
        activatedAt: activated_at
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

export const setAffiliateStatusMutation = gql`
  mutation setAffiliateStatus($userId: String!, $enabled: Boolean) {
    affiliateData: setAffiliateStatus(userId: $userId ,enabled: $enabled) {
      enabled: affiliate_enabled
    }
  }
`

export const setResellerEnabledMutation = gql`
  mutation enableReseller($userId: String!, $enabled: Boolean) {
    resellerData: enableReseller(userId: $userId ,enabled: $enabled) {
      enabled: reseller_enabled
    }
  }
`

export const changeNetsuiteInternal = gql`
  mutation setNetsuiteId($userId: String!, $netsuiteId: String) {
    profile: setNetsuiteId(userId: $userId, netsuiteId: $netsuiteId) {
      netsuiteInternal: netsuite_internal
    }
  }
`

export const changeResellerComissionMutation = gql`
  mutation changeResellerComission($value: Float, $userId: String!) {
    changeResellerComission(value: $value, userId: $userId) {
      status
      comission
    }
  }
`

export const changeGstMutation = gql`
  mutation changeGst($value: String, $userId: String!) {
    changeGst(value: $value, userId: $userId) {
      gst
    }
  }
`

export const changeResellerMarginMutation = gql`
  mutation changeResellerMargin($value: Float, $userId: String!) {
    changeResellerMargin(value: $value, userId: $userId) {
      status
      margin
    }
  }
`

export const changeResellerInlineMutation = gql`
  mutation changeResellerInline($value: Float, $userId: String!) {
    changeResellerInline(value: $value, userId: $userId) {
      status
      inline
    }
  }
`

export const setResellerStatusMutation = gql`
  mutation changeResellerStatus($status: String!, $userId: String!) {
    changeResellerStatus(status: $status, userId: $userId) {
      status
      paypalAccount: paypal_account
      comission
      activatedAt: activated_at
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
