/**
 * Account-Cards Queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// TODO: add query
export const cardsQuery = gql``

// TODO: add mutation
export const addCardMutation = graphql(gql``, {
  name: 'addNewCard'
})

// TODO: add mutation
export const updateCardMutation = graphql(gql``, {
  name: 'updateCard'
})

// TODO: add mutation
export const deleteCardMutation = graphql(gql``, {
  name: 'deleteCard'
})
