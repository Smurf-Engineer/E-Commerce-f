import gql from 'graphql-tag'

export const regionsQuery = gql`
  query regions {
    regionsResult: regions {
      id
      label: name
      icon
      currencies {
        id
        name
        shortName: short_name
      }
      languages {
        id
        name
        shortName: short_name
      }
    }
  }
`
