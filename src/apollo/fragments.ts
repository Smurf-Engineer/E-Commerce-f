import gql from 'graphql-tag'

export const STYLE_FIELDS = gql`
  fragment styleFields on Style {
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
    itemOrder: item_order
    canvas
  }
`
