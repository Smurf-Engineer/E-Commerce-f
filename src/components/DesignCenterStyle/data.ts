/**
 * Styles queries
 */

import gql from 'graphql-tag'

export const stylesQuery = gql`
  query GetThemesByProduct(
    $productId: Int!
    $themeId: Int!
    $complexity: Int!
  ) {
    styles: getStylesByProductTheme(
      productId: $productId
      themeId: $themeId
      complexity: $complexity
    ) {
      id
      name
      image
      size
      brandingPng: branding_png
      colors: colorsBlocks {
        id
        color
        image
      }
    }
  }
`
