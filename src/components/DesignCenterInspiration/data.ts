/**
 * Desgins Queries
 */
import gql from 'graphql-tag'

export const desginsQuery = gql`
  query inspirations($styleId: Int!) {
    inspirations: getInspirationByStyle(styleId: $styleId) {
      name
      image
      colors
    }
  }
`
