/**
 * DesignCenter Product
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const getProductQuery = gql`
  query GetProduct($id: Int!) {
    product(id: $id) {
      id
      name
      obj
      mtl
      label
      bumpMap: bump_map
      isCustom: design_center
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
  }
`

export const addTeamStoreItemMutation = graphql(
  gql`
    mutation AddTeamStoreItem(
      $teamStoreItem: TeamStoreItem!
      $teamStoreId: String!
    ) {
      addTeamStoreItem(
        teamStoreItem: $teamStoreItem
        teamStoreId: $teamStoreId
      ) {
        message
      }
    }
  `,
  { name: 'addItemToStore' }
)

export const getDesignQuery = gql`
  query getDesign($designId: String!) {
    designData: sharedDesignShortId(designId: $designId) {
      id
      name
      shortId: short_id
      flatlockColor: flatlock
      flatlockCode: flatlock_code
      bindingColor: binding_color
      bibBraceColor: bib_brace_color
      zipperColor: zipper_color
      colors {
        id
        color
        image
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
      styleId: style_id
      style {
        id
        name
        image
        width
        height
        brandingPng: branding_png
      }
      canvas
      flatlock
    }
  }
`
