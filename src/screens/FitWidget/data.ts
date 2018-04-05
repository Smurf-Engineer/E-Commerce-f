import gql from 'graphql-tag'

export const messageAdded = gql`
  subscription messageAdded {
    messageAdded {
      id
      text
    }
  }
`
