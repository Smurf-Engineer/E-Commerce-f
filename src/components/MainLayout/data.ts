import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const getFonts = graphql(
  gql`
    mutation GetFonts {
      fontsData: getFonts {
        id
        family
        active
      }
    }
  `,
  { name: 'getFontsData' }
)

export const getPermissionsQuery = gql`
  query getPermissions {
    permissions: getPermissions {
      page
      edit
      view
    }
  }
`

export const getAlertsQuery = gql`
  query alerts {
    alerts: getAlerts {
      id
      sequence
      content
      startDate: start_date
      endDate: end_date
    }
  }
`
