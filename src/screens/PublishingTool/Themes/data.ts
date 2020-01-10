import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { STYLE_FIELDS } from '../../../apollo/fragments'

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
      brandingPng: branding
      themes {
        id
        name
        image
        itemOrder: item_order
        styles {
          ...styleFields
        }
      }
    }
  }
  ${STYLE_FIELDS}
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
          itemOrder: item_order
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
