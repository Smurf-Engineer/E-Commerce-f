/**
 * Designer Tool - Queries
 */

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getProductFromCode = gql`
  query GetProductFromCode($code: String!) {
    product: productFromCode(code: $code) {
      id
      name
      obj
      mtl
      label
      bumpMap: bump_map
      flatlock
      binding {
        white
        black
      }
      zipper {
        white
        black
      }
      bibBrace {
        white
        black
      }
      themes {
        id
        name
        image
        item_order
        styles {
          id
          name
          image
          width
          height
          branding
          brandingPng: branding_png
          colorblock1
          colorblock2
          colorblock3
          colorblock4
          colorblock5
          colorIdeas: inspiration {
            id
            name
            image
            colors
          }
          colors: colorsBlocks {
            id
            color
            image
          }
          item_order
        }
      }
    }
  }
`

export const updateThemesOrderMutation = graphql(
  gql`
    mutation updateThemes($themes: [InputTheme]) {
      updateThemesOrder(themes: $themes) {
        fullCount
        themes {
          id
          name
          image
          item_order
        }
      }
    }
  `,
  {
    name: 'updateThemesOrder'
  }
)

export const updateStylesOrderMutation = graphql(
  gql`
    mutation updateStyles($styles: [StyleToOrderInput]!, $themeId: Int) {
      updateStylesOrder(styles: $styles, themeId: $themeId) {
        message
      }
    }
  `,
  {
    name: 'updateStylesOrder'
  }
)
