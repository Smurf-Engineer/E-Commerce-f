/**
 * ArtWorkSpecs Queries
 */
import gql from 'graphql-tag'

export const getColorsQuery = gql`
  query GetColors {
    colorsResult: getColors {
      colors
      stitchingColors: stitching_colors
    }
  }
`