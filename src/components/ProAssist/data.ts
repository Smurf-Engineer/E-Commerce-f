import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const toggleProAssist = graphql(
  gql`
    mutation toggleProAssist {
      toggleProAssist {
        enabled: pro_assist_active
      }
    }
  `,
  {
    name: 'changeEnablePro'
  }
)

export const getProStatus = gql`
  query getProAssistStatus {
    proAssistStatus: getProAssistStatus {
      enabled: pro_assist_active
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
