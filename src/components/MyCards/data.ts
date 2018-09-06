/**
 * Account-Cards Queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const cardsQuery = gql`
  query getusercards($countryCode: String!) {
    userCards: getUserCards(countryCode: $countryCode) {
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
    mutation updatecard($cardId: String!, $countryCode: String!) {
      updateUserCard(cardId: $cardId, countryCode: $countryCode) {
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
    mutation deleteCard($cardId: String!, $countryCode: String!) {
      deleteUserCard(cardId: $cardId, countryCode: $countryCode) {
        message
      }
    }
  `,
  {
    name: 'deleteCard'
  }
)
