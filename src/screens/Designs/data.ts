/**
 * Designs queries
 */

import gql from 'graphql-tag'

export const styleQuery = gql`
  query getStyle($designId: String!) {
    design: sharedDesignShortId(designId: $designId) {
      id
      name
      flatlockColor: flatlock
      bindingColor: binding_color
      bibBraceColor: bib_brace_color
      zipperColor: zipper_color
      product {
        id
        code
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
      }
      svg: output_svg
      canvas
    }
  }
`
