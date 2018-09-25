/**
 * Account-Cards Queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const cardsQuery = gql`
  query getusercards {
    userCards: getUserCards {
      default
      cards {
        id
        last4
        brand
        expYear: exp_year
        expMonth: exp_month
        name
      }
    }
  }
`

export const addCardMutation = graphql(
  gql`
    mutation addusercard(
      $token: String!
      $defaultValue: Boolean!
      $countryCode: String!
    ) {
      addUserCard(
        token: $token
        defaultValue: $defaultValue
        countryCode: $countryCode
      ) {
        id
      }
    }
  `,
  {
    name: 'addNewCard'
  }
)

export const updateCardMutation = graphql(
  gql`
    mutation updatecard($cardId: String!) {
      updateUserCard(cardId: $cardId) {
        message
      }
    }
  `,
  {
    name: 'updateCard'
  }
)

export const deleteCardMutation = graphql(
  gql`
    mutation deleteCard($cardId: String!) {
      deleteUserCard(cardId: $cardId) {
        message
      }
    }
  `,
  {
    name: 'deleteCard'
  }
)
