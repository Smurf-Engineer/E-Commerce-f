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
      product {
        id
        code
        name
      }
      colors {
        id
        color
        image
      }
      styleId: style_id
      style {
        id
        name
        image
        branding
        colors: colorsBlocks {
          image
          color
          colorDesc: colordesc
        }
      }
      canvas
      flatlock
    }
  }
`
