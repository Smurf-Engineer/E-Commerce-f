/**
 * Theme Modal queries
 */
import gql from 'graphql-tag'

export const updateThemeMutation = gql`
  mutation UpdateTheme($theme: ThemeInput!) {
    theme: updateTheme(themeData: $theme) {
      id
      name
      image
      order
    }
  }
`
