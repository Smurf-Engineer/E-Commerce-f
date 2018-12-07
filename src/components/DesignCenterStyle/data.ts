/**
 * Styles queries
 */

import gql from 'graphql-tag'

export const stylesQuery = gql`
  query GetThemesByProduct($productId: Int!, $themeId: Int!) {
    styles: getStylesByProductTheme(productId: $productId, themeId: $themeId) {
      id
      name
      image
      width
      height
      brandingPng: branding_png
      colors: colorsBlocks {
        id
        color
        image
      }
      item_order
    }
  }
`
