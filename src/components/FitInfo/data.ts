/**
 * Filters queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const categoriesQuery = gql`
  query GetCategories($id: Int!) {
    product(id: $id) {
      genders {
        id
        name: gender
      }
      fitStyles {
        id
        name: description
        info
        image
      }
    }
  }
`
