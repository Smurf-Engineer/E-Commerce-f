import gql from 'graphql-tag'

export const GetFiltersQuery = gql`
  query filters {
    filters(onlyCustom: true) {
      name
      options {
        filterId: id
        name
      }
    }
  }
`
