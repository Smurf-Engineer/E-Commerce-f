import gql from 'graphql-tag'

export const GetFiltersQuery = gql`
  query filters {
    filters {
      name
      options {
        filterId: id
        name
      }
    }
  }
`
