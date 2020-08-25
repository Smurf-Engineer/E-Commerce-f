/**
 * ColorTab Queries
 */
import gql from 'graphql-tag'

export const GetColorsQuery = gql`
  query GetColors {
    colorsResult: getColors {
      stitchingColors: stitching_colors
    }
  }
`

export const getPredyedColors = gql`
  query getPredyedColors {
    getPredyedColors {
      id: short_id
      name
      code
    }
  }
`