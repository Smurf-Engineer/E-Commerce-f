import gql from 'graphql-tag'

export const regionsQuery = gql`
  query regions {
    regionsResult: regions {
      id
      label: name
      icon
      code
      currencies {
        id
        name
        shortName: short_name
        abbreviation
      }
      languages {
        id
        name
        shortName: short_name
      }
    }
  }
`
