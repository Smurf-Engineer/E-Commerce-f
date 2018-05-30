/**
 * Account-Cards Queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// TODO: add query
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

// TODO: add mutation
export const addCardMutation = graphql(
  gql`
    mutation addusercard($token: String!, $defaultValue: Boolean!) {
      addUserCard(token: $token, defaultValue: $defaultValue) {
        id
      }
    }
  `,
  {
    name: 'addNewCard'
  }
)

// TODO: add mutation
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

// TODO: add mutation
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
