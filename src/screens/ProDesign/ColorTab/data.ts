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
