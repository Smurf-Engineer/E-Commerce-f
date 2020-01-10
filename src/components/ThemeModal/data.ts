/**
 * Theme Modal queries
 */
import gql from 'graphql-tag'

export const upsertThemeMutation = gql`
  mutation UpsertTheme($theme: ThemeInput!) {
    theme: upsertTheme(themeData: $theme) {
      id
      name
      image
    }
  }
`
