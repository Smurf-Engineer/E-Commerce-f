import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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
