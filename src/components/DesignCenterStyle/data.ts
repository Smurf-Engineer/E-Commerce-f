/**
 * Styles queries
 */

import gql from 'graphql-tag'

export const stylesQuery = gql`
  query GetThemesByProduct(
    $productId: Int!
    $themeId: Int!
    $placeholders: Boolean
  ) {
    styles: getStylesByProductTheme(
      productId: $productId
      themeId: $themeId
      placeholders: $placeholders
    ) {
      id
      name
      image
      width
      height
      brandingPng: branding_png
      thumbnail
      canvas
      colors: colorsBlocks {
        id
        color
        image
      }
      itemOrder: item_order
    }
  }
`
