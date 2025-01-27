import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const GetSportsQuery = gql`
  query GetAllSports {
    sports: getAllSports {
      id
      name
      active
      catalogue
      route
      navbar
    }
  }
`

export const ActivateInNavbarMutation = graphql(
  gql`
    mutation ActivateInNavbar($id: Int!, $field: String!) {
      sportInNavbarOrCatalogue(id: $id, field: $field) {
        id
        name
        navbar
        catalogue
        active
      }
    }
  `,
  { name: 'activateInMenu' }
)
