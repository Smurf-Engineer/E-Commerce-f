import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const getFonts = graphql(
  gql`
    query GetFonts {
      fonts: getFonts {
        id
        family
        active
      }
    }
  `,
  { name: 'fontsData' }
)

export const addNewFont = graphql(
  gql`
    mutation AddFont($font: String!) {
      addFont(font: $font) {
        family
        active
      }
    }
  `,
  {
    name: 'installFont'
  }
)
