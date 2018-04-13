import gql from 'graphql-tag'

export const GetTeamStoresQuery = gql`
  query GetTeamStoresList {
    teamStoresList {
      teamStores {
        id
        shortId: short_id
        name
      }
    }
  }
`

export const SearchStoresQuery = gql`
  query SearchTeamStore($searchString: String!) {
    searchTeamStores(searchParam: $searchString) {
      fullCount
      teamStores {
        id
        shortId: short_id
        name
        items {
          design {
            id
            name
            product {
              id
              yotpo_id
            }
          }
        }
      }
    }
  }
`
