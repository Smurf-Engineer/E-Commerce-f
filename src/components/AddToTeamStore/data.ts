import gql from 'graphql-tag'

export const GetTeamMyStoresQuery = gql`
  query MyTeamStoresList {
    myTeamstores {
      teamStores {
        id
        shortId: short_id
        name
        items {
          design {
            shortId: short_id
          }
          visible
        }
      }
    }
  }
`
