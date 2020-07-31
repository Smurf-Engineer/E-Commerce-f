/**
 * Designs queries
 */

import gql from 'graphql-tag'

export const designQuery = gql`
  query getDesign($designId: String!) {
    design: sharedDesignShortId(designId: $designId) {
      id
      name
      code
      shared
      flatlockColor: flatlock
      predyedColor: predyed_color
      bindingColor: binding_color
      bibBraceColor: bib_brace_color
      zipperColor: zipper_color
      proDesign: pro_design
      outputSvg: output_svg
      highResolution: high_resolution
      outputPng: output_png
      colors {
        id
        color
        image
      }
      style {
        id
        name
        image
        width
        height
        brandingPng: branding_png
      }
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
      canvas
    }
  }
`
