import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const getTeamStoreStatus = graphql(
  gql`
    mutation getTeamStoreStatus {
      getTeamStoreStatus {
        showTeamStores: show_team_stores
      }
    }
  `,
  { name: 'teamStoreStatus' }
)

export const getFonts = graphql(
  gql`
    query GetFonts {
      fonts: getFonts {
        id
        family
      }
    }
  `,
  { name: 'fontsData' }
)
