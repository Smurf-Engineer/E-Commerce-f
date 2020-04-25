import gql from 'graphql-tag'

export const GetTeamStoresQuery = gql`
  query GetTeamStoresList($limit: Int, $offset: Int) {
    teamStoresList(limit: $limit, offset: $offset, withPrivates: true) {
      fullCount
      teamStores {
        id
        shortId: short_id
        name
        banner
      }
    }
  }
`

export const SearchStoresQuery = gql`
  query SearchTeamStore($searchString: String!, $limit: Int, $offset: Int) {
    searchTeamStores(
      searchParam: $searchString
      limit: $limit
      offset: $offset
    ) {
      fullCount
      teamStores {
        id
        shortId: short_id
        name
        banner
        items {
          design {
            id
            code
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
